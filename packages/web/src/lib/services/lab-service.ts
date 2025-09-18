import { createClient } from '@/lib/supabase/server'
import config from '@/lib/config'

export interface Lab {
  id: string
  title: string
  description: string
  type: 'coding' | 'networking' | 'simulation'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedMinutes: number
  tags: string[]
  isPublic: boolean
  environment: any
  instructions: string
  initialCode: string
  solutionCode?: string
  hints: string[]
  tasks: Task[]
  createdAt: string
}

export interface Task {
  id: string
  title: string
  description: string
  validation?: {
    type: 'command' | 'file' | 'output'
    expected: string | string[]
  }
  completed: boolean
  points: number
}

export interface LabSession {
  id: string
  userId: string
  labId: string
  status: 'active' | 'completed' | 'abandoned'
  containerId?: string
  startedAt: Date
  completedAt?: Date
  environmentData?: any
}

// Mock data for demo mode
const mockLabs: Record<string, Lab> = {
  'linux-basics-lab': {
    id: 'linux-basics-lab',
    title: 'Linux Command Line Essentials',
    description: 'Master essential Linux commands including file operations, permissions, process management, and system navigation.',
    type: 'coding',
    difficulty: 'beginner',
    estimatedMinutes: 90,
    tags: ['linux', 'bash', 'command-line', 'system-admin'],
    isPublic: true,
    environment: {
      type: 'docker',
      image: 'ubuntu:20.04',
      ports: [22],
      resources: { cpu: '0.5', memory: '1Gi' }
    },
    instructions: '# Linux Command Line Lab\n\nLearn essential Linux commands...',
    initialCode: '#!/bin/bash\n# Start here',
    hints: ['Use man command for help', 'Remember to use sudo for admin tasks'],
    tasks: [
      {
        id: 'task-1',
        title: 'Navigate the File System',
        description: 'Use pwd, ls, and cd commands',
        validation: { type: 'command' as const, expected: ['pwd', 'ls', 'cd'] },
        completed: false,
        points: 10
      }
    ],
    createdAt: '2024-01-15'
  }
}

export class LabService {
  private static instance: LabService
  
  static getInstance(): LabService {
    if (!LabService.instance) {
      LabService.instance = new LabService()
    }
    return LabService.instance
  }

  async getLabs(filters?: { type?: string; difficulty?: string }): Promise<Lab[]> {
    if (config.useMockData || !config.hasSupabase()) {
      // Return mock data
      let labs = Object.values(mockLabs)
      if (filters?.type) {
        labs = labs.filter((lab: Lab) => lab.type === filters.type)
      }
      if (filters?.difficulty) {
        labs = labs.filter((lab: Lab) => lab.difficulty === filters.difficulty)
      }
      return labs
    }

    // Use real Supabase data
    const supabase = createClient()
    let query = supabase.from('labs').select(`
      *,
      lab_tasks (*)
    `).eq('is_public', true)

    if (filters?.type) {
      query = query.eq('type', filters.type)
    }
    if (filters?.difficulty) {
      query = query.eq('difficulty', filters.difficulty)
    }

    const { data, error } = await query
    if (error) throw error

    return data?.map((lab: any) => this.transformLabData(lab)) || []
  }

  async getLab(id: string): Promise<Lab | null> {
    if (config.useMockData || !config.hasSupabase()) {
      return mockLabs[id] || null
    }

    const supabase = createClient()
    const { data, error } = await supabase
      .from('labs')
      .select(`
        *,
        lab_tasks (*)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data ? this.transformLabData(data) : null
  }

  async startLabSession(labId: string, userId: string): Promise<LabSession> {
    if (config.useMockData || !config.hasSupabase()) {
      // Return mock session
      return {
        id: Math.random().toString(36).substring(7),
        userId,
        labId,
        status: 'active',
        startedAt: new Date(),
        containerId: config.enableRealDocker ? undefined : 'mock-' + Math.random().toString(36).substring(7)
      }
    }

    const supabase = createClient()
    
    // End any existing active sessions
    await supabase
      .from('lab_sessions')
      .update({ status: 'abandoned', completed_at: new Date() })
      .eq('user_id', userId)
      .eq('lab_id', labId)
      .eq('status', 'active')

    // Create new session
    const { data, error } = await supabase
      .from('lab_sessions')
      .insert({
        user_id: userId,
        lab_id: labId,
        status: 'active',
        container_id: config.enableRealDocker ? undefined : 'mock-' + Math.random().toString(36).substring(7)
      })
      .select()
      .single()

    if (error) throw error
    return this.transformSessionData(data)
  }

  async updateTaskProgress(sessionId: string, taskId: string, completed: boolean): Promise<void> {
    if (config.useMockData || !config.hasSupabase()) {
      // In mock mode, just log the update
      console.log('Mock: Task progress updated', { sessionId, taskId, completed })
      return
    }

    const supabase = createClient()
    const { error } = await supabase
      .from('lab_progress')
      .upsert({
        session_id: sessionId,
        task_id: taskId,
        completed,
        completed_at: completed ? new Date() : null
      })

    if (error) throw error
  }

  async saveCommand(sessionId: string, command: string, output: string): Promise<void> {
    if (config.useMockData || !config.hasSupabase()) {
      console.log('Mock: Command saved', { sessionId, command, output })
      return
    }

    const supabase = createClient()
    const { error } = await supabase
      .from('lab_command_history')
      .insert({
        session_id: sessionId,
        command,
        output
      })

    if (error) throw error
  }

  async saveCode(sessionId: string, code: string, language: string): Promise<void> {
    if (config.useMockData || !config.hasSupabase()) {
      console.log('Mock: Code saved', { sessionId, language })
      return
    }

    const supabase = createClient()
    const { error } = await supabase
      .from('lab_code_saves')
      .insert({
        session_id: sessionId,
        code,
        language
      })

    if (error) throw error
  }

  private transformLabData(data: any): Lab {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      type: data.type,
      difficulty: data.difficulty,
      estimatedMinutes: data.estimated_minutes,
      tags: data.tags || [],
      isPublic: data.is_public,
      environment: data.environment,
      instructions: data.instructions,
      initialCode: data.initial_code,
      solutionCode: data.solution_code,
      hints: data.hints || [],
      tasks: data.lab_tasks?.map((task: any) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        validation: task.validation_type ? {
          type: task.validation_type,
          expected: task.validation_data?.expected
        } : undefined,
        completed: false,
        points: task.points
      })) || [],
      createdAt: data.created_at
    }
  }

  private transformSessionData(data: any): LabSession {
    return {
      id: data.id,
      userId: data.user_id,
      labId: data.lab_id,
      status: data.status,
      containerId: data.container_id,
      startedAt: new Date(data.started_at),
      completedAt: data.completed_at ? new Date(data.completed_at) : undefined,
      environmentData: data.environment_data
    }
  }
}
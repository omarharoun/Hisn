export interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  imageUrl?: string
  createdAt: string
  updatedAt: string
}

export interface Roadmap {
  id: string
  title: string
  description: string
  category: 'software-development' | 'ip-networking' | 'other'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedHours: number
  tags: string[]
  isPublic: boolean
  createdBy: string
  createdAt: string
  updatedAt: string
  steps: RoadmapStep[]
}

export interface RoadmapStep {
  id: string
  roadmapId: string
  title: string
  description: string
  content: string
  order: number
  type: 'reading' | 'video' | 'lab' | 'quiz' | 'project'
  estimatedMinutes: number
  prerequisites: string[]
  resources: Resource[]
  labs?: Lab[]
  createdAt: string
  updatedAt: string
}

export interface Lab {
  id: string
  stepId?: string
  title: string
  description: string
  type: 'coding' | 'networking' | 'simulation'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  environment: LabEnvironment
  instructions: string
  initialCode?: string
  solutionCode?: string
  validationScript?: string
  hints: string[]
  estimatedMinutes: number
  createdAt: string
  updatedAt: string
}

export interface LabEnvironment {
  type: 'docker' | 'kubernetes' | 'browser'
  image?: string
  ports?: number[]
  volumes?: string[]
  environment?: Record<string, string>
  resources?: {
    cpu: string
    memory: string
    storage?: string
  }
}

export interface Question {
  id: string
  category: string
  subcategory?: string
  difficulty: 'easy' | 'medium' | 'hard'
  type: 'multiple-choice' | 'coding' | 'system-design' | 'behavioral'
  title: string
  content: string
  options?: string[]
  correctAnswer?: string | number
  explanation: string
  tags: string[]
  companies: string[]
  frequency: number
  createdAt: string
  updatedAt: string
}

export interface UserProgress {
  id: string
  userId: string
  roadmapId?: string
  stepId?: string
  labId?: string
  questionId?: string
  status: 'not-started' | 'in-progress' | 'completed' | 'skipped'
  score?: number
  timeSpent: number
  attempts: number
  lastAccessedAt: string
  completedAt?: string
  createdAt: string
  updatedAt: string
}

export interface Resource {
  id: string
  title: string
  type: 'link' | 'document' | 'video' | 'book'
  url: string
  description?: string
}

export interface AIPrompt {
  id: string
  name: string
  category: string
  template: string
  variables: string[]
  description: string
  createdAt: string
  updatedAt: string
}

export interface TrendAnalysis {
  id: string
  skill: string
  category: string
  trendScore: number
  demandGrowth: number
  salaryImpact: number
  jobPostings: number
  sources: string[]
  recommendations: string[]
  lastUpdated: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  criteria: string
  points: number
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
  createdAt: string
}

export interface UserBadge {
  id: string
  userId: string
  badgeId: string
  earnedAt: string
}

export interface Leaderboard {
  id: string
  name: string
  type: 'global' | 'roadmap' | 'monthly' | 'weekly'
  entries: LeaderboardEntry[]
  lastUpdated: string
}

export interface LeaderboardEntry {
  userId: string
  username: string
  avatar?: string
  score: number
  rank: number
  badges: number
  completedRoadmaps: number
  completedLabs: number
}
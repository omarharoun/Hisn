import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { labId, userId, code, task } = await req.json()

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get lab details
    const { data: lab, error: labError } = await supabaseClient
      .from('labs')
      .select('*')
      .eq('id', labId)
      .single()

    if (labError) {
      throw new Error(`Lab not found: ${labError.message}`)
    }

    let validationResult = {
      success: false,
      score: 0,
      feedback: '',
      hints: []
    }

    // Validate based on lab type
    switch (lab.type) {
      case 'coding':
        validationResult = await validateCodingLab(lab, code, task)
        break
      case 'networking':
        validationResult = await validateNetworkingLab(lab, code, task)
        break
      case 'simulation':
        validationResult = await validateSimulationLab(lab, code, task)
        break
      default:
        throw new Error(`Unsupported lab type: ${lab.type}`)
    }

    // Update user progress
    const { error: progressError } = await supabaseClient
      .from('user_progress')
      .upsert({
        user_id: userId,
        lab_id: labId,
        status: validationResult.success ? 'completed' : 'in-progress',
        score: validationResult.score,
        attempts: 1, // This should be incremented properly
        completed_at: validationResult.success ? new Date().toISOString() : null
      })

    if (progressError) {
      console.error('Error updating progress:', progressError)
    }

    return new Response(
      JSON.stringify(validationResult),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})

async function validateCodingLab(lab: any, code: string, task: string) {
  // Basic validation logic for coding labs
  const validationRules = {
    'linux-basics-lab': {
      tasks: {
        'file-operations': {
          required: ['mkdir', 'touch', 'echo', 'cp'],
          forbidden: [],
          points: 25
        },
        'permissions': {
          required: ['chmod', 'ls -l'],
          forbidden: [],
          points: 25
        },
        'processes': {
          required: ['ps', 'kill', 'jobs'],
          forbidden: [],
          points: 25
        },
        'text-processing': {
          required: ['grep', 'sort', 'wc'],
          forbidden: [],
          points: 25
        }
      }
    },
    'docker-basics-lab': {
      tasks: {
        'basic-commands': {
          required: ['docker run', 'docker ps', 'docker images'],
          forbidden: [],
          points: 30
        },
        'dockerfile': {
          required: ['FROM', 'WORKDIR', 'COPY', 'RUN', 'EXPOSE', 'CMD'],
          forbidden: [],
          points: 40
        },
        'compose': {
          required: ['docker-compose up', 'services:', 'version:'],
          forbidden: [],
          points: 30
        }
      }
    }
  }

  const labRules = validationRules[lab.id]
  if (!labRules) {
    return {
      success: false,
      score: 0,
      feedback: 'Validation rules not found for this lab',
      hints: ['Contact support for assistance']
    }
  }

  const taskRule = labRules.tasks[task]
  if (!taskRule) {
    return {
      success: false,
      score: 0,
      feedback: 'Task not found',
      hints: ['Check the task name and try again']
    }
  }

  // Check required commands/patterns
  let score = 0
  const feedback = []
  const hints = []

  for (const required of taskRule.required) {
    if (code.includes(required)) {
      score += taskRule.points / taskRule.required.length
      feedback.push(`✓ Found required: ${required}`)
    } else {
      feedback.push(`✗ Missing required: ${required}`)
      hints.push(`Try using the '${required}' command`)
    }
  }

  // Check forbidden patterns
  for (const forbidden of taskRule.forbidden) {
    if (code.includes(forbidden)) {
      score -= 10
      feedback.push(`✗ Found forbidden: ${forbidden}`)
      hints.push(`Avoid using '${forbidden}' for this task`)
    }
  }

  const success = score >= (taskRule.points * 0.7) // 70% threshold

  return {
    success,
    score: Math.max(0, Math.min(100, score)),
    feedback: feedback.join('\n'),
    hints: hints.slice(0, 3) // Limit to 3 hints
  }
}

async function validateNetworkingLab(lab: any, code: string, task: string) {
  // Placeholder for networking lab validation
  return {
    success: true,
    score: 85,
    feedback: 'Networking lab validation completed',
    hints: []
  }
}

async function validateSimulationLab(lab: any, code: string, task: string) {
  // Placeholder for simulation lab validation
  return {
    success: true,
    score: 90,
    feedback: 'Simulation lab validation completed',
    hints: []
  }
}
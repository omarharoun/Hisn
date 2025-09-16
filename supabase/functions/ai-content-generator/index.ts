import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { promptType, variables, userId } = await req.json()

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

    // Get AI prompt template
    const { data: promptTemplate, error: promptError } = await supabaseClient
      .from('ai_prompts')
      .select('*')
      .eq('name', promptType)
      .single()

    if (promptError) {
      throw new Error(`Prompt template not found: ${promptError.message}`)
    }

    // Replace variables in template
    let prompt = promptTemplate.template
    for (const [key, value] of Object.entries(variables)) {
      prompt = prompt.replace(new RegExp(`{${key}}`, 'g'), value as string)
    }

    // Call OpenAI API
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert DevOps and networking instructor. Provide educational, accurate, and practical content.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    })

    if (!openAIResponse.ok) {
      throw new Error(`OpenAI API error: ${openAIResponse.statusText}`)
    }

    const openAIData = await openAIResponse.json()
    const generatedContent = openAIData.choices[0]?.message?.content

    if (!generatedContent) {
      throw new Error('No content generated from OpenAI')
    }

    // Log usage for analytics
    await supabaseClient
      .from('ai_usage_logs')
      .insert({
        user_id: userId,
        prompt_type: promptType,
        tokens_used: openAIData.usage?.total_tokens || 0,
        cost_estimate: (openAIData.usage?.total_tokens || 0) * 0.00003, // Rough estimate
        created_at: new Date().toISOString()
      })

    return new Response(
      JSON.stringify({
        content: generatedContent,
        tokens_used: openAIData.usage?.total_tokens,
        prompt_type: promptType
      }),
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

/* Example usage:
POST /functions/v1/ai-content-generator
{
  "promptType": "Code Review",
  "variables": {
    "language": "JavaScript",
    "code": "function hello() { console.log('Hello World'); }"
  },
  "userId": "user-id"
}
*/
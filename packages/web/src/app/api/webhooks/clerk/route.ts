import { NextRequest, NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { createAdminClient } from '@/lib/supabase/server'

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || ''

export async function POST(req: NextRequest) {
  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(webhookSecret)

  let evt: any

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  // Get the ID and type
  const { id } = evt.data
  const eventType = evt.type

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
  console.log('Webhook body:', body)

  const supabase = createAdminClient()

  try {
    switch (eventType) {
      case 'user.created':
        await handleUserCreated(evt.data, supabase)
        break
      case 'user.updated':
        await handleUserUpdated(evt.data, supabase)
        break
      case 'user.deleted':
        await handleUserDeleted(evt.data, supabase)
        break
      default:
        console.log(`Unhandled webhook event type: ${eventType}`)
    }
  } catch (error) {
    console.error('Error handling webhook:', error)
    return new Response('Error handling webhook', { status: 500 })
  }

  return new Response('', { status: 200 })
}

async function handleUserCreated(data: any, supabase: any) {
  const { data: user, error } = await supabase
    .from('users')
    .insert({
      clerk_id: data.id,
      email: data.email_addresses[0]?.email_address,
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      image_url: data.image_url
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating user:', error)
    throw error
  }

  console.log('User created:', user)
}

async function handleUserUpdated(data: any, supabase: any) {
  const { data: user, error } = await supabase
    .from('users')
    .update({
      email: data.email_addresses[0]?.email_address,
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      image_url: data.image_url
    })
    .eq('clerk_id', data.id)
    .select()
    .single()

  if (error) {
    console.error('Error updating user:', error)
    throw error
  }

  console.log('User updated:', user)
}

async function handleUserDeleted(data: any, supabase: any) {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('clerk_id', data.id)

  if (error) {
    console.error('Error deleting user:', error)
    throw error
  }

  console.log('User deleted:', data.id)
}
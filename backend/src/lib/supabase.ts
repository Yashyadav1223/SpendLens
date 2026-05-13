import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { WebSocketLikeConstructor } from '@supabase/realtime-js'
import WebSocket from 'ws'
import { env, isTest } from '../config/env.js'

let supabaseClient: SupabaseClient | null = null

if (!isTest && env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY) {
  supabaseClient = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    realtime: {
      transport: WebSocket as unknown as WebSocketLikeConstructor,
    },
  })
}

export function getSupabaseClient() {
  return supabaseClient
}

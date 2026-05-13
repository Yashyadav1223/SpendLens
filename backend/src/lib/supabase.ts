import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { WebSocketLikeConstructor } from "@supabase/realtime-js";
import WebSocket from "ws";
import { env, isTest } from "../config/env.js";

let supabaseClient: SupabaseClient | null = null;

if (!isTest) {
  if (env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY) {
    console.log("Initializing Supabase client...");
    try {
      supabaseClient = createClient(
        env.SUPABASE_URL,
        env.SUPABASE_SERVICE_ROLE_KEY,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false,
          },
          realtime: {
            transport: WebSocket as unknown as WebSocketLikeConstructor,
          },
        },
      );
      console.log("Supabase client initialized successfully.");
    } catch (error) {
      console.error("Failed to initialize Supabase client:", error);
    }
  } else {
    console.warn(
      "Supabase URL or Service Role Key is missing. Supabase client will not be initialized.",
    );
  }
}

export function getSupabaseClient() {
  if (!supabaseClient) {
    console.warn(
      "getSupabaseClient called but Supabase client is null. Check environment variables.",
    );
  }
  return supabaseClient;
}

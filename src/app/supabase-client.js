import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://yhqockxzayeitruxjefb.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true, // This ensures the JWT stays in LocalStorage
    autoRefreshToken: true,
  }
})

export default supabase;


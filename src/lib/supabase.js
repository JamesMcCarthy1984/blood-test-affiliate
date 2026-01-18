import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wvqfdypifomlxxtijmam.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2cWZkeXBpZm9tbHh4dGlqbWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3NTg4MzgsImV4cCI6MjA4NDMzNDgzOH0.sCVGNI6WVJGd5UfIW1g0o4nfO_RMehI6e6cBJsgiGHI'

console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key:', supabaseAnonKey)
console.log('Key length:', supabaseAnonKey?.length)

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials!')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

console.log('Supabase client created:', supabase)
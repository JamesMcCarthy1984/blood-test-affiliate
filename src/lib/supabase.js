import { createClient } from '@supabase/supabase-js'

// Hardcoded for testing - NEVER commit this to GitHub
const supabaseUrl = 'https://fjdzzvtzjztwevqxiqe.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqZHp6dnR6anp0d2V2cXF4aXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3MzAxNTQsImV4cCI6MjA4NDMwNjE1NH0.TLRxb5godvoGU2ARFgIXyd8WeIU8aPHyxd4TPpobzG4'

console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key:', supabaseAnonKey ? 'Present' : 'Missing')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
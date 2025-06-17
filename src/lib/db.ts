import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://emchfippjpavibdpoppb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtY2hmaXBwanBhdmliZHBvcHBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMTE5MjksImV4cCI6MjA2NDY4NzkyOX0.XfKpwYUCoe4eCHnHmRo7CAcBNWRvA2KzWqh43JEKJvQ';

// Tambahkan log untuk verifikasi

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://emchfippjpavibdpoppb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtY2hmaXBwanBhdmliZHBvcHBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMTE5MjksImV4cCI6MjA2NDY4NzkyOX0.XfKpwYUCoe4eCHnHmRo7CAcBNWRvA2KzWqh43JEKJvQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fungsi untuk increment visitor hari ini
export async function incrementVisitor() {
  try {
    const today = new Date().toISOString().split('T')[0];

    // Cek data visitor hari ini
    const { data, error } = await supabase
      .from('visitors')
      .select('id, visitor_count')
      .eq('visit_date', today)
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 artinya no rows returned
      console.error('Error checking visitor record:', error);
      return;
    }

    if (data) {
      // Update count +1
      return await supabase
        .from('visitors')
        .update({ visitor_count: data.visitor_count + 1 })
        .eq('id', data.id);
    } else {
      // Insert baru jika belum ada
      return await supabase
        .from('visitors')
        .insert([{ visit_date: today, visitor_count: 1 }]);
    }
  } catch (err) {
    console.error('Unexpected error incrementing visitor:', err);
  }
}

export default supabase;

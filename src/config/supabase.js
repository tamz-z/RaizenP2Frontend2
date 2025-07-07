import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cbrpheqlwzrlzlnwmqdl.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNicnBoZXFsd3pybHpsbndtcWRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNjE3OTcsImV4cCI6MjA2NTczNzc5N30.H6I247QRddTOfbpesmHzBIrqMqqVUgObvzPniZ8J3v8";

export const supabase = createClient(supabaseUrl, supabaseKey);
export const supabaseAuth = supabase.auth;
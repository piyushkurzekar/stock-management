import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://rjanesvqbdlsefgqubpr.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqYW5lc3ZxYmRsc2VmZ3F1YnByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzc2MTYsImV4cCI6MjA3NDcxMzYxNn0.waIraBaKOzgHxz1HOdV4n47U3jR4PP_GNd7XE_fJDT8"; // backend safe key

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jlgmunhgwnngprelfiwc.supabase.co";
const supabaseAnonKey = "sb_publishable_I3xJsLAF1hEJEJ23q6Ql6g_hA4sghBK";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

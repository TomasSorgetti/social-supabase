import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zphfngbkvqiatklcdqzx.supabase.co";
const supabaseKey = "sb_publishable_bjFRPiKBK6RQn74N_kIHtQ_421kwXvd";

export const supabase = createClient(supabaseUrl, supabaseKey);

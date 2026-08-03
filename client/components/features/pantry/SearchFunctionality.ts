import { supabase } from "@/utils/supabase";

export async function searchIngredients(query: string) {
  if (!query.trim()) return [];

  const { data, error } = await supabase
    .from("foods")
    .select("id, name, category")
    .or(`name.ilike.%${query}%,alternate_names.ilike.%${query}%`)
    .limit(20);

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

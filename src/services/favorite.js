import { supabase } from "../lib/supabase";

export async function addFavorite(postId, userId) {
  const { error } = await supabase
    .from("favorites")
    .insert([{ post_id: postId, user_id: userId }]);

  if (error) throw error;

  return true;
}

export async function removeFavorite(postId, userId) {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("post_id", postId)
    .eq("user_id", userId);

  if (error) throw error;

  return true;
}

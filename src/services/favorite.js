import { supabase } from "../lib/supabase";

/**
 * Agrega un post a los favoritos
 * @param {string} postId
 * @param {string} userId
 * @returns {Promise<boolean>} true si se agregó correctamente
 * @throws {Error} Si ocurre un error
 */
export async function addFavorite(postId, userId) {
  const { error } = await supabase
    .from("favorites")
    .insert([{ post_id: postId, user_id: userId }]);

  if (error) throw error;

  return true;
}

/**
 * Elimina un post de los favoritos
 * @param {string} postId
 * @param {string} userId
 * @returns {Promise<boolean>} Devuelve true si se eliminó correctamente
 * @throws {Error} Si ocurre un error al eliminar
 */
export async function removeFavorite(postId, userId) {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("post_id", postId)
    .eq("user_id", userId);

  if (error) throw error;

  return true;
}

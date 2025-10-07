import { supabase } from "../lib/supabase";

/**
 * Obtiene los comentarios de un post
 * @param {string} postId
 * @returns {Promise<{data: object[], error: object|null}>} Los comentarios y error
 */
export async function getComments(postId) {
  return await supabase
    .from("comments")
    .select(
      `
            id,
            content,
            created_at,
            profile ( username )
          `
    )
    .eq("post_id", postId)
    .order("created_at", { ascending: true });
}

/**
 * Agrega un nuevo comentario
 * @param {string} postId
 * @param {string} userId
 * @param {string} newComment
 * @returns {Promise<{data: object, error: object|null}>} Comentario creado y error
 */
export async function addComment(postId, userId, newComment) {
  return await supabase
    .from("comments")
    .insert([
      {
        post_id: postId,
        user_id: userId,
        content: newComment,
      },
    ])
    .select("id, content, profile(username)")
    .single();
}

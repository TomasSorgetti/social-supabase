import { supabase } from "../lib/supabase";

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

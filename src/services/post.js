import { supabase } from "../lib/supabase";

export function usePostState(callback) {
  const postChannel = supabase.channel("posts");

  postChannel
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "posts",
      },
      (payload) => {
        messages.value.push(payload.new);
      }
    )
    .subscribe();

  return () => {
    postChannel.unsubscribe();
  };
}

export async function getPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      id,
      content,
      created_at,
      user:profile (
        id,
        username,
        avatar
      ),
      comments (
        id
      ),
      favorites (
        id
      )
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function createPost(userId, formData) {
  const { error } = await supabase.from("posts").insert([
    {
      content: formData.message,
      user_id: userId,
      created_at: new Date().toISOString(),
    },
  ]);
  if (error) throw error;
}

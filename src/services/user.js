import { supabase } from "../lib/supabase";

/**
 *
 * @param {*} userId
 */
export async function getProfile(userId) {
  return await supabase.from("profile").select("*").eq("id", userId).single();
}

/**
 *
 * @param {*} data
 */
export async function createUserProfile(data) {
  // validate data
  const { error } = await supabase.from("profile").insert(data);

  if (error) throw new Error(error.message);
}

/**
 *
 * @param {*} data
 */
export async function updateUserProfile(data) {
  const { id, username, tag } = data;

  const { error } = await supabase
    .from("profile")
    .update({ username, tag })
    .eq("id", id);

  if (error) throw new Error(error.message);
}

export async function getUserProfileById(userId) {
  const { data, error } = await supabase
    .from("profile")
    .select(
      `
      id,
      username,
      avatar,
      tag,
      posts (
        id,
        content,
        created_at,
        favorites (
          id,
          user_id
        ),
        comments ( id )
      )
    `
    )
    .eq("id", userId)
    .single();

  if (error) throw new Error(error.message);

  const postsWithExtras = data.posts.map((post) => ({
    ...post,
    isFavorited: post.favorites.some((fav) => fav.user_id === userId),
    favoritesCount: post.favorites.length,
  }));

  return {
    ...data,
    posts: postsWithExtras,
  };
}

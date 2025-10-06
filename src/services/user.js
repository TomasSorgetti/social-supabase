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
  // validate data
  const { error } = await supabase.from("profile").insert(data);

  if (error) throw new Error(error.message);
}

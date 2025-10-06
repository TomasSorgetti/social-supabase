import { supabase } from "../lib/supabase";
import { getProfile } from "./user";

let user = {
  id: null,
  email: null,
  profileId: null,
  username: null,
  tag: null,
  avatar: null,
};
let observers = [];

if (localStorage.getItem("user")) {
  user = JSON.parse(localStorage.getItem("user"));
  getUser();
}

async function getUser() {
  // const isLoggedIn = localStorage.getItem("isLoggedIn");
  // if (!isLoggedIn) return;

  // if (user.id) return;

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    console.warn("No user logged in.", error);
    return;
  }

  setUser({
    id: data.user.id,
    email: data.user.email,
  });

  await loadUserProfile(data.user.id);
}

async function loadUserProfile(userId) {
  if (!userId) return;

  const { data, error } = await getProfile(userId);

  if (error) {
    console.warn("Error loading profile", error);
    return;
  }

  setUser({
    profileId: data.user_id,
    username: data.username,
    avatar: data.avatar_url,
    tag: data.tag,
  });
}

export async function signUpUser({ email, password }) {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) throw new Error(error.message);

  setUser({ id: data.user.id, email: data.user.email });

  // localStorage.setItem("isLoggedIn", "true");

  return data;
}

export async function signInUser({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  setUser({ id: data.user.id, email: data.user.email });

  await loadUserProfile(data.user.id);

  return data.user;
}

export async function signOutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);

  // localStorage.removeItem("isLoggedIn");

  setUser({ id: null, email: null });
}

export function useAuthState(callback) {
  observers.push(callback);

  notify(callback);

  return () => {
    observers = observers.filter((o) => o !== callback);
  };
}

function notify(callback) {
  callback({ ...user });
}

function notifyAll() {
  observers.forEach(notify);
}

function setUser(data) {
  user = {
    ...user,
    ...data,
  };

  if (user.id) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.removeItem("user");
  }

  notifyAll();
}

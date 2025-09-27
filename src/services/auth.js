import { supabase } from "../lib/supabase";

let user = {
  id: null,
  email: null,
};
let observers = [];

getUserProfile();

async function getUserProfile() {
  // const isLoggedIn = localStorage.getItem("isLoggedIn");
  // if (!isLoggedIn) return;

  // if (user.id) return;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.warn("No user logged in.", error);
    return;
  }

  setUser({
    id: data.user.id,
    email: data.user.email,
  });
}

export async function signUpUser({ email, password }) {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) throw new Error(error.message);

  setUser({ id: data.user.id, email: data.user.email });

  localStorage.setItem("isLoggedIn", "true");

  return data;
}

export async function signInUser({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  setUser({ id: data.user.id, email: data.user.email });

  console.log("Data: ", data);

  return data.user;
}

export async function signOutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);

  localStorage.removeItem("isLoggedIn");

  setUser({ id: null, email: null });
}

export async function useAuthState(callback) {
  observers.push(callback);

  notify(callback);
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
  notifyAll();
}

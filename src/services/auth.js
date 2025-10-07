import { supabase } from "../lib/supabase";
import { createUserProfile, getProfile } from "./user";

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

/**
 * Obtiene el usuario actual y carga su perfil.
 */
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

/**
 * Carga el perfil del usuario
 * @param {string} userId
 */
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

/**
 * Registra un usuario.
 * @param {{username: string, email: string, password: string}}
 * @returns {Promise<object>}
 * @throws {Error} Si ocurre un error
 */
export async function signUpUser({ username, email, password }) {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) throw new Error(error.message);

  await createUserProfile({ username, id: data.user.id });

  setUser({ id: data.user.id, email: data.user.email, username });

  // localStorage.setItem("isLoggedIn", "true");

  return data;
}

/**
 * Inicia sesión
 * @param {{email: string, password: string}} param0 Credenciales
 * @returns {Promise<object>} Info del usuario
 * @throws {Error} Si ocurre un error
 */
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

/**
 * Cierra la sesión
 * @throws {Error} Si ocurre un error
 */
export async function signOutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);

  // localStorage.removeItem("isLoggedIn");

  setUser({
    id: null,
    email: null,
    profileId: null,
    username: null,
    tag: null,
    avatar: null,
  });
}

/**
 * Permite suscribirse a los cambios del estado
 * @param {Function} callback Función que se ejecuta al cambiar el estado
 * @returns {Function} Función para cancelar la suscripción
 */
export function useAuthState(callback) {
  observers.push(callback);

  notify(callback);

  return () => {
    observers = observers.filter((o) => o !== callback);
  };
}

/**
 * Notifica a un observer con el estado actual del user
 * @param {Function} callback Observer
 */
function notify(callback) {
  callback({ ...user });
}

/** Notifica a todos los observers */
function notifyAll() {
  observers.forEach(notify);
}

/**
 * Actualiza los datos y notifica a los observers.
 * @param {Partial<typeof user>} data datos del usuario
 */
export function setUser(data) {
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

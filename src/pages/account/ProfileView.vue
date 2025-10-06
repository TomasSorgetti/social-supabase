<script>
import { useAuthState } from "../../services/auth";

let unsubscribeFromAuthState = () => {};

export default {
  name: "ProfileView",
  data() {
    return {
      user: {
        id: null,
        email: null,
        profileId: null,
        username: null,
        tag: null,
        avatar: null,
      },
    };
  },
  mounted() {
    unsubscribeFromAuthState = useAuthState(
      (userState) => (this.user = userState)
    );
    console.log("user", this.user);
  },
  unmounted() {
    unsubscribeFromAuthState();
  },
};
</script>

<template>
  <main class="my-32">
    <h1>Profile Page</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut voluptates
      repellendus in itaque ipsa! Quasi accusamus molestias quas similique
      alias, consequuntur doloribus vel minima ut nam. Sed quo aut natus!
    </p>
    <ul>
      <li>Username: {{ user.username }}</li>
      <li>Tag: {{ user.tag }}</li>
      <li>Email: {{ user.email }}</li>
    </ul>
  </main>
</template>

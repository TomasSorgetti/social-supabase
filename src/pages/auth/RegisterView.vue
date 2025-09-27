<script>
import EmailIcon from "../../assets/icons/email.svg";
import PasswordIcon from "../../assets/icons/password.svg";
import UserIcon from "../../assets/icons/user.svg";

import { signUpUser } from "../../services/auth";

import CustomForm from "../../components/ui/form/CustomForm.vue";
import CustomInput from "../../components/ui/form/CustomInput.vue";
import CustomCheck from "../../components/ui/form/CustomCheck.vue";
import FormButton from "../../components/ui/buttons/FormButton.vue";
import GoogleButton from "../../components/ui/buttons/GoogleButton.vue";
import GithubButton from "../../components/ui/buttons/GithubButton.vue";

export default {
  name: "RegisterPage",
  components: {
    CustomForm,
    CustomInput,
    CustomCheck,
    FormButton,
    GoogleButton,
    GithubButton,
  },
  data() {
    return {
      EmailIcon,
      PasswordIcon,
      UserIcon,

      form: {
        username: "",
        email: "",
        password: "",
        terms: "",
      },

      loading: false,
      error: "",
    };
  },
  methods: {
    async handleSubmit() {
      this.error = "";
      this.loading = true;

      try {
        const data = await signUpUser(this.form);

        // todo => remove log
        console.log(data);

        this.$router.push("/chat");
      } catch (err) {
        this.error = err.message || "Something went wrong";
      } finally {
        this.loading = false;
      }
    },

    handleChange() {
      this.error = "";
    },
  },
};
</script>

<template>
  <main class="py-36">
    <CustomForm
      @submit.prevent="handleSubmit"
      class="flex flex-col gap-4 w-full max-w-[30rem] mx-auto"
    >
      <h1 class="text-3xl font-bold">Sign up</h1>
      <p class="text-font-secondary">
        We´ll get you up and running so you can verify your personal information
        and customize your account.
      </p>

      <div class="flex gap-4 items-center w-full">
        <GoogleButton>Sign up with Google</GoogleButton>
        <GithubButton>Sign up with GitHub</GithubButton>
      </div>

      <small class="text-red-500 text-sm min-h-5">
        {{ error }}
      </small>

      <CustomInput
        id="username"
        type="text"
        name="username"
        label="Username:"
        placeholder="John Doe"
        :icon="UserIcon"
        v-model:value="form.username"
        @change="handleChange"
      />

      <CustomInput
        id="email"
        type="email"
        name="email"
        label="Email:"
        placeholder="abc@xyz.com"
        :icon="EmailIcon"
        v-model:value="form.email"
        @change="handleChange"
      />

      <CustomInput
        id="password"
        type="password"
        name="password"
        label="Password:"
        placeholder="********"
        :icon="PasswordIcon"
        v-model:value="form.password"
        @change="handleChange"
      />

      <div class="mt-4 flex items-center gap-1">
        <CustomCheck id="terms" v-model="form.terms"> Accept </CustomCheck>
        <span
          class="underline italic cursor-pointer text-font-secondary hover:text-font-primary"
          >terms and conditions</span
        >
      </div>

      <FormButton
        :loading="loading"
        :disabled="form.email.trim() === '' || form.password.trim() === ''"
        class="mt-4"
        >Sign Up</FormButton
      >

      <small class="text-base text-center mt-4 text-font-secondary">
        You allready have an account?
        <RouterLink to="/auth/register" class="text-primary hover:underline">
          Sign In
        </RouterLink>
      </small>
    </CustomForm>
  </main>
</template>

<script>
import EmailIcon from "../../assets/icons/email.svg";
import PasswordIcon from "../../assets/icons/password.svg";

import { signInUser } from "../../services/auth";

import CustomForm from "../../components/ui/form/CustomForm.vue";
import CustomInput from "../../components/ui/form/CustomInput.vue";
import CustomCheck from "../../components/ui/form/CustomCheck.vue";
import FormButton from "../../components/ui/buttons/FormButton.vue";
import GoogleButton from "../../components/ui/buttons/GoogleButton.vue";
import GithubButton from "../../components/ui/buttons/GithubButton.vue";

export default {
  name: "LoginPage",
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

      form: {
        email: "",
        password: "",
        rememberme: false,
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
        const data = await signInUser(this.form);

        // todo => remove log
        console.log(data);

        this.$router.push("/feed");
      } catch (err) {
        this.error = err.message || "Something went wrong";
      } finally {
        this.loading = false;
      }
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
      <h1 class="text-3xl font-bold">{{ $t("LoginPage.title") }}</h1>
      <p class="text-font-secondary">
        {{ $t("LoginPage.content") }}
      </p>

      <div class="flex gap-4 items-center w-full">
        <GoogleButton>{{ $t("LoginPage.google") }}</GoogleButton>
        <GithubButton>{{ $t("LoginPage.github") }}</GithubButton>
      </div>

      <small class="text-red-500 text-sm min-h-5">
        {{ error }}
      </small>

      <CustomInput
        id="email"
        type="email"
        name="email"
        :label="$t('LoginPage.email')"
        placeholder="abc@xyz.com"
        :icon="EmailIcon"
        v-model:value="form.email"
      />

      <CustomInput
        id="password"
        type="password"
        name="password"
        :label="$t('LoginPage.password')"
        placeholder="********"
        :icon="PasswordIcon"
        v-model:value="form.password"
      />

      <div class="flex items-center justify-between w-full mt-4">
        <CustomCheck id="rememberme" v-model="form.rememberme">
          {{ $t("LoginPage.rememberme") }}
        </CustomCheck>
        <RouterLink
          to="/auth/forgot-password"
          class="italic text-sm text-font-secondary hover:underline"
        >
          {{ $t("LoginPage.forgot") }}
        </RouterLink>
      </div>

      <FormButton
        :loading="loading"
        :disabled="form.email.trim() === '' || form.password.trim() === ''"
        class="mt-4"
        >{{ $t("LoginPage.signin") }}</FormButton
      >

      <small class="text-base text-center mt-4 text-font-secondary">
        {{ $t("LoginPage.allready") }}
        <RouterLink to="/auth/register" class="text-primary hover:underline">
          {{ $t("LoginPage.signup") }}
        </RouterLink>
      </small>
    </CustomForm>
  </main>
</template>

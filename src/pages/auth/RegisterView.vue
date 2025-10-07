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

        this.$router.push("/feed");
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
      class="flex flex-col gap-4 w-full max-w-[32rem] mx-auto"
    >
      <h1 class="text-3xl font-bold">{{ $t("RegisterPage.title") }}</h1>
      <p class="text-font-secondary">
        {{ $t("RegisterPage.content") }}
      </p>

      <div class="flex gap-2 items-center w-full">
        <GoogleButton>{{ $t("RegisterPage.google") }}</GoogleButton>
        <GithubButton>{{ $t("RegisterPage.github") }}</GithubButton>
      </div>

      <small class="text-red-500 text-sm min-h-5">
        {{ error }}
      </small>

      <CustomInput
        id="username"
        type="text"
        name="username"
        :label="$t('RegisterPage.username')"
        placeholder="John Doe"
        :icon="UserIcon"
        v-model:value="form.username"
        @change="handleChange"
      />

      <CustomInput
        id="email"
        type="email"
        name="email"
        :label="$t('RegisterPage.email')"
        placeholder="abc@xyz.com"
        :icon="EmailIcon"
        v-model:value="form.email"
        @change="handleChange"
      />

      <CustomInput
        id="password"
        type="password"
        name="password"
        :label="$t('RegisterPage.password')"
        placeholder="********"
        :icon="PasswordIcon"
        v-model:value="form.password"
        @change="handleChange"
      />

      <div class="mt-4 flex items-center gap-1">
        <CustomCheck id="terms" v-model="form.terms">
          {{ $t("RegisterPage.accept") }}
        </CustomCheck>
        <span
          class="underline italic cursor-pointer text-font-secondary hover:text-font-primary"
          >{{ $t("RegisterPage.terms") }}</span
        >
      </div>

      <FormButton
        :loading="loading"
        :disabled="form.email.trim() === '' || form.password.trim() === ''"
        class="mt-4"
        >{{ $t("RegisterPage.signup") }}</FormButton
      >

      <small class="text-base text-center mt-4 text-font-secondary">
        {{ $t("RegisterPage.allready") }}
        <RouterLink to="/auth/login" class="text-primary hover:underline">
          {{ $t("RegisterPage.signin") }}
        </RouterLink>
      </small>
    </CustomForm>
  </main>
</template>

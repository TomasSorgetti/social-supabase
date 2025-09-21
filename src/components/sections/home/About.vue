<script setup>
import AboutCard from "../../ui/cards/AboutCard.vue";
import CommunityImage from "../../../assets/images/community.webp";
import SimplicityImage from "../../../assets/images/simplicity.webp";
import IdentityImage from "../../../assets/images/identity.webp";
</script>

<template>
  <section
    class="container mx-auto text-center w-full h-full flex flex-col items-center space-y-6"
  >
    <h2 class="text-5xl font-semibold max-w-[35rem]">
      {{ $t("HomePage.About.title") }}
    </h2>
    <p class="text-base lg:text-lg text-font-secondary max-w-[30rem]">
      {{ $t("HomePage.About.description") }}
    </p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-20">
      <AboutCard
        :label="$t('HomePage.About.cards.0.label')"
        :title="$t('HomePage.About.cards.0.title')"
        :description="$t('HomePage.About.cards.0.description')"
        :image="CommunityImage"
        variant="primary"
      />
      <AboutCard
        :label="$t('HomePage.About.cards.1.label')"
        :title="$t('HomePage.About.cards.1.title')"
        :description="$t('HomePage.About.cards.1.description')"
        :image="SimplicityImage"
        variant="tertiary"
      />
      <AboutCard
        :label="$t('HomePage.About.cards.2.label')"
        :title="$t('HomePage.About.cards.2.title')"
        :description="$t('HomePage.About.cards.2.description')"
        :image="IdentityImage"
        variant="secondary"
      />
    </div>
  </section>
</template>

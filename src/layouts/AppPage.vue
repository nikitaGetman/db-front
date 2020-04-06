<template>
  <div class="app-page">
    <app-header @profile-click="toggleDrawer" />
    <div class="app-page__container">
      <aside class="app-page__left-side">
        <slot name="left-side" />
      </aside>
      <main class="app-page__content-wrapper">
        <slot />
      </main>
      <aside class="app-page__right-side">
        <slot name="right-side" />
      </aside>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
  name: "AppPage",
  components: {
    AppHeader
  },
  data() {
    return {};
  },
  methods: {
    toggleDrawer() {}
  }
};
</script>

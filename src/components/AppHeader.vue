<template>
  <header class="app-header">
    <div class="app-header__content">
      <nav class="app-header__nav">
        <ul class="app-header__list">
          <router-link :to="{ name: 'settings' }">Настройки</router-link>
          <el-button type="text" @click="logout">Выход</el-button>
        </ul>

        <ul class="app-header__list">
          <li class="app-header__profile">
            <button
              type="button"
              class="app-header__profile-button"
              @click="handleProfileClick"
            >
              {{ profileName }}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import { LOGOUT } from "@/store/actions/types";

export default {
  name: "AppHeader",
  computed: {
    profileName() {
      return "profile name";
    },
    navigationItems() {
      return [
        { to: { name: "settings" }, name: "Настройки" },
        { to: { name: "" }, name: "Выход" }
      ];
    }
  },
  methods: {
    handleProfileClick() {
      this.$emit("profile-click");
    },
    logout() {
      this.$store
        .dispatch(LOGOUT)
        .then(() => this.$router.push({ name: "login" }));
    }
  }
};
</script>

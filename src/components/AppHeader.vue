<template>
  <header class="app-header">
    <div class="app-header__content">
      <div class="app-header__logo">Online Passport</div>
      <nav class="app-header__nav">
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
        <ul class="app-header__list">
          <el-button type="text" @click="logout" class="app-header__link"
            >Logout</el-button
          >
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import { LOGOUT } from "@/store/actions/types";
import { MODULE_NAME as AUTH } from "@/store/modules/auth";

export default {
  name: "AppHeader",
  computed: {
    profileName() {
      return this.$store.state[AUTH].model.login;
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

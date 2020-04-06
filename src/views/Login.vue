<template>
  <app-page-centered>
    <div class="login" v-loading="loading">
      <div class="login__header">Online Passport</div>
      <el-tabs
        v-model="activeName"
        class="login__body"
        @tab-click="handleClick"
      >
        <!-- User login tab -->
        <el-tab-pane label="User" name="user">
          <div class="login__form">
            <el-input
              class="login__field"
              placeholder="Please input login"
              v-model="userLogin"
              clearable
              size="medium"
            />
            <el-input
              class="login__field"
              placeholder="Please input password"
              v-model="userPassword"
              show-password
              size="medium"
            />
          </div>

          <div class="login__error">{{ error }}</div>
          <el-button @click="loginAsUser" size="medium" type="primary"
            >Login</el-button
          >
        </el-tab-pane>
        <!-- Service login tab -->
        <el-tab-pane label="Service" name="service">
          <div class="login__form">
            <el-input
              class="login__field"
              placeholder="Please input service login"
              v-model="serviceLogin"
              clearable
              size="medium"
            />
            <el-input
              class="login__field"
              placeholder="Please input service password"
              v-model="servicePassword"
              show-password
              size="medium"
            />
          </div>

          <div class="login__error">{{ error }}</div>
          <el-button @click="loginAsService" size="medium" type="primary"
            >Login</el-button
          >
        </el-tab-pane>
      </el-tabs>
    </div>
  </app-page-centered>
</template>

<script>
import AppPageCentered from "@/layouts/AppPageCentered.vue";
import {
  USER_LOGIN,
  SERVICE_LOGIN,
  MODULE_NAME as AUTH
} from "@/store/modules/auth";

export default {
  name: "Login",
  components: {
    AppPageCentered
  },
  data() {
    return {
      userLogin: "user1",
      userPassword: "qwerty",
      serviceLogin: "service1",
      servicePassword: "qwerty",
      activeName: "user",
      error: ""
    };
  },
  computed: {
    loading() {
      return this.$store.state[AUTH].loading;
    }
  },
  methods: {
    handleClick() {
      this.error = "";
    },
    loginAsUser() {
      this.$store
        .dispatch(USER_LOGIN, {
          username: this.userLogin,
          password: this.userPassword
        })
        .then(() => {
          this.$router.push({ name: "dashboard" });
        })
        .catch(() => {
          this.error = "Ошибка авторизации";
        });
    },
    loginAsService() {
      this.$store
        .dispatch(SERVICE_LOGIN, {
          username: this.serviceLogin,
          password: this.servicePassword
        })
        .then(() => {
          this.$router.push({ name: "service" });
        })
        .catch(() => {
          this.error = "Ошибка авторизации";
        });
    }
  }
};
</script>

<style lang="scss">
.login {
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: $--slate-blue;
  font-size: 16px;

  &__header {
    font-size: 32px;
    margin-bottom: 32px;
  }

  &__body {
    width: 100%;
    text-align: center;
    margin-bottom: 24px;
  }

  &__field {
    margin-top: 12px;
  }

  &__error {
    margin-top: 12px;
    height: 24px;
    color: $--red;
  }

  .el-tabs {
    &__nav {
      width: 100%;
    }

    &__item {
      width: 50%;
      font-size: 20px;
    }
  }
}
</style>

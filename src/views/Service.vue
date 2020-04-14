<template>
  <app-page>
    <app-page-content>
      <div class="service__title">
        This is your Online Passport service account. Here you can see users
        that granted you access to their personal data and manage required
        fields
      </div>
      <div class="service__users">
        <div class="service__users-header">
          <div class="service__users-title">
            Users Statistic
            <span class="badge">({{ usersAuthedLength }})</span>:
          </div>
        </div>
        <div class="service__users-list">
          <p class="placeholder" v-if="!usersAuthedLength">
            There is no authenticated users yet
          </p>
          <user-row v-for="(user, index) in users" :user="user" :key="index" />
        </div>
      </div>
      <div class="service__data">
        <div class="service__data-title">
          Required data groups (you can only change settings when there are no
          authorized users):
        </div>
        <div class="service__data-list">
          <el-checkbox
            class="service__data-item"
            v-for="(field, index) in localPermission"
            :key="index"
            v-model="localPermission[index].value"
            >{{ field.group_code }}</el-checkbox
          >
        </div>
        <el-button
          type="success"
          size="medium"
          @click="saveRequiredFields"
          :disabled="usersAuthedLength > 0"
          >Save</el-button
        >
      </div>
    </app-page-content>
  </app-page>
</template>

<script>
import AppPage from "@/layouts/AppPage.vue";
import AppPageContent from "@/layouts/AppPageContent.vue";
import UserRow from "@/components/UserRow.vue";
import {
  FETCH_DATA_GROUPS,
  FETCH_SELECTED_GROUPS,
  FETCH_AUTHED_USERS,
  SET_PERMISSION
} from "@/store/modules/services";

export default {
  name: "Service",
  components: {
    AppPage,
    AppPageContent,
    UserRow
  },
  data() {
    return {
      isSelectServiceVisible: false,
      localPermission: [],
      dataGroups: [],
      users: {}
    };
  },
  computed: {
    usersAuthedLength() {
      return Object.keys(this.users).length;
    }
  },
  created() {
    this.fetchPermissions().then(() => {
      this.fetchServicePermisssions();
    });
    this.fetchAuthedUsers();
  },
  methods: {
    fetchPermissions() {
      return this.$store.dispatch(FETCH_DATA_GROUPS).then(data => {
        this.dataGroups = data.groups;
      });
    },
    fetchServicePermisssions() {
      return this.$store.dispatch(FETCH_SELECTED_GROUPS).then(data => {
        const { permission } = data;
        this.localPermission = this.dataGroups.map(g => {
          return {
            ...g,
            value: permission.find(p => p.group_id === g.id) ? true : false
          };
        });
      });
    },
    fetchAuthedUsers() {
      return this.$store.dispatch(FETCH_AUTHED_USERS).then(data => {
        this.users = data.users;
      });
    },
    saveRequiredFields() {
      this.$store.dispatch(SET_PERMISSION, this.localPermission);
    }
  }
};
</script>

<style lang="scss">
.service {
  &__title {
    color: $--slate-blue;
    font-size: 24px;
  }
  &__users,
  &__data {
    margin-top: 48px;
    width: 100%;

    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &-title {
      color: $--slate-blue;
      font-size: 24px;
      font-weight: bold;
    }
    &-list {
      margin-top: 24px;
      display: flex;
      flex-direction: column;
    }
    &-item {
      margin-bottom: 12px;
      margin-left: 20px;
    }
  }
}
.badge {
  font-style: italic;
  font-weight: normal;
  color: $--dim-blue;
}

.placeholder {
  text-align: center;
  color: $--slate-blue;
  font-size: 24px;
}
</style>

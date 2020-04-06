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
          <user-row v-for="(user, index) in users" :user="user" :key="index" />
        </div>
      </div>
      <div class="service__data">
        <div class="service__data-title">Required Fields:</div>
        <div class="service__data-list">
          <el-checkbox
            class="service__data-item"
            v-for="(field, index) in dataTypes"
            :key="index"
            v-model="localPermission[field.name]"
            >{{ field.name }}</el-checkbox
          >
        </div>
        <el-button type="success" size="medium" @click="saveRequiredFields"
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
  FETCH_DATA_FIELDS,
  FETCH_SELECTED_FIELDS,
  FETCH_AUTHED_USERS
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
      dataTypes: [
        { name: "Name" },
        { name: "Surname" },
        { name: "Passport" },
        { name: "Address" }
      ],
      users: [
        { name: "Ivan", age: 22 },
        { name: "Petr", age: 31 },
        { name: "Jack", age: 18 }
      ]
    };
  },
  computed: {
    usersAuthedLength() {
      return this.users.length;
    }
  },
  created() {
    this.$store.dispatch(FETCH_DATA_FIELDS).then(data => {
      console.log(data);
      this.dataTypes = data;

      this.$store.dispatch(FETCH_SELECTED_FIELDS).then(fields => {
        let res = [];
        this.dataTypes.forEach(type => {
          res[type.name] = fields.find(f => f.name === type.name);
        });
        this.localPermission = res;
      });
    });
    this.$store.dispatch(FETCH_AUTHED_USERS).then(data => {
      console.log(data);
      this.users = data;
    });
  },
  methods: {
    saveRequiredFields() {
      // const res = [];
      console.log("saving", this.localPermission);
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
</style>

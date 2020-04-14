<template>
  <app-page>
    <app-page-content>
      <div class="dashboard__title">
        This is your Online Passport profile. Here you can manage apps that use
        your personal data
      </div>
      <div class="dashboard__services">
        <div class="dashboard__services-header">
          <div class="dashboard__services-title">
            Authorized Services
            <span class="badge">({{ authedServicesLength }})</span>:
          </div>
          <el-button
            type="primary"
            class="dashboard__services-button-add"
            icon="el-icon-plus"
            size="medium"
            @click="addServices"
            >Authorize Service</el-button
          >
        </div>
        <div class="dashboard__services-list">
          <p class="placeholder" v-if="!services.length">
            There is no authenticated services yet
          </p>
          <service-row
            v-for="(service, index) in services"
            :service="service"
            :key="index"
            @delete="deleteService(service)"
          />
        </div>
      </div>
      <div class="dashboard__data">
        <div class="dashboard__data-title">Personal data:</div>
        <div class="dashboard__data-list">
          <personal-data-row
            v-for="(field, index) in personalDataFields"
            :key="index"
            :describer="field"
            :value="getUserValue(field)"
            @save="saveUserValue"
          />
        </div>
      </div>
    </app-page-content>
    <select-service-dialog
      :visible.sync="isSelectServiceVisible"
      @added="fetchAuthedServices"
    />
  </app-page>
</template>

<script>
import AppPage from "@/layouts/AppPage.vue";
import AppPageContent from "@/layouts/AppPageContent.vue";
import ServiceRow from "@/components/ServiceRow.vue";
import PersonalDataRow from "@/components/PersonalDataRow.vue";
import SelectServiceDialog from "@/components/SelectServiceDialog.vue";
import {
  FETCH_DATA_FIELDS,
  DELETE_SERVICE,
  FETCH_AUTHED_SERVICES
} from "@/store/modules/services";
import { FETCH_USER_VALUES, SET_USER_VALUE } from "@/store/modules/auth";

export default {
  name: "Dashboard",
  components: {
    AppPage,
    AppPageContent,
    ServiceRow,
    PersonalDataRow,
    SelectServiceDialog
  },
  data() {
    return {
      isSelectServiceVisible: false,
      dataTypes: [],
      userValues: [],
      services: []
    };
  },
  computed: {
    personalDataFields() {
      return this.dataTypes;
    },
    authedServicesLength() {
      return this.services.length;
    }
  },
  created() {
    this.fetchDataFields();
    this.fetchUserValues();
    this.fetchAuthedServices();
  },
  methods: {
    fetchDataFields() {
      this.$store.dispatch(FETCH_DATA_FIELDS).then(data => {
        this.dataTypes = data.fields;
      });
    },
    fetchUserValues() {
      this.$store.dispatch(FETCH_USER_VALUES).then(data => {
        this.userValues = data.user_data;
      });
    },
    fetchAuthedServices() {
      this.$store.dispatch(FETCH_AUTHED_SERVICES).then(data => {
        this.services = data.services;
      });
    },
    addServices() {
      this.isSelectServiceVisible = true;
    },
    deleteService(service) {
      this.$store.dispatch(DELETE_SERVICE, { service }).then(() => {
        this.fetchAuthedServices();
      });
    },
    getUserValue(field) {
      const value = this.userValues.find(val => val.type_id === field.id);
      return value ? value.value : "";
    },
    saveUserValue(value, field) {
      this.$store.dispatch(SET_USER_VALUE, { field, value }).then(data => {
        if (this.userValues.find(v => v.type_id === data.field)) {
          this.userValues = this.userValues.map(v =>
            v.type_id === data.field ? { ...v, value: data.value } : v
          );
        } else {
          const val = this.dataTypes.find(v => v.id === data.field);

          this.userValues.push({ ...val, value: data.value, type_id: val.id });
        }
      });
    }
  }
};
</script>

<style lang="scss">
.dashboard {
  &__title {
    color: $--slate-blue;
    font-size: 24px;
  }
  &__services,
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

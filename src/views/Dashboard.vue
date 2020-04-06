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
          <service-row
            v-for="service in services"
            :service="service"
            :key="service.id"
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
    <select-service-dialog :visible.sync="isSelectServiceVisible" />
  </app-page>
</template>

<script>
import AppPage from "@/layouts/AppPage.vue";
import AppPageContent from "@/layouts/AppPageContent.vue";
import ServiceRow from "@/components/ServiceRow.vue";
import PersonalDataRow from "@/components/PersonalDataRow.vue";
import SelectServiceDialog from "@/components/SelectServiceDialog.vue";
import { FETCH_DATA_FIELDS } from "@/store/modules/services";

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
      dataTypes: [
        { name: "Name" },
        { name: "Surname" },
        { name: "Passport" },
        { name: "Address" }
      ]
    };
  },
  computed: {
    services() {
      return [
        { title: "Service 1", id: 1 },
        { title: "Berrr", id: 2 },
        { title: "Poiter", id: 3 }
      ];
    },
    personalDataFields() {
      return this.dataTypes;
    },
    authedServicesLength() {
      return this.services.length;
    }
  },
  created() {
    this.$store.dispatch(FETCH_DATA_FIELDS).then(data => {
      console.log(data);
      this.dataTypes = data;
    });
  },
  methods: {
    addServices() {
      this.isSelectServiceVisible = true;
    },
    deleteService(service) {
      console.log("delete", service);
    },
    getUserValue(field) {
      console.log(field);
    },
    saveUserValue(value, field) {
      console.log("save", value, field);
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
</style>

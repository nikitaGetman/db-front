<template>
  <el-dialog
    title="Services List"
    centered
    :visible="visible"
    :before-close="close"
  >
    <div class="select-service-dialog__list">
      <service-row
        class="select-service-dialog__item"
        v-for="(service, index) in services"
        :key="index"
        :service="service"
        is-addable
      />
    </div>
  </el-dialog>
</template>

<script>
import ServiceRow from "@/components/ServiceRow.vue";
import {
  FETCH_SERVICES,
  AUTHENTICATE_SERVICE,
  MODULE_NAME as SERVICES
} from "@/store/modules/services";

export default {
  name: "SelectServiceDialog",
  components: { ServiceRow },
  props: {
    visible: { type: Boolean, required: true }
  },
  data() {
    return {};
  },
  computed: {
    services() {
      return this.$store.state[SERVICES].list;
    }
  },
  created() {
    this.$store.dispatch(FETCH_SERVICES);
  },
  methods: {
    close() {
      this.$emit("update:visible", false);
    },
    authenticateService(service) {
      this.$store.dispatch(AUTHENTICATE_SERVICE, { service });
    }
  }
};
</script>

<style></style>

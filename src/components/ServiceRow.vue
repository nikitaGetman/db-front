<template>
  <div class="service-row">
    <div class="service-row__title">{{ this.service.title }}</div>
    <el-button
      v-if="!isAddable"
      type="text"
      @click="deleteService"
      icon="el-icon-delete"
      size="medium"
      >Delete</el-button
    >
    <el-button
      v-else
      type="primary"
      plain
      @click="addService"
      icon="el-icon-add"
      size="medium"
      >Add</el-button
    >
  </div>
</template>

<script>
export default {
  name: "ServiceRow",
  props: {
    service: { type: Object, required: true },
    isAddable: { type: Boolean, default: false }
  },
  methods: {
    deleteService() {
      this.$emit("delete");
    },
    addService() {
      this.$emit("add");
    }
  }
};
</script>

<style lang="scss">
.service-row {
  margin: 8px 0;
  padding: 8px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $--smoky-white;
  border-radius: 8px;

  &__title {
    font-size: 24px;
    color: $--slate-blue;
  }
}
</style>

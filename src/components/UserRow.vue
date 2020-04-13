<template>
  <div class="user-row">
    <div class="user-row__title">
      <div v-for="(data, index) in user" :key="index">
        <span class="user-row__key">{{ data.type_code }}</span> :
        <span class="user-row__value">{{ data.value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserRow",
  props: {
    user: { type: Array, required: true }
  }
};
</script>

<style lang="scss">
.user-row {
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

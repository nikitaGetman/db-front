<template>
  <div class="personal-data-row">
    <div class="personal-data-row__label">{{ label }}:</div>
    <el-input
      :placeholder="`Enter ${label} value`"
      class="personal-data-row__input"
      v-model="localValue"
      size="medium"
      clearable
    />
    <el-button
      type="success"
      icon="el-icon-check"
      size="medium"
      v-if="localValue !== value"
      @click="saveData"
      >Save</el-button
    >
  </div>
</template>

<script>
export default {
  name: "PersonalDataRow",
  props: {
    describer: {
      type: Object,
      required: true
    },
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      localValue: ""
    };
  },
  created() {
    this.localValue = this.value;
  },
  watch: {
    value(val) {
      this.localValue = val;
    }
  },
  computed: {
    label() {
      return this.describer.type_code;
    }
  },
  methods: {
    saveData() {
      this.$emit("save", { value: this.localValue, field: this.describer });
      // this.localValue =
    }
  }
};
</script>

<style lang="scss">
.personal-data-row {
  display: flex;
  align-items: center;
  margin: 8px 0;
  color: $--slate-blue;

  &__label {
    text-align: right;
    margin-right: 24px;
    font-size: 20px;
    width: 120px;
  }
  &__input {
    max-width: 400px;
    margin-right: 16px;
  }
}
</style>

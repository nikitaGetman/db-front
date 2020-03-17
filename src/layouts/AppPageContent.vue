<template>
  <div :class="сlasses" class="app-page-content">
    <div class="app-page-content__main-column">
      <slot />
    </div>

    <div v-if="$slots.append" class="app-page-content__append-column">
      <slot name="append" />
    </div>
  </div>
</template>

<script>
export default {
  name: "AppPageContent",
  props: {
    appendSize: {
      type: String,
      validator: size => ["short", "wide"].includes(size)
    }
  },
  computed: {
    сlasses() {
      if (this.appendSize) return `app-page-content--append_${this.appendSize}`;
      return this.$slots.append && "app-page-content--append";
    }
  }
};
</script>

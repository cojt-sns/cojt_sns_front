<template>
  <button :disabled="disabled || processing" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'single-submit-button',
  props: {
    // A function which returns Promise.
    onclick: {
      type: Function,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      processing: false,
    };
  },
  methods: {
    handleClick() {
      if (this.processing) return;
      this.processing = true;

      this.onclick().then((res) => {
        if (!res) this.processing = false;
      });
    },
  },
};
</script>

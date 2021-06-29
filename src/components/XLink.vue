<!-- 带颜色的纯文字按钮 -->
<template>
  <Button
    v-bind="$attrs"
    type="text"
    size="small"
    class="base-link"
    :class="classes"
    v-on="$listeners"
  >
    <slot />
  </Button>
</template>

<script>
export default {
  name: 'XLink',
  props: {
    // 类型
    type: {
      type: String,
      default: null,
      validator: val => {
        return [
          'primary',
          'info',
          'warning',
          'success',
          'error',
          'subsidiary',
        ].includes(val);
      },
    },
  },
  computed: {
    classes() {
      const classes = [];
      if (this.type) {
        classes.push(`text-${this.type}`);
      }
      return classes;
    },
  },
};
</script>

<style lang="less" scoped>
.base-link {
  display: inline-block;
  vertical-align: middle;
  margin: @padding-base @padding-xs @padding-base 0;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }

  & > ::v-deep span {
    vertical-align: middle;
  }
}
</style>

<!-- 可替代 FormItem 组件，实现只读时不显示输入框 -->
<template>
  <FormItem
    v-bind="$attrs"
    :label="label"
    :prop="readonly ? null : prop"
    :rules="readonly ? [{ required: false }] : rules"
    :show-message="readonly ? false : showMessage"
    :class="readonly ? 'form-item--readonly' : ''"
  >
    <slot :readonly="readonly" />
    <slot slot="label" name="label" />
  </FormItem>
</template>

<script>
export default {
  name: 'XFormItem',
  props: {
    // 是否只读
    readonly: {
      type: Boolean,
      default: false,
    },
    // 对应表单域 model 里的字段
    prop: String,
    // 标签文本
    label: String,
    // 表单验证规则
    rules: [Object, Array],
    // 是否显示校验错误信息
    showMessage: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="less" scoped>
::v-deep .ivu-form-item-content {
  & > span:not(.ivu-switch) {
    vertical-align: middle;
    display: inline-block;
    width: 100%;
  }
}

.form-item--readonly {
  margin-bottom: 0 !important;
  transition: all @transition-time;

  ::v-deep .ivu-form-item-content {
    color: @subsidiary-color;
    vertical-align: middle;

    .ivu-form-item-content {
      min-width: unset !important;
    }
  }
}
</style>

<template>
  <span style="word-break: break-all">
    <template v-if="readonly">
      {{ inputVal || inputVal === 0 ? inputVal : emptyText }}
    </template>
    <InputNumber
      v-else
      :value="inputVal"
      v-bind="$attrs"
      :disabled="disabled"
      :placeholder="disabled ? '' : placeholder"
      v-on="$listeners"
      @on-change="onChange"
    />
  </span>
</template>

<script>
export default {
  name: 'XInputNumber',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: Number,
    },
    // 占位文本
    placeholder: {
      type: String,
      default: '请输入',
    },
    // 是否只读
    readonly: {
      type: Boolean,
      default: false,
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 空值时显示的内容
    emptyText: {
      type: String,
      default: '暂无数据',
    },
  },
  data() {
    return {
      inputVal: null,
    };
  },
  watch: {
    value: {
      handler(val) {
        this.inputVal = this.$utils.isNull(val) ? null : val;
      },
      immediate: true,
    },
  },
  methods: {
    onChange(value) {
      this.inputVal = this.$utils.isNull(value) ? null : value;
      this.$emit('change', this.inputVal);
    },
  },
};
</script>

<style scoped></style>

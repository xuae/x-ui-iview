<template>
  <span style="word-break: break-all">
    <template v-if="readonly">
      <slot name="prepend" />
      {{ inputVal || inputVal === 0 ? inputVal : emptyText }}
      <slot v-if="inputVal || inputVal === 0" name="append" />
    </template>
    <Input
      v-else
      v-bind="$attrs"
      :value="inputVal"
      :disabled="disabled"
      :placeholder="disabled ? '' : placeholder"
      :clearable="$slots.append ? false : clearable"
      v-on="$listeners"
      @on-change="onChange"
      @on-blur="onBlur"
    >
      <template slot="prepend">
        <slot name="prepend" />
      </template>
      <template slot="append">
        <slot name="append" />
      </template>
      <template slot="prefix">
        <slot name="prefix" />
      </template>
      <template slot="suffix">
        <slot name="suffix" />
      </template>
    </Input>
  </span>
</template>

<script>
export default {
  name: 'XInput',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: [String, Number],
    },
    // 占位文本
    placeholder: {
      type: String,
      default: '请输入',
    },
    // 是否显示清空按钮
    clearable: {
      type: Boolean,
      default: true,
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 是否只读
    readonly: {
      type: Boolean,
      default: false,
    },
    // 空值时显示的内容
    emptyText: {
      type: String,
      default: '暂无数据',
    },
    // 格式化值
    format: Function,
  },
  data() {
    return {
      inputVal: null,
    };
  },
  watch: {
    value: {
      handler(val) {
        this.inputVal = val;
      },
      immediate: true,
    },
  },
  methods: {
    onChange(event) {
      const value = event?.target?.value;
      this.inputVal = this.$utils.isNull(value) ? null : value;
      this.$emit('change', this.inputVal);
    },
    onBlur() {
      if (this.format && typeof this.format === 'function') {
        this.inputVal = this.format(this.inputVal);
        this.$emit('change', this.inputVal);
      }
      this.$emit('blur', this.inputVal);
    },
  },
};
</script>

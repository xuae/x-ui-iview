<template>
  <span style="word-break: break-all">
    <template v-if="readonly">
      {{ selectedName || emptyText }}
    </template>
    <CheckboxGroup
      v-else
      :value="selectedVal"
      v-bind="$attrs"
      v-on="$listeners"
      @on-change="onChange"
    >
      <Checkbox
        v-for="(item, index) in optionsData"
        :key="index"
        :label="item[fields.value]"
        :border="border"
        :disabled="disabled || item.disabled"
      >
        <slot name="prefix" :item="item" :index="index" />
        <template>{{ item[fields.label] }}</template>
        <slot name="append" :item="item" :index="index" />
      </Checkbox>
    </CheckboxGroup>
  </span>
</template>

<script>
export default {
  name: 'XCheckboxGroup',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: Array,
    },
    // 选项
    options: {
      type: Array,
      default: () => [],
    },
    // 字典组key，只传此值时，将根据值取字典值数据
    // dictGroupKey: [String, Number],
    // 替换 options 中对应的字段
    replaceFields: {
      type: Object,
      default: () => {
        return { label: 'label', value: 'value' };
      },
    },
    // 占位文本
    placeholder: {
      type: String,
      default: '请选择',
    },
    // 显示边框
    border: {
      type: Boolean,
      default: false,
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
      selectedVal: [],
      optionsData: [],
    };
  },
  computed: {
    // 字段名
    fields() {
      const def = { label: 'label', value: 'value' };
      return { ...def, ...this.replaceFields };
    },
    // 选中的值
    selected() {
      return this.optionsData.filter(item => this.selectedVal.includes(item[this.fields.value]));
    },
    selectedName() {
      return this.selected.map(item => item[this.fields.label]).join(', ');
    },
    // 值的类型，判断是字符串还是数字
    valueType() {
      const item = this.optionsData[0];
      if (item) {
        return typeof item[this.fields.value];
      }
      return null;
    },
    // 接收的值
    propValue() {
      return {
        value: this.value,
        type: this.valueType,
      };
    },
    // 接收的作为选项的值
    // propOptions() {
    //   return {
    //     options: this.options,
    //     dictGroupKey: this.dictGroupKey,
    //   };
    // },
  },
  watch: {
    // value: {
    //   handler(val) {
    //     this.selectedVal = val;
    //   },
    //   immediate: true,
    // },
    propValue: {
      handler(data) {
        if (data.type === 'string' && (data.value || data.value === 0)) {
          this.selectedVal = data.value.map(item => `${item}`);
        } else {
          this.selectedVal = data.value || [];
        }
      },
      immediate: true,
      deep: true,
    },
    options: {
      handler(val) {
        this.optionsData = this.$utils.isNull(val) ? [] : val;
      },
      deep: true,
      immediate: true,
    },
    // propOptions: {
    //   handler(val) {
    //     if (this.dictGroupKey) {
    //       this.$api.dictGroup
    //         .children(this.dictGroupKey)
    //         .then(res => {
    //           const data = res?.data || [];
    //           this.optionsData = data.filter(item => item.state == 1);
    //         })
    //         .catch(() => {});
    //     } else {
    //       this.optionsData = val.options;
    //     }
    //   },
    //   immediate: true,
    //   deep: true,
    // },
  },
  methods: {
    onChange(value) {
      this.selectedVal = this.$utils.isNull(value) ? [] : value;
      this.$emit('change', this.selectedVal);
    },
  },
};
</script>

<style scoped></style>

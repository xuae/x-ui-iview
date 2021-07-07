<template>
  <span style="word-break: break-all">
    <template v-if="readonly">
      {{ selectedName || emptyText }}
    </template>
    <Select
      v-else
      :value="selectedVal"
      v-bind="$attrs"
      :disabled="disabled"
      :placeholder="disabled ? '' : placeholder"
      :label-in-value="labelInValue"
      :clearable="clearable"
      v-on="$listeners"
      @on-change="onChange"
      @on-create="onCreate"
    >
      <template slot="prefix">
        <slot name="prefix" />
      </template>
      <template v-for="(item, index) in optionsData">
        <OptionGroup
          v-if="item[fields.children] && item[fields.children].length > 0"
          :key="index"
          :label="item.label"
        >
          <template v-for="(option, inx) in item[fields.children]">
            <Option :key="inx" :value="option[fields.value]" :label="option[fields.label]">
              <slot name="default" :item="option" :index="inx" />
            </Option>
          </template>
        </OptionGroup>
        <Option v-else :key="index" :value="item[fields.value]" :label="item[fields.label]">
          <slot name="default" :item="item" :index="index" />
        </Option>
      </template>
    </Select>
  </span>
</template>

<script>
export default {
  name: 'XSelect',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: [String, Number, Array],
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
        return { label: 'label', value: 'value', children: 'children' };
      },
    },
    // 占位文本
    placeholder: {
      type: String,
      default: '请选择',
    },
    // 在返回选项时，是否将 label 和 value 一并返回，默认只返回 value
    labelInValue: {
      type: Boolean,
      default: false,
    },
    // 是否可删除
    clearable: {
      type: Boolean,
      default: true,
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
      selectedVal: null,
      optionsData: [],
    };
  },
  computed: {
    // 字段名
    fields() {
      const def = { label: 'label', value: 'value', children: 'children' };
      return { ...def, ...this.replaceFields };
    },
    // 选中的值
    selected() {
      if (Array.isArray(this.selectedVal)) {
        return this.optionsData.filter(item => this.selectedVal.includes(item[this.fields.value]));
      }
      return this.optionsData.find(item => item[this.fields.value] === this.selectedVal);
    },
    // 选中值的标签名称
    selectedName() {
      if (this.selected) {
        if (Array.isArray(this.selected)) {
          return this.selected.map(item => item[this.fields.label]).join(', ');
        }
        return this.selected[this.fields.label];
      }
      return null;
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
          this.selectedVal = `${data.value}`;
        } else {
          this.selectedVal = data.value;
        }
      },
      immediate: true,
      deep: true,
    },
    options: {
      handler(val) {
        this.optionsData = val || [];
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
    onChange(val) {
      const value = this.labelInValue ? val?.value : val;
      this.selectedVal = value || value === 0 ? value : null;
      // if (typeof this.selectedVal === 'string') {
      //   this.selectedVal = this.selectedVal.trim();
      // }
      this.$emit('change', this.selectedVal);
    },
    onCreate(val) {
      // val = String(val);
      // val = val.trim();
      if (
        !this.optionsData.find(
          item => item[this.fields.value] === val && item[this.fields.label] === val
        )
      ) {
        this.$emit('create', val);
      }
    },
  },
};
</script>

<style scoped></style>

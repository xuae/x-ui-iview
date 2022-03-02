<!-- 自定义表单 item  -->
<template>
  <FormItem v-bind="formItemConfig">
    <!-- 单选框 -->
    <template v-if="fieldType === 'radio'">
      <RadioGroup v-model="formItemConfig.value">
        <Radio v-for="(option, index) in value.options" :key="index" :label="option.value">
          {{ option.label }}
        </Radio>
      </RadioGroup>
    </template>
    <!-- 多选框 -->
    <template v-else-if="fieldType === 'checkbox'">
      <CheckboxGroup>
        <Checkbox
          v-for="(option, index) in fieldProps.options"
          :key="index"
          :label="option.value"
        >
          {{ option.label }}
        </Checkbox>
      </CheckboxGroup>
    </template>
    <!-- 日期 -->
    <template v-else-if="fieldType === 'date'">
      <DatePicker :type="fieldProps.type || 'date'" placeholder="请选择" />
    </template>
    <!-- 输入框 -->
    <template v-else>
      <Input v-bind="fieldProps" />
    </template>
  </FormItem>
</template>

<script>
export default {
  name: 'CustomFormItem',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formItemConfig() {
      return this.value?.config;
    },
    fieldType() {
      return this.value?.component;
    },
    fieldDocumentLink() {
      return this.value?.document;
    },
    fieldProps() {
      return this.value?.props;
    },
  },
};
</script>

<style lang="less" scoped></style>

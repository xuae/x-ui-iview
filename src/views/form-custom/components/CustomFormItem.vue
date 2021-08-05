<!-- 自定义表单 item  -->
<template>
  <FormItem
    :label="item.label"
    :label-width="item.labelWidth || null"
    :required="item.required ? true : false"
  >
    <!-- 单选框 -->
    <template v-if="item.component === 'radio'">
      <RadioGroup v-model="item.value">
        <Radio v-for="(option, index) in item.options" :key="index" :label="option.value">
          {{ option.label }}
        </Radio>
      </RadioGroup>
    </template>
    <!-- 多选框 -->
    <template v-else-if="item.component === 'checkbox'">
      <CheckboxGroup>
        <Checkbox v-for="(option, index) in item.options" :key="index" :label="option.value">
          {{ option.label }}
        </Checkbox>
      </CheckboxGroup>
    </template>
    <!-- 日期 -->
    <template v-else-if="item.component === 'date'">
      <DatePicker :type="item.type || 'date'" placeholder="请选择" />
    </template>
    <!-- 输入框 -->
    <template v-else>
      <Input placeholder="请输入" />
    </template>
  </FormItem>
</template>

<script>
export default {
  name: 'CustomFormItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped></style>

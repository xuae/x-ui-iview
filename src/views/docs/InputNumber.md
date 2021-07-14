# InputNumber 数字输入框
::: warning
此组件可完全替代 iview 的 `InputNumber` 组件，支持原属性及其事件

需搭配 `Form`、`x-form-item` 组件和其表单组件组合使用才会生效
:::

## 代码演示

### 只读

`readonly`: 是否只读，默认: `false`

此状态还需要绑定在其表单组件中，才能生效

:::demo
```html
<template>
  <Form :model="formData" :rules="formRules" :label-width="100" label-colon>
    <x-form-item label="数字1" prop="num" :readonly="formData.readonly">
      <x-input-number v-model="formData.num" :readonly="formData.readonly" />
    </x-form-item>
    <x-form-item label="数字2" prop="num2" :readonly="formData.readonly">
      <x-input-number v-model="formData.num2" :readonly="formData.readonly" />
    </x-form-item>
    <x-form-item label="只读" prop="readonly">
       <i-switch v-model="formData.readonly">
          <span slot="open">是</span>
          <span slot="close">否</span>
       </i-switch>
    </x-form-item>
  </Form>
</template>
<script>
export default {
  data() {
    return {
      formData: { 
        num: null,
        num2: null,
        readonly: false,
      },
      formRules: {
        num: [{ required: true, message: '不能为空' }],
      }, 
    }
  },
}
</script>
```
:::

### 自定义空值内容

使用 `empty-text` 属性，自定义只读时的空值提示

:::demo
```html
<template>
  <Form :label-width="100">
    <x-form-item label="默认值" readonly>
      <x-input-number readonly />
    </x-form-item>
    <x-form-item label="自定义" readonly>
      <x-input-number empty-text="无" readonly />
    </x-form-item>
  </Form>
</template>
```
:::

### 支持官方的其他属性

更多示例请查看 <a href="https://www.iviewui.com/components/input-number" target="_blank">iview InputNumber</a> 官方文档

:::demo
```html
<template>
  <Form :label-width="100" label-colon>
    <x-form-item label="尺寸" >
      <x-input-number size="large" />
      <x-input-number />
      <x-input-number size="small" />
    </x-form-item>
    <x-form-item label="按钮位置" >
      <x-input-number :value="1" controls-outside />
    </x-form-item>
    <x-form-item label="不可编辑" >
      <x-input-number :value="1" :editable="false" />
    </x-form-item>
    <x-form-item label="禁用" >
      <x-input-number disabled />
    </x-form-item>
    <x-form-item label="小数" >
      <x-input-number :min="1" :max="100" :step="0.5" />
    </x-form-item>
    <x-form-item label="精准度" >
      <x-input-number :value="1" :min="1" :max="100" :precision="0" />
      <x-input-number :value="1" :min="1" :max="100" :precision="1" />
      <x-input-number :value="1" :min="1" :max="100" :precision="2" />
    </x-form-item>
    <x-form-item label="格式化" >
      <x-input-number 
        :value="1000"
        :formatter="value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
        :parser="value => value.replace(/\$\s?|(,*)/g, '')"
      />
      <x-input-number 
        :value="75"
        :min="0"
        :max="100"
        :formatter="value => `${value}%`"
        :parser="value => value.replace('%', '')"
      />
    </x-form-item>
  </Form>
</template>
<script>
export default {
  data () {
    return {
      select1: 'http',
      select2: 'com',
      select3: 'day'
    }
  }
}
</script>
```
:::

## API

### Props
| 参数 | 说明 | 类型 | 可选值 | 默认值 | 版本   |
| ---- | ---- | ---- | ------ | ------ | ------ |
| value | 绑定的值，可使用 v-model 双向绑定 | _number_ | — | — |
| readonly | 是否只读 | _boolean_ | — | `false` |
| placeholder | 占位文本 | _string_ | — | `请输入` |
| disabled | 是否禁用 | _boolean_ | — | `false` |
| empty-text | 空值时显示的内容 | _string_ | — | `暂无数据` |

### Slots
无

### Events
| 事件名称  | 说明      | 回调参数  | 版本      |
| --------- | --------- | --------- | --------- |
| change    | 值改变时的回调  | *Function(value)*   |

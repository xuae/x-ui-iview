# FormItem
::: warning
此组件可完全替代 iview 的 `FormItem` 组件，支持原属性及其事件

需搭配 `Form` 组件和其表单组件组合使用才会生效
:::

## 代码演示

### 只读

`readonly`: 是否只读，默认: `false`

此状态还需要绑定在其表单组件中，才能生效

:::demo
```html
<template>
  <Form :model="formData" :rules="formRules" :label-width="100" label-colon>
    <x-form-item label="真实姓名" prop="name" :readonly="formData.readonly">
      <x-input v-model="formData.name" :readonly="formData.readonly" />
    </x-form-item>
    <x-form-item label="联系电话" prop="phone" :readonly="formData.readonly">
      <x-input v-model="formData.phone" :readonly="formData.readonly" />
    </x-form-item>
    <x-form-item label="身份证号" prop="idCard" :readonly="formData.readonly">
      <x-input v-model="formData.idCard" :readonly="formData.readonly" />
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
        name: null,
        phone: null,
        idCard: null,
        readonly: false,
      },
      formRules: {
        name: [{ required: true, message: '不能为空' }],
        phone: [{ required: true, message: '不能为空' }],
      }, 
    }
  },
}
</script>
```
:::

### 自定义标签内容

使用插槽`label`可自定义标签文本内容

:::demo
```html
<template>
  <Form :label-width="100">
    <x-form-item>
      <template slot="label">
        <Icon type="md-person" />
        账号
      </template>
      <x-input v-model="account" />
    </x-form-item>
    <x-form-item>
      <template slot="label">
        <Icon type="md-eye" />
        密码
      </template>
      <x-input v-model="password" type="password" />
    </x-form-item>
  </Form>
</template>
<script>
export default {
  data() {
    return {
      account: null,
      password: null,
    }
  },
}
</script>
```
:::

## API

### Props
| 参数 | 说明 | 类型 | 可选值 | 默认值 | 版本   |
| ---- | ---- | ---- | ------ | ------ | ------ |
| readonly  | 是否只读 | _boolean_ | — | `false` |
| prop  | 对应表单域 model 里的字段 | _string_ | — | — |
| label  | 标签文本 | _string_ | — | — |
| rules  | 表单验证规则 | _object_ / _array_ | — | — |
| show-message  | 是否显示校验错误信息 | _boolean_ | — | `false` |

### Slots
| 插槽名称  | 说明      | 版本      |
| --------- | --------- | --------- |
| default   | 内容      |
| label     | 标签文本内容  |

# Input 输入框
::: warning
此组件可完全替代 iview 的 `Input` 组件，支持原属性及其事件

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

### 自定义空值内容

使用 `empty-text` 属性，自定义只读时的空值提示

:::demo
```html
<template>
  <Form :label-width="100">
    <x-form-item label="默认值" readonly>
      <x-input readonly />
    </x-form-item>
    <x-form-item label="自定义" readonly>
      <x-input empty-text="无" readonly />
    </x-form-item>
  </Form>
</template>
```
:::

### 格式化

利用 `format` 属性，可控制输入的值，例如：只能输入正整数

:::demo
```html
<template>
  <Form :label-width="100" label-colon inline>
    <x-form-item label="在职员工" >
      <x-input v-model="num" :format="onFormatNumber" >
        <span slot="append">人</span>
      </x-input>
    </x-form-item>
  </Form>
</template>
<script>
export default {
  data() {
    return {
      num: null,
    }
  },
  methods: {
    // 格式化数字输入
    onFormatNumber(value) {
      let num;
      if (value === '' || value === null || value === undefined || isNaN(parseInt(value))) {
        num = null;
      } else {
        num = parseInt(value) + '';
      }
      if (num < 0) {
        num = 0;
      }
      return num;
    },  
  },
}
</script>
```
:::

### 支持官方的其他属性

更多示例请查看 <a href="http://v1.iviewui.com/components/input" target="_blank">iview input</a> 官方文档

:::demo
```html
<template>
  <Form :label-width="100" label-colon>
    <x-form-item label="尺寸" >
      <x-input size="large" />
      <x-input />
      <x-input size="small" />
    </x-form-item>
    <x-form-item label="禁用" >
      <x-input disabled />
    </x-form-item>
    <x-form-item label="密码框" >
      <x-input type="password" />
      <x-input type="password" :clearable="false" password />
    </x-form-item>
    <x-form-item label="文本域" >
      <x-input type="textarea" />
      <x-input type="textarea" maxlength="200" show-word-limit />
      <x-input type="textarea" :rows="4" />
    </x-form-item>
    <x-form-item label="搜索框" >
      <x-input search />
      <x-input search enter-button />
      <x-input search enter-button="查询" />
    </x-form-item>
    <x-form-item label="复合型输入框" >
      <x-input>
        <span slot="prepend">http://</span>
        <span slot="append">.com</span>
      </x-input>
      <x-input>
        <Select v-model="select1" slot="prepend" style="width: 80px">
          <Option value="http">http://</Option>
          <Option value="https">https://</Option>
        </Select>
        <Select v-model="select2" slot="append" style="width: 70px">
          <Option value="com">.com</Option>
          <Option value="org">.org</Option>
          <Option value="io">.io</Option>
        </Select>
      </x-input>
      <x-input>
        <Select v-model="select3" slot="prepend" style="width: 80px">
          <Option value="day">Day</Option>
          <Option value="month">Month</Option>
        </Select>
        <Button slot="append" icon="ios-search"></Button>
      </x-input>
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
| value | 绑定的值，可使用 v-model 双向绑定 | _string_ / _number_ | — | — |
| readonly | 是否只读 | _boolean_ | — | `false` |
| placeholder | 占位文本 | _string_ | — | `请输入` |
| clearable | 是否显示清空按钮 | _boolean_ | — | `true` |
| disabled | 是否禁用 | _boolean_ | — | `false` |
| empty-text | 空值时显示的内容 | _string_ | — | `暂无数据` |
| format | 格式化值 | _function(value)_ | — | — |

### Slots
| 插槽名称  | 说明      | 版本      |
| --------- | --------- | --------- |
| prepend   | 前置内容，仅在 text 类型下有效  |
| append    | 后置内容，仅在 text 类型下有效  |
| prefix    | 输入框头部图标  |
| suffix    | 输入框尾部图标  |

### Events
| 事件名称  | 说明      | 回调参数  | 版本      |
| --------- | --------- | --------- | --------- |
| change    | 值改变时的回调  | *Function(value)*   |

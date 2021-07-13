# CheckboxGroup 多选框
::: warning
此组件可完全替代 iview 的 `CheckboxGroup` 组件，支持原属性及其事件

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
    <x-form-item label="水果" prop="fruit" :readonly="formData.readonly">
      <x-checkbox-group v-model="formData.fruit" :options="options" :readonly="formData.readonly" />
    </x-form-item>
    <x-form-item label="地名" prop="place" :readonly="formData.readonly">
      <x-checkbox-group v-model="formData.place" :options="options" :readonly="formData.readonly" />
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
      options: [
        { label: '香蕉', value: 1 },
        { label: '成都', value: 2 },
        { label: '地铁', value: 3 },
        { label: '电视', value: 4 },
      ],
      formData: { 
        fruit: null,
        place: null,
        multiple: null,
        readonly: false,
      },
      formRules: {
        fruit: [{ required: true, message: '不能为空' }],
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
      <x-checkbox-group readonly />
    </x-form-item>
    <x-form-item label="自定义" readonly>
      <x-checkbox-group empty-text="无" readonly />
    </x-form-item>
  </Form>
</template>
```
:::

### 替换字段

使用 `replaceFields` 属性，替换 options 中 label 和 value 的键名

:::demo
```html
<template>
  <Form :label-width="100" label-colon>
    <x-form-item label="替换字段">
      <x-checkbox-group :value="[1, 3]" :options="options" :replace-fields="replaceFields"/>
    </x-form-item>
  </Form>
</template>
<script>
export default {
  data() {
    return {
      replaceFields: { label: 'title', value: 'key' },
      options: [
        { title: '香蕉', key: 1 },
        { title: '成都', key: 2 },
        { title: '地铁', key: 3 },
        { title: '电视', key: 4 },
      ],
    }
  },
}
</script>
```
:::

### 自定义插槽

:::demo
```html
<template>
  <Form :label-width="100" label-colon>
    <x-form-item label="添加前缀">
      <x-checkbox-group :options="options">
        <template v-slot:prefix="{ item, index }">
          <span style="color:#ccc">{{ index }}</span>
        </template>
      </x-checkbox-group>
    </x-form-item>
    <x-form-item label="添加后缀">
      <x-checkbox-group :options="options">
        <template v-slot:append="{ item, index }">
          <Icon type="md-happy" size="16"/>
        </template>
      </x-checkbox-group>
    </x-form-item>
  </Form>
</template>
<script>
export default {
  data() {
    return {
      options: [
        { label: '香蕉', value: 1 },
        { label: '成都', value: 2 },
        { label: '地铁', value: 3 },
        { label: '电视', value: 4 },
      ],
    }
  },
}
</script>
```
:::

### 显示边框

:::demo
```html
<template>
  <Form :label-width="100" label-colon>
    <x-form-item label="显示边框">
      <x-checkbox-group :options="options" border />
    </x-form-item>
  </Form>
</template>
<script>
export default {
  data() {
    return {
      options: [
        { label: '香蕉', value: 1 },
        { label: '成都', value: 2 },
        { label: '地铁', value: 3 },
        { label: '电视', value: 4 },
      ],
    }
  },
}
</script>
```
:::

### 支持官方的其他属性

更多示例请查看 <a href="http://v1.iviewui.com/components/checkbox" target="_blank">iview checkbox</a> 官方文档

:::demo
```html
<template>
  <Form :label-width="100" label-colon>
    <x-form-item label="整体禁用" >
      <x-checkbox-group :options="options1" disabled />
    </x-form-item>
    <x-form-item label="单个禁用" >
      <x-checkbox-group :options="options2" />
    </x-form-item>
    <x-form-item label="尺寸" >
      <x-checkbox-group :options="options1" size="large" />
      <x-checkbox-group :options="options1" />
      <x-checkbox-group :options="options1" size="small" />
    </x-form-item>
  </Form>
</template>
<script>
export default {
  data() {
    return {
      options1: [
        { label: '香蕉', value: 1 },
        { label: '成都', value: 2 },
        { label: '地铁', value: 3 },
        { label: '电视', value: 4 },
      ],
      options2: [
        { label: '香蕉', value: 1, disabled: true },
        { label: '成都', value: 2, disabled: true },
        { label: '地铁', value: 3 },
        { label: '电视', value: 4 },
      ],
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
| value | 绑定的值，可使用 v-model 双向绑定 | _array_ | — | — |
| readonly | 是否只读 | _boolean_ | — | `false` |
| placeholder | 占位文本 | _string_ | — | `请输入` |
| clearable | 是否显示清空按钮 | _boolean_ | — | `true` |
| disabled | 是否禁用 | _boolean_ | — | `false` |
| border | 是否显示边框 | _boolean_ | — | `false` |
| empty-text | 空值时显示的内容 | _string_ | — | `暂无数据` |
| options | 选项值 | _array_ | — | — |
| replace-fields | 替换 options 中对应的字段 | _object_ | — | `{ label: 'label', value: 'value' }` |

### Slots
| 插槽名称  | 说明      | 版本      |
| --------- | --------- | --------- |
| prefix    | 自定义 Checkbox 前缀，作用域插槽，数据：{ item, index }  |
| append    | 自定义 Checkbox 后缀，作用域插槽，数据：{ item, index }  |

### Events
| 事件名称  | 说明      | 回调参数  | 版本      |
| --------- | --------- | --------- | --------- |
| change    | 值改变时的回调  | *Function(value)*   |

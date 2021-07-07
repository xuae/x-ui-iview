# Select 下拉框
::: warning
此组件可完全替代 iview 的 `Select` 组件，支持原属性及其事件

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
      <x-select v-model="formData.fruit" :options="options" :readonly="formData.readonly" />
    </x-form-item>
    <x-form-item label="地名" prop="place" :readonly="formData.readonly">
      <x-select v-model="formData.place" :options="options" :readonly="formData.readonly" />
    </x-form-item>
    <x-form-item label="多选" prop="multiple" :readonly="formData.readonly">
      <x-select v-model="formData.multiple" :options="options" multiple :readonly="formData.readonly" />
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
      <x-select readonly />
    </x-form-item>
    <x-form-item label="自定义" readonly>
      <x-select empty-text="无" readonly />
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
      <x-select :options="options" :replace-fields="replaceFields"/>
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

### 自定义模板

:::demo
```html
<template>
  <Form :label-width="100" label-colon>
    <x-form-item label="自定义模板">
      <x-select :options="options">
        <template v-slot:default="{ item, index }">
          <span>{{ item.label }}</span>
          <span style="float:right;color:#ccc">{{ index }}</span>
        </template>
      </x-select>
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

### 分组

:::demo
```html
<template>
  <Form :label-width="100" label-colon>
    <x-form-item label="分组">
      <x-select :options="options" />
    </x-form-item>
  </Form>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          label: '水果',
          children: [
            { label: '香蕉', value: 1 },
            { label: '苹果', value: 2 },
            { label: '梨', value: 3 },
          ],
        },
        {
          label: '地名',
          children: [
            { label: '成都', value: 4 },
            { label: '北京', value: 5 },
            { label: '上海', value: 6 },
          ],
        },
      ],
    }
  },
}
</script>
```
:::

### 支持官方的其他属性

更多示例请查看 <a href="http://v1.iviewui.com/components/select" target="_blank">iview select</a> 官方文档

:::demo
```html
<template>
  <Form :label-width="100" label-colon>
    <x-form-item label="尺寸" >
      <x-select :options="options" size="large" />
      <x-select :options="options" />
      <x-select :options="options" size="small" />
    </x-form-item>
    <x-form-item label="禁用" >
      <x-select disabled />
    </x-form-item>
    <x-form-item label="多选" >
      <x-select :options="options" multiple />
    </x-form-item>
    <x-form-item label="前缀图标" >
      <x-select :options="options" >
        <Avatar slot="prefix" src="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" size="small" />
      </x-select>
    </x-form-item>
    <x-form-item label="创建条目" >
      <x-select v-model="model1" :options="options" filterable allow-create @create="handleCreate" />
      <x-select v-model="model2" :options="options" multiple filterable allow-create @create="handleCreate" />
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
      model1: null,
      model2: null,
    }
  },
  methods: {
    handleCreate (val) {
      this.options.push({
        value: val,
        label: val
      });
    },
  },
}
</script>
```
:::

## API

### Props
| 参数 | 说明 | 类型 | 可选值 | 默认值 | 版本   |
| ---- | ---- | ---- | ------ | ------ | ------ |
| value | 绑定的值，可使用 v-model 双向绑定 | _string_ / _number_ / _array_ | — | — |
| readonly | 是否只读 | _boolean_ | — | `false` |
| placeholder | 占位文本 | _string_ | — | `请输入` |
| clearable | 是否显示清空按钮 | _boolean_ | — | `true` |
| disabled | 是否禁用 | _boolean_ | — | `false` |
| empty-text | 空值时显示的内容 | _string_ | — | `暂无数据` |
| options | 选项值 | _array_ | — | — |
| replace-fields | 替换 options 中对应的字段 | _object_ | — | `{ label: 'label', value: 'value', children: 'children' }` |

### Slots
| 插槽名称  | 说明      | 版本      |
| --------- | --------- | --------- |
| default   | 自定义选项内容，作用域插槽，数据：{ item, index }  |
| prefix    | 自定义 Select 内头部图标  |

### Events
| 事件名称  | 说明      | 回调参数  | 版本      |
| --------- | --------- | --------- | --------- |
| change    | 值改变时的回调  | *Function(value)*   |

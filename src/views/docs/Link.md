# Link 链接
根据 Button 按钮二次封装

## 代码演示

### 类型

使用`type`属性来定义按钮的颜色样式，默认无背景，黑色字。
- `primary`: 主要按钮
- `subsidiary`: 次要按钮
- `success`: 成功按钮，绿色字
- `warning`: 警告按钮，黄色字
- `info`: 信息按钮，蓝色字
- `error`: 危险按钮，红色字

:::demo
```html
<template>
  <div>
    <x-link>默认链接</x-link>
    <x-link type="primary">主要链接</x-link>
    <x-link type="info">详细链接</x-link>
    <x-link type="warning">警告链接</x-link>
    <x-link type="success">成功链接</x-link>
    <x-link type="error">失败链接</x-link>
    <x-link type="subsidiary">次要链接</x-link>
  </div>
</template>
```
:::

## API

### Props
| 参数 | 说明 | 类型 | 可选值 | 默认值 | 版本   |
| ---- | ---- | ---- | ------ | ------ | ------ |
| type  | 类型 | _string_ | primary / subsidiary / info /  success /warning / error | — |

### Slots
| 插槽名称  | 说明      | 版本      |
| --------- | --------- | --------- |
| default   | 按钮内容  |

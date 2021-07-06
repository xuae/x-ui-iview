# 返回顶部
返回顶部操作按钮。

## 代码演示

### 监听滚动元素
:::warning

页面中最先显示出来的返回顶部按钮才是此演示的代码

:::

:::demo
```html
<template>
  <x-back-top :target="target" :height="10" :bottom="80" :right="80" :duration="500" />
</template>
<script>
export default {
  data() {
    return {
      target: null,
    }
  },
  mounted() {
    this.target = () => document.querySelector('.layout__content');
  },
}
</script>
```
:::

## API

### Props
| 参数 | 说明 | 类型 | 可选值 | 默认值 | 版本   |
| ---- | ---- | ---- | ------ | ------ | ------ |
| target  | 设置需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数	 | _function_ | — | `() => window` |
| height  | 页面滚动高度达到该值时才显示 BackTop 组件 | _number_ | — | `400` |
| bottom  | 组件距离底部的距离 | _number_ | — | `30` |
| right  | 组件距离右部的距离	 | _number_ | — | `30` |
| duration  | 滚动动画持续时间，单位：毫秒 | _number_ | — | `1000` |

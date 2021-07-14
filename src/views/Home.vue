<template>
  <div class="home">
    <h1>
      组件基于
      <a href="https://www.iviewui.com/" target="_blank">iview(包名:view-design)</a>
      二次封装
    </h1>
    <h3>封装的组件都支持 iview 原生属性和方法，具体的请查看官网</h3>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>
<style lang="less" scoped>
.home {
  padding: @padding-md;
  background: @white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>

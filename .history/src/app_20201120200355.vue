<template>
  <section class="app">
    <card-switch></card-switch>
  </section>
</template>
<script>
export default {
  name: "App",
  components:{
    cardSwitch:()=>import('./src/views/cardswitch/index.vue')
  }
};
</script>
<style lang="scss">
html,
body {
  height: 100%;
  display: block;
  box-sizing: border-box;
  overflow: hidden;
}
div,
section {
  display: block;
  box-sizing: border-box;
  /* 高德地图引入，声明hidden会隐藏高德默认ui */
  /* overflow: :hidden; */
}
.app {
  height: 100%;
  overflow: hidden;
}
</style>

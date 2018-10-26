<template>
  <div>
    <xheader></xheader>
    <router-view></router-view>
    <xfooter></xfooter>
  </div>

</template>

<script>
import xfooter from "./components/Xfooter.vue";
import xheader from "./components/Xheader.vue";
export default {
  components: {
    xfooter,
    xheader
  }
};
</script>

<style>
</style>

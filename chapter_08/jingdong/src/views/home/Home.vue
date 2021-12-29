<template>
  <div class="wrapper">
    <StaticPart />
    <Nearby />
  </div>
  <Docker current-item="首页"/>
</template>

<script>
import StaticPart from './StaticPart'
import Nearby from './Nearby'
import Docker from "../../components/Docker";
export default {
  name: 'Home',
  components: { StaticPart, Nearby, Docker }
}
</script>

<style lang="scss" scoped>
.wrapper {
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  padding: 0 .18rem .1rem .18rem;
}
</style>

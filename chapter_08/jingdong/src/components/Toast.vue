<template>
  <div class="toast">{{msg}}</div>
</template>

<script>

import {reactive} from "vue";

export const useToastEffective = () => {
  const toastData = reactive({
    show: false,
    msg: ""
  })
  const showToastMsg = (msg) => {
    toastData.show = true
    toastData.msg = msg
    setTimeout(() => {
      toastData.show = false
      toastData.msg = ""
    }, 2000)
  }
  return {toastData, showToastMsg}
}

export default {
  name: "Toast",
  props: ["msg"]
}
</script>

<style lang="scss" scoped>

.toast {
  z-index: 2;
  position:  fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: .15rem;
  background: rgba(100, 0, 100, .35);
  border-radius: .05rem;
  color: red;
  font-size: .16rem;
}

</style>

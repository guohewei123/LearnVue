<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>{{useName}}</h1>
  </div>
</template>

<script>
import {toRefs} from "vue";
import {useStore} from 'vuex'
export default {
  // 方法 一： 通过 data 展示 store 中的数据
  data(){
    return {
      myName: this.$store.state.name
    }
  },
  name: 'Home',
  // 方法二：通过 computed 计算属性展示 store 中的数据
  /*computed: {
    myName() {
      return this.$store.state.name
    }
  }*/

  // 方法三： 通过 composition api 展示 store 中的数据
  setup() {
    const store = useStore()
    // const useName = store.state.name // 直接获取 name
    const {name} = toRefs(store.state)  // 通过 toRefs 获取 name
    return {
      useName: name
    }
  }



}
</script>

<template>
  <div class="about">
    <button @click="handleClick">修改名称</button>
    <h1>{{useName}}</h1>
  </div>
</template>


<script>
import {useStore} from "vuex";
import {toRefs} from "vue";

export default {
  name: 'About',
  /*computed: {
    myName() {
      return this.$store.state.name
    }
  },
  methods: {
    handleClick() {
      // this.$store.dispatch("change", "赫赫")  // 可以提供异步安全的方式修改 store 中的内容
      this.$store.commit("change", "郭郭")        // 如果只是同步操作的话，可以执行通过 执行 commit 方法 调用 "第四步" 进行修改 store 中的内容
    }
  }*/

  // 方法三： 通过 composition api 展示 store 中的数据
  setup() {
    const store = useStore()
    // const useName = store.state.name // 直接获取 name
    const {name} = toRefs(store.state)  // 通过 toRefs 获取 name
    const handleClick = () => {
      // store.dispatch("changeName", "赫赫1")  // 可以提供异步安全的方式修改 store 中的内容
      // store.commit("changeName", "郭郭1")        // 如果只是同步操作的话，可以执行通过 执行 commit 方法 调用 "第四步" 进行修改 store 中的内容
      store.dispatch("getDate", "https://192.168.10.46:10443/api/v2/getImageCaptcha?bg=f7f7f7")
    }
    return {
      useName: name,
      handleClick
    }
  }
}
</script>
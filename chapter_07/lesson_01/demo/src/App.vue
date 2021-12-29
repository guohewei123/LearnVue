<template>
  <div>
    <input v-model="inputVal"/>
    <button class="button" @click="addItemHandle">增加</button>
  </div>
  <ul>
    <display-item v-for="(item, index) in list" :key="index" :msg="item"></display-item>
  </ul>

</template>

<script>
import {reactive} from "vue";
import {ref} from "vue";
import DisplayItem from "./components/displayItem";

export default {
  name: 'App',
  components: {
    DisplayItem
  },
  setup(){
    const list = reactive([])
    const inputVal = ref("")
    const addItemHandle = () => {
      list.push(inputVal.value)
    }
    return{
      list,
      inputVal,
      addItemHandle
    }
  }
}
</script>

<style>
.button {
  color: red;
  margin-left: 20px;
}
</style>

import { createStore } from 'vuex'
import axios from "axios"

export default createStore({
  state: {
    name: "hehe",
  },
  mutations: {
    change (state, name) {
      state.name = name
    },
    changeName (state, name) {
      state.name = name
    }
  },
  actions: {
    change (store, name) {
      setInterval(() => {
        store.commit("change", name)
      },2000)
    },
    changeName (store, name) {
      setInterval(() => {
        store.commit("changeName", name)
      },2000)
    },
    // 使用 axios 请求数据，并修改 name
    getDate(store, url) {
      axios.get(url).then(
          (response) => {
            const msg = response.data.code
            store.commit("changeName", msg)
          }
      )
    }
  },
  modules: {
  }
})

import {createStore} from 'vuex'

const setLocalCartList = (state) => {
  const {cartList} = state
  localStorage.cartList = JSON.stringify(cartList)
}

const getLocalCartList = () => {
  return JSON.parse(localStorage.cartList || "{}")
}

export default createStore({
  state: {
    // cartList
    // {
    //    shopId: {
    //      shopName: "xxx",
    //      products: {
    //        productId: {
    //        }
    //     }
    //  }
    cartList: getLocalCartList()
  },
  mutations: {
    modifyCartList(state, payload) {
      const {shopId, productInfo, num} = payload
      const shopInfo = state.cartList[shopId] || {products: {}, shopName: ""}
      let product = shopInfo.products[productInfo.id]
      if (!product) {
        product = productInfo
        product.count = 0
      }
      if (num > 0) {
        product.checked = true
      }
      product.count += num
      if (product.count < 0) {
        product.count = 0
      }
      shopInfo.products[productInfo.id] = product
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },

    modifyCartProductChecked(state, payload) {
      const {shopId, productId} = payload
      const shopInfo = state.cartList[shopId] || {products: {}, shopName: ""}
      const product = shopInfo.products[productId]
      if (product) {
        product.checked = !product.checked
        // shopInfo.products[productId] = product
        // state.cartList[shopId] = shopInfo
      }
      setLocalCartList(state)
    },

    changeShopName(state, payload) {
      const {shopId, shopName} = payload
      const shopInfo = state.cartList[shopId] || {products: {}, shopName: ""}
      shopInfo.shopName = shopName
      setLocalCartList(state)
    }

  },
  actions: {},
  modules: {}
})

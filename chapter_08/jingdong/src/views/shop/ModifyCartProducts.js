// 添加商品到购物车
import {useStore} from "vuex";
import {toRefs} from "vue";

export const useCartAddProductEffect = (shopId) => {
  const store = useStore()
  const {cartList} = toRefs(store.state)
  const handleModifyCartProduct = (productInfo, num) => {
    store.commit("modifyCartList", {shopId, productInfo, num})
  }
  return {cartList, handleModifyCartProduct}
}

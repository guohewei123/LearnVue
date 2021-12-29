// 购物车处理逻辑
import {computed} from "vue";

export const useCartEffect = (cartList, shopId) => {
  // 计算购物车商品总数，总价格，全选状态
  const cartProducts = computed(() => {
    const cartShopProducts = cartList[shopId]?.products
    const cartInfo = {totalNum: 0, totalPrice: 0, allChecked: true}
    if (cartShopProducts) {
      for (const i in cartShopProducts) {
        cartInfo.totalNum += cartShopProducts[i].count
        if (cartShopProducts[i].checked) {
          cartInfo.totalPrice += cartShopProducts[i].count * cartShopProducts[i].price
        } else {
          cartInfo.allChecked = false
        }
      }
    }
    cartInfo.totalPrice = cartInfo.totalPrice.toFixed(2)
    return cartInfo
  })

  // 全选按钮逻辑
  const handleCheckedAll = () => {
    const cartShopProducts = cartList[shopId]?.products
    const currentAllChecked = cartProducts.value.allChecked
    if (cartShopProducts) {
      for (const i in cartShopProducts) {
        if (cartShopProducts[i].checked === currentAllChecked) {
          cartShopProducts[i].checked = !currentAllChecked
        }
      }
    }
  }

  // 获取购物车信息
  const cartProductList = computed(() => {
    const storeProducts = cartList[shopId].products || []
    const products = []
    // console.log("--------------", storeProducts)
    for (const key in storeProducts) {
      if (storeProducts[key].count > 0) {
        products.push(storeProducts[key])
      }
    }
    return products
  })

  return {
    cartProducts, cartProductList, handleCheckedAll
  }
}

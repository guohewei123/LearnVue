<template>
  <div class="wrapper">
    <ReceiverAddress/>
    <CartShopProducts :shop-name="shopName" :products="cartProductList"/>
  </div>
  <BottomTotal
    :total-price="cartProducts.totalPrice"
    :shop-name="shopName"
    :products="cartProductList"
    :shop-id="shopId"/>
</template>

<script>
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {useCartEffect} from "../../common/common";

import ReceiverAddress from "./ReceiverAddress";
import CartShopProducts from "../../components/CartShopProducts";
import BottomTotal from "./BottomTotal";

export default {
  name: "OrderConfirm",
  components: {ReceiverAddress, CartShopProducts, BottomTotal},
  setup() {
    const route = useRoute()
    const store = useStore()
    const shopId = route.params.id
    const cartList = store.state.cartList
    const {
      cartProducts,
      cartProductList
    } = useCartEffect(cartList, shopId)
    const shopName = cartList[shopId]?.shopName
    return {cartProducts, cartProductList, shopName, shopId}
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";

.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0.49rem;
  background: #F8F8F8;
  overflow-y: scroll;
}

</style>

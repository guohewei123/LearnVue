<template>
  <div class="wrapper">
    <template
      v-for="(item, key) in cartList"
      :key="key"
    >
      <CartShopProducts :shop-name="item.shopName" :products="item.products" />
    </template>
  </div>
</template>

<script>
import {useStore} from "vuex";
import CartShopProducts from "../../components/CartShopProducts";

export default {
  name: "CartItem",
  components: {CartShopProducts},
  setup() {
    const store = useStore()
    const cartList = store.state.cartList
    const item1 = 123
    return {cartList, item1}
  }
}
</script>

<style lang="scss" scoped>

</style>

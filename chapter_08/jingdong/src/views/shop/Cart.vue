<template>
  <div
    class="mask"
    v-if="showCart && cartProducts.totalNum > 0"
    @click="showCartList"
  ></div>
  <div class="cart">
    <div class="product" v-if="showCart && cartProducts.totalNum > 0">
      <div class="product__header">
        <div class="product__header__all">
          <div
            class="product__header__all__icon iconfont"
            v-html="cartProducts.allChecked ? '&#xe652;': '&#xe7ae;'"
            @click="handleCheckedAll"
          />
          <span class="product__header__all__text">全选</span>
        </div>
        <div class="product__header__clear">
          <span
            @click="clearCartProducts(shopId)"
            class="product__header__clear__btn"
          >
            清空购物车
          </span>
        </div>
      </div>
      <template
        v-for="item in cartProductList"
        :key="item.id"
      >
        <div class="product__item">
          <div
            class="product__item__checked iconfont"
            v-html="item.checked ? '&#xe652;': '&#xe7ae;'"
            @click="handleProductChecked(shopId, item.id)"
          />
          <img
            :src="item.img"
            class="product__item__img"
          >
          <div class="product__item__text">
            <div class="product__item__text__title">{{ item.name }}</div>
            <div class="product__item__text__price">
              <span class="product__item__text__yen">&yen;</span>
              <span class="product__item__text__current">{{ item.price }}</span>
              <span class="product__item__text__original">&yen;{{ item.oldPrice }}</span>
            </div>
          </div>

          <div class="product__number">
          <span
            class="product__number__minus iconfont"
            @click="handleModifyCartProduct(item, -1)"
          >&#xe677;</span>
            {{ item.count || 0 }}
            <span
              class="product__number__plus iconfont"
              @click="handleModifyCartProduct(item, 1)"
            >&#xe65a;</span>
          </div>
        </div>
      </template>
    </div>

    <div class="check">
      <div class="check__icon">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          class="check__icon__img"
          @click="showCartList"
        >
        <div class="check__icon__tag">{{ cartProducts.totalNum }}</div>
      </div>
      <div class="check__info">
        总计: <span class="check__info__price">&yen; {{ cartProducts.totalPrice }}</span>
      </div>
      <div
        class="check__goto"
        v-show="cartProducts.totalNum > 0"
      >
        <router-link
          :to="{ path: `/orderConfirm/${shopId}`}"
          class="check__goto__btn"
        >
          去结算
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {useCartAddProductEffect} from "./ModifyCartProducts";
import {useCartEffect} from "../../common/common"

// 处理 购物车 商品选中逻辑
const useHandleProductCheckedEffect = () => {
  const handleProductChecked = (shopId, productId) => {
    const store = useStore()
    store.commit("modifyCartProductChecked", {shopId, productId})
  }
  return {handleProductChecked}
}

// 清理购物车
const useClearCartProductsEffect = (cartList, showCart) => {
  const clearCartProducts = (shopId) => {
    cartList[shopId].products = {}
    showCart.value = false
  }
  return {clearCartProducts}
}

// 展示隐藏购物车
const toggleShowCartEffect = (cartProducts) => {
  const showCart = ref(false)
  const showCartList = () => {
    if (cartProducts.value.totalNum > 0) {
      showCart.value = !showCart.value
    }
  }
  return {showCartList, showCart}
}

export default {
  name: "Cart",
  setup() {
    const route = useRoute()
    const store = useStore()
    const shopId = route.params.id
    const cartList = store.state.cartList
    const {
      cartProducts,
      cartProductList,
      handleCheckedAll
    } = useCartEffect(cartList, shopId)
    const handleProductChecked = useHandleProductCheckedEffect()
    const {handleModifyCartProduct} = useCartAddProductEffect(shopId)  // 增加、减少 商品
    const {showCart, showCartList} = toggleShowCartEffect(cartProducts)
    const {clearCartProducts} = useClearCartProductsEffect(cartList, showCart)
    return {
      cartProducts, cartProductList, handleModifyCartProduct,
      handleProductChecked, shopId, showCart, showCartList,
      clearCartProducts, handleCheckedAll
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

.mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.50);
}

.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: $bgColor;
}

.product {
  flex: 1;
  overflow-y: scroll;
  background: $bgColor;

  &__header {
    display: flex;
    height: .52rem;
    border-bottom: .01rem solid $content-bgColor;

    &__all {
      display: flex;
      width: .74rem;
      line-height: .52rem;

      &__icon {
        font-size: .2rem;
        margin: auto .08rem auto .18rem;
        color: $btn-bgColor;
      }

      &__text {
        display: block;
        font-size: .14rem;
        color: $content-fontcolor;
        text-align: center;
        margin: auto;
      }
    }

    &__clear {
      flex: 1;
      text-align: right;
      font-size: .14rem;
      color: $content-fontcolor;
      line-height: .52rem;
      margin-right: .18rem;

      &__btn {
        display: inline-block;
      }
    }
  }

  &__item {
    position: relative;
    display: flex;
    margin: .12rem .18rem .12rem 0;
    padding-bottom: .12rem;
    border-bottom: .01rem solid $content-bgColor;

    &__checked {
      line-height: .5rem;
      font-size: .2rem;
      color: $btn-bgColor;
      text-align: center;
      margin: auto .16rem auto .18rem;
    }

    &__img {
      height: .46rem;
      width: .46rem;
    }

    &__text {
      margin-left: .16rem;
      overflow: hidden;

      &__title {
        line-height: .2rem;
        font-size: .14rem;
        color: $content-fontcolor;
        margin-bottom: .06rem;
        @include ellipsis;
      }

      &__sales {
        font-size: .12rem;
        line-height: .16rem;
        margin-bottom: .06rem;
      }

      &__price {
        line-height: .2rem;
      }

      &__yen {
        font-size: .12rem;
        color: $highlight-bgColor;
        line-height: .14rem;
      }

      &__current {
        font-size: .14rem;
        color: $highlight-bgColor;
        padding-right: .06rem;
      }

      &__original {
        line-height: .2rem;
        font-size: .12rem;
        color: $light-fontcolor;
        text-decoration: line-through;
      }
    }

    .product__number {
      position: absolute;
      right: 0;
      bottom: .12rem;
      font-size: .14rem;
      line-height: .18rem;

      &__minus, &__plus {
        display: inline-block;
        position: relative;
        top: .02rem;
        font-size: .22rem;
      }

      &__minus {
        color: $medium-fontcolor;
        margin-right: .08rem;
      }

      &__plus {
        margin-left: .08rem;
        color: $btn-bgColor;
      }
    }
  }
}

.check {
  display: flex;
  line-height: .49rem;
  border-top: .01rem solid $content-bgColor;
  height: .49rem;

  &__icon {
    position: relative;
    width: .84rem;

    &__img {
      display: inline-block;
      font-size: .14rem;
      height: .26rem;
      width: .28rem;
      padding: .12rem .24rem
    }

    &__tag {
      position: absolute;
      height: .2rem;
      min-width: .2rem;
      background: $highlight-bgColor;
      border-radius: .1rem;
      line-height: .2rem;
      font-size: .16rem;
      color: $bgColor;
      text-align: center;
      left: .46rem;
      top: .02rem;
      padding: 0 .02rem;
      transform: scale(.5);
      transform-origin: left center;
    }
  }

  &__info {
    flex: 1;
    font-size: .12rem;
    color: $content-fontcolor;

    &__price {
      display: inline-block;
      margin-left: .06rem;
      font-size: .18rem;
      color: $highlight-bgColor;
    }
  }

  &__goto {
    &__btn {
      display: inline-block;
      width: .98rem;
      background: #4FB0F9;
      bottom: 0;
      right: 0;
      font-size: .14rem;
      text-align: center;
      line-height: .49rem;
    }

    a {
      color: $bgColor;
      text-decoration: none;
    }
  }
}

</style>

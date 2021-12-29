<template>
  <div class="content">
    <div class="category">
      <div
        :class="{'category__item': true, 'category__item--active': item.tab === currentTab}"
        v-for="item in categorys"
        :key="item.tab"
        @click="handleClickTab(item.tab)"
      >{{ item.name }}
      </div>
    </div>
    <div class="product">
      <div
        class="product__item"
        v-for="item in productsList"
        :key="item.id"
      >
        <img
          :src="item.img"
          class="product__item__img"
        >
        <div class="product__item__text">
          <div class="product__item__text__title">{{ item.name }}</div>
          <div class="product__item__text__sales">月售 {{ item.sales }} 件</div>
          <div class="product__item__text__price">
            <span class="product__item__text__yen">&yen;</span>
            <span class="product__item__text__current">{{ item.price }}</span>
            <span class="product__item__text__original">&yen;{{ item.oldPrice }}</span>
          </div>
        </div>

        <div class="product__number">
          <span
            class="product__number__minus iconfont"
            @click="modifyCartProduct(item, -1, shopName)"
          >&#xe677;</span>
          {{ cartList?.[shopId]?.products?.[item.id]?.count || 0 }}
          <span
            class="product__number__plus iconfont"
            @click="modifyCartProduct(item, 1, shopName)"
          >&#xe65a;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive, ref, toRefs, watchEffect} from "vue";
import {useRoute} from "vue-router";
import {get} from "../../utils/request";
import {useCartAddProductEffect} from "./ModifyCartProducts";
import {useStore} from "vuex";

const categorys = [
  {name: "全部商品", tab: "all"},
  {name: "秒杀", tab: "seckill"},
  {name: "休闲食品", tab: "fruit"}
]

// tab 处理逻辑
const useClickTabEffect = () => {
  const currentTab = ref(categorys[0].tab)
  const handleClickTab = (tab) => {
    currentTab.value = tab
  }
  return {currentTab, handleClickTab}
}

// 获取商品
const useGetProductEffect = (currentTab, shopId) => {
  const data = reactive({productsList: []})
  const getProductList = async () => {
    const res = await get("/getProducts", {shopID: shopId, tab: currentTab.value})
    if (res?.data?.code === "0000" && res.data?.data.length > 0) {
      data.productsList = res.data.data
    }
  }
  watchEffect(() => getProductList())
  const {productsList} = toRefs(data)
  return {productsList}
}

// 添加商品逻辑
const useCartProductEffect = (shopId) => {
  const store = useStore()
  const {cartList, handleModifyCartProduct} = useCartAddProductEffect(shopId)
  const modifyCartProduct = (productInfo, num, shopName) => {
    handleModifyCartProduct(productInfo, num)
    store.commit("changeShopName", {shopId, shopName})
  }
  const getCartProductCount = (shopId, productId) => {
    return cartList?.[shopId]?.products?.[productId]?.count || 0
  }
  return {cartList, modifyCartProduct, getCartProductCount}
}

export default {
  name: "Content",
  props: ["shopName"],
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const {currentTab, handleClickTab} = useClickTabEffect()
    const {productsList} = useGetProductEffect(currentTab, shopId)
    const {cartList, modifyCartProduct, getCartProductCount} = useCartProductEffect(shopId)
    return {
      productsList, handleClickTab, currentTab, categorys,
      cartList, modifyCartProduct, shopId, getCartProductCount
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

.content {
  display: flex;
  position: absolute;
  top: 1.5rem;
  bottom: .5rem;
  left: 0;
  width: 100%;
}

.category {
  width: .76rem;
  overflow-y: scroll;
  color: $content-fontcolor;
  background: $search-bgColor;

  &__item {
    line-height: .4rem;
    text-align: center;
    font-size: .14rem;

    &--active {
      background: $bgColor;
    }
  }
}

.product {
  flex: 1;
  overflow-y: scroll;
  margin-left: .16rem;

  &__item {
    position: relative;
    display: flex;
    margin: .12rem .18rem .12rem 0;
    padding-bottom: .12rem;
    border-bottom: .01rem solid $content-bgColor;

    &__img {
      height: .68rem;
      width: .68rem;
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

      &__minus &__plus {
        display: inline-block;
        position: relative;
        top: .02rem;
        font-size: .22rem;
      }

      &__minus {
        margin-right: .08rem;
        color: $medium-fontcolor;
      }

      &__plus {
        margin-left: .08rem;
        color: $btn-bgColor;
      }
    }
  }
}

</style>

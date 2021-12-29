<template>
  <div class="wrapper">
    <div class="top">
      <div
        class="top__back iconfont"
        @click="handleBack"
      >&#xe679;
      </div>
      <div class="top__search">
        <span class="top__search__icon iconfont">&#xe65c;</span>
        <input
          class="top__search__input"
          placeholder="请输入商品名称搜索"
        />
      </div>
    </div>
    <ShopInfo :item="item" :hide-border="true" v-show="item.img"/>
    <Content :shop-name="item.title" />
    <Cart />
  </div>
</template>

<script>
import {reactive, toRefs} from "vue";
import {useRoute, useRouter} from "vue-router";
import ShopInfo from "../../components/ShopInfo";
import Content from "./Content";
import Cart from "./Cart";
import {get} from "../../utils/request";

// 路由返回
export const useHandelBackEffect = () => {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  return handleBack
}

// 获取商店信息
const useShopInfoEffect = () => {
  const shopData = reactive({item: {}})
  const route = useRoute()
  const getItemData = async () => {
    const ret = await get("/getShopDetail", {shopID: route.params.id})
    if (ret?.data?.code === "0000" && ret?.data?.data) {
      shopData.item = ret.data.data
      console.log(ret.data.data)
    }
  }
  const {item} = toRefs(shopData)
  return {item, getItemData}
}

export default {
  name: "Shop",
  components: {Cart, Content, ShopInfo},
  setup() {
    const {item, getItemData} = useShopInfoEffect()
    getItemData()
    const handleBack = useHandelBackEffect()
    return {item, handleBack}
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";

.wrapper {
  padding: 0 .18rem;
}

.top {
  display: flex;
  margin: .16rem 0 .16rem 0;
  line-height: .32rem;

  &__back {
    width: .3rem;
    font-size: .25rem;
    color: #B6B6B6;
  }

  &__search {
    display: flex;
    flex: 1;
    background: $search-bgColor;
    border-radius: .16rem;

    &__icon {
      display: block;
      line-height: .32rem;
      font-size: .16rem;
      margin: 0 .12rem 0 .16rem;
      color: $search-fontColor;
    }

    &__input {
      display: block;
      width: 100%;
      font-size: .14rem;
      border-radius: .16rem;
      background: none;
      border: none;
      outline: none;
      margin: 0 .2rem 0 0;
      color: $content-fontcolor;

      &::placeholder {
        font-size: .14rem;
        color: $content-fontcolor;
      }
    }
  }
}
</style>

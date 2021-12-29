<template>

  <div class="top">
    <div
      class="top__back iconfont"
      @click="handleBack"
    >&#xe679;
    </div>
    <div class="top__title">
      我的购物车
    </div>
  </div>
  <div class="cart">
    <CartItem/>
  </div>
  <Docker current-item="购物车"/>
</template>

<script>
import Docker from "../../components/Docker";
import CartItem from "./CartItem";
import {useRouter} from "vue-router";

export const useHandelBackEffect = () => {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  return {handleBack}
}

export default {
  name: "CartList",
  components: {Docker, CartItem},
  setup() {
    const {handleBack} = useHandelBackEffect()
    return {handleBack}
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";

.top {
  display: flex;
  top: 0;
  height: .44rem;
  font-size: .16rem;
  color: $content-fontcolor;
  line-height: .44rem;
  text-align: center;
  background: $bgColor;

  &__back {
    position: absolute;
    left: .16rem;
    font-size: .2rem;
  }

  &__title {
    flex: 1;
  }
}

.cart {
  position: absolute;
  top: .44rem;
  bottom: .49rem;
  width: 100%;
  background: $search-bgColor;
  overflow-y: scroll;
}
</style>

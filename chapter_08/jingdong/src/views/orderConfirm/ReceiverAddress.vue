<template>
  <div class="top">
    <div class="top__header">
      <div
        class="top__header__back iconfont"
        @click="handleBack"
      >&#xe679;
      </div>
      确认订单
    </div>
    <div class="top__receiver">
      <div class="top__receiver__title">收货地址</div>
      <div class="top__receiver__address">北京理工大学国防科技园2号楼10层</div>
      <div class="top__receiver__info">
        <span class="top__receiver__info__data">瑶妹（先生）</span>
        <span class="top__receiver__info__data">18911024266</span>
      </div>
      <div class="top__receiver__icon iconfont">&#xe679;</div>
    </div>
  </div>
</template>

<script>
import {useRouter} from "vue-router";

// 路由返回
export const useHandelBackEffect = () => {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  return {handleBack}
}

export default {
  name: "ReceiverAddress",
  setup() {
    const {handleBack} = useHandelBackEffect()
    return {handleBack}
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";

.top {
  position: relative;
  height: 1.74rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0.00) 4%, #0091FF 50%);
  background-repeat: no-repeat;

  &__header {
    padding-top: .25rem;
    line-height: .24rem;
    color: $bgColor;
    text-align: center;
    font-size: .16rem;

    &__back {
      position: absolute;
      font-size: .22rem;
      left: .19rem;
    }
  }

  &__receiver {
    position: absolute;
    top: .6rem;
    left: .18rem;
    right: .18rem;
    height: 1.11rem;
    background: $bgColor;
    border-radius: .04rem;
    color: $content-fontcolor;

    &__title {
      padding-top: .16rem;
      padding-left: .16rem;
      padding-bottom: .14rem;
      line-height: .22rem;
      font-size: .16rem;
    }

    &__address {
      line-height: .2rem;
      padding-left: .16rem;
      font-size: .14rem;
      padding-bottom: .06rem;
    }

    &__info {
      font-size: .12rem;
      color: $medium-fontcolor;
      padding-left: .16rem;

      &__data {
        display: inline-block;
        padding-right: .06rem;
        line-height: .18rem;
      }
    }

    &__icon {
      transform: rotate(180deg);
      color: $medium-fontcolor;
      position: absolute;
      top: .46rem;
      right: .2rem;
      font-size: .2rem;
    }
  }
}

</style>

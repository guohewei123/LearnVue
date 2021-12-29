<template>
  <div class="wrapper">
    <div class="top"> 我的订单</div>
    <div class="orders">
      <div class="orders__item">
        <div class="orders__item__top">
          <h4 class="orders__item__title">沃尔玛</h4>
          <div class="orders__item__status">已取消</div>
        </div>
        <div class="orders__item__info">
          <div class="orders__item__images">
            <img src="http://www.dell-lee.com/imgs/vue3/tomato.png" class="orders__item__img">
            <img src="http://www.dell-lee.com/imgs/vue3/tomato.png" class="orders__item__img">
            <img src="http://www.dell-lee.com/imgs/vue3/tomato.png" class="orders__item__img">
            <img src="http://www.dell-lee.com/imgs/vue3/tomato.png" class="orders__item__img">
          </div>
          <div class="orders__item__total">
            <div class="orders__item__total__price">
              &yen;66.69444444
            </div>
            <div class="orders__item__total__count">共6件</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker current-item="订单"/>
</template>

<script>
import Docker from "../../components/Docker";

export default {
  name: "OrderList",
  components: {Docker}
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";

.wrapper {
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0.49rem;
}

.top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: .5rem;
  background: $bgColor;
  font-size: .16rem;
  color: $content-fontcolor;
  line-height: .5rem;
  text-align: center;
}

.orders {
  position: absolute;
  top: .5rem;
  left: 0;
  right: 0;
  bottom: 0;
  background: #F8F8F8;
  padding: .16rem .18rem;

  &__item {
    background: $bgColor;
    border-radius: .04rem;

    &__top {
      display: flex;
    }

    &__title {
      flex: 1;
      font-size: .16rem;
      color: $content-fontcolor;
      padding: .16rem;
      margin: 0;
    }

    &__status {
      font-size: .14rem;
      color: $light-fontcolor;
      text-align: right;
      padding: .16rem .16rem .16rem 0;
    }

    &__info {
      display: flex;
    }

    &__images {
      flex: 1;
      padding-left: .16rem;
      padding-bottom: .16rem;
    }

    &__img {
      width: .4rem;
      height: .4rem;
      padding-right: .12rem;
    }

    &__total {
      padding-right: .16rem;

      &__price {
        font-size: .14rem;
        color: $highlight-bgColor;
        text-align: right;
        padding-bottom: .04rem;
      }

      &__count {
        font-size: .12rem;
        color: $content-fontcolor;
        text-align: right;
        line-height: .14rem;
      }
    }
  }

}

</style>

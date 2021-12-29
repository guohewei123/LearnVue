<template>
  <div class="shop">
    <img
      class="shop__img"
      :src="item.img"
    >
    <div
      class="shop__content"
      :class="{'shop__content': true, 'shop__content--bordered': !hideBorder}"
    >
      <div class="shop__content__title">{{ item.title }}</div>
      <div class="shop__content__tags">
        <span class="shop__content__tag">月售: {{ item.sales }}</span>
        <span class="shop__content__tag">起送: {{ item.send_fees }}</span>
        <span class="shop__content__tag">库存: {{ item.stock }}</span>
      </div>
      <p class="shop__content__highlight">{{ item.slogan }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopInfo",
  props: ["item", "hideBorder"]
}
</script>

<style lang="scss" scoped>
@import "../style/viriables.scss";

.shop {
  margin-top: .12rem;
  display: flex;

  &__img {
    margin-right: .16rem;
    width: .56rem;
    height: .56rem;
  }

  &__content {
    padding: 0 .16rem .12rem 0;
    flex: 1;

    &--bordered {
      border-bottom: .01rem solid $content-bgColor;
    }

    &__title {
      font-size: .16rem;
      line-height: .22rem;
      color: $content-fontcolor;
    }

    &__tags {
      margin-top: .08rem;
      line-height: .18rem;
      font-size: .13rem;
      color: $content-fontcolor;
    }

    &__tag {
      margin-right: .16rem;
    }

    &__highlight {
      margin: .08rem 0 0 0;
      line-height: .18rem;
      font-size: .13rem;
      color: $highlight-bgColor;
    }
  }
}
</style>

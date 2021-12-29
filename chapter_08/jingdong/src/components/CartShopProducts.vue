<template>
  <div class="shop">
    <div class="shop__title">{{ shopName }}</div>
    <div class="product">
      <div
        class="product__item"
        v-for="product in products"
        :key="product.id"
      >
        <img
          :src="product.img"
          class="product__item__img"
        >
        <div class="product__item__text">
          <h4 class="product__item__title">{{ product.name }}</h4>
          <div class="product__item__price">
            <span class="product__item__single">
               <span class="product__item__single__yen">&yen;</span>
                {{ product.price }} x {{ product.count }}
            </span>
            <span class="product__item__total">
              <span class="product__item__total__yen">&yen;</span>
              {{ (product.price * product.count).toFixed(2) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartShopProducts",
  props: ["shopName", "products"]
}
</script>

<style lang="scss" scoped>
@import "../style/viriables.scss";

.shop {
  position: relative;
  margin: .16rem .18rem;
  background: $bgColor;
  border-radius: .04rem;

  &__title {
    padding: .16rem 0 .16rem .16rem;
    line-height: .22rem;
    font-size: .16rem;
    color: $content-fontcolor;
  }
}

.product {
  position: relative;
  padding: 0 .16rem 0 .16rem;

  &__item {
    display: flex;
    padding-bottom: .16rem;

    &__img {
      height: .46rem;
      width: .46rem;
      padding-right: .16rem;
    }

    &__text {
      flex: 1;
    }

    &__title {
      font-size: .14rem;
      color: $content-fontcolor;
      line-height: .2rem;
      margin: 0 0 .06rem 0;
    }

    &__price {
      font-size: .14rem;
      color: $highlight-bgColor;
      line-height: .2rem;
    }

    &__single {
      &__yen {
        line-height: .12rem;
        font-size: .12rem;
      }
    }

    &__total {
      display: inline-block;
      position: absolute;
      font-size: .14rem;
      color: #000;
      text-align: right;
      line-height: .14rem;
      right: .16rem;

      &__yen {
        line-height: .12rem;
        display: inline-block;
        font-size: .12rem;
      }
    }
  }
}
</style>

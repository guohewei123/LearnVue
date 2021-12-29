<template>
  <div class="docker">
    <span
      v-for="(item, index) in itemList"
      :key="index"
      :class="{'docker__item': true, 'docker__item--active': currentItem===item.text }">
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.icon"></div>
       <div class="docker__title">{{ item.text }}</div>
      </router-link>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Docker',
  props: ["currentItem"],
  setup() {
    const itemList = [
      {icon: "&#xe630;", text: "首页", to: {name: 'Home'}},
      {icon: "&#xe6bc;", text: "购物车", to: {name: 'CartList'}},
      {icon: "&#xe7b3;", text: "订单", to: {name: 'OrderList'}},
      {icon: "&#xe7d5;", text: "我的", to: {name: 'Home'}},
    ]
    return {itemList}
  }
}
</script>

<style lang="scss" scoped>
@import "../style/viriables.scss";

.docker {
  display: flex;
  box-sizing: border-box;
  position: absolute;
  padding: 0 0.18rem;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  border-top: .01rem solid $content-bgColor;
  a {
    text-decoration: none;
    color: $content-fontcolor;
  }

  &__item {
    flex: 1;
    text-align: center;

    .iconfont {
      margin: .07rem 0 .02rem 0;
      font-size: 0.18rem;
    }

    &--active {
      a {
        color: blue;
      }
    }
  }

  &__title {
    font-size: .2rem;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}

</style>

<template>
  <div class="position">
    <span class="iconfont position_icon">&#xe7f1;</span>
    <span class="position__text">北京理工大学国防科技园2号楼10层 北京理工大学国防科技园2号楼10层</span>
    <span class="iconfont position_notice">&#xe60d;</span>
  </div>
  <div class="search">
    <span class="iconfont">&#xe65c;</span>
    <span class="search__text">山姆会员商店优惠商品</span>
  </div>
  <div class="banner">
    <img
      class="banner__image"
      src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
    />
  </div>
  <div class="icons">
    <div
      class="icons__item"
      v-for="(item, index) in iconsList"
      :key="index">
      <img
        class="icons__item__img"
        :src="item.img"/>
      <p class="icons__item__desc">{{ item.text }}</p>
    </div>
  </div>
  <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup() {
    const iconsList = [
      {img: "http://www.dell-lee.com/imgs/vue3/超市.png", text: "超市便利"},
      {img: "http://www.dell-lee.com/imgs/vue3/菜市场.png", text: "菜市场"},
      {img: "http://www.dell-lee.com/imgs/vue3/水果店.png", text: "水果店"},
      {img: "http://www.dell-lee.com/imgs/vue3/鲜花.png", text: "鲜花绿植"},
      {img: "http://www.dell-lee.com/imgs/vue3/医药健康.png", text: "医药健康"},
      {img: "http://www.dell-lee.com/imgs/vue3/家居.png", text: "家居时尚"},
      {img: "http://www.dell-lee.com/imgs/vue3/蛋糕.png", text: "烘焙蛋糕"},
      {img: "http://www.dell-lee.com/imgs/vue3/签到.png", text: "签到"},
      {img: "http://www.dell-lee.com/imgs/vue3/大牌免运.png", text: "大牌免运"},
      {img: "http://www.dell-lee.com/imgs/vue3/红包.png", text: "红包套餐"},
    ]
    return {iconsList}
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

.position {
  position: relative;
  padding: .16rem .24rem .16rem 0;
  font-size: .16rem;
  line-height: .22rem;
  color: $content-fontcolor;
  @include ellipsis;

  .position_icon {
    position: relative;
    font-size: .2rem;
    top: .01rem;
  }

  .position_notice {
    position: absolute;
    font-size: .2rem;
    right: 0;
    top: .17rem;
  }
}

.search {
  margin-bottom: .12rem;
  line-height: .32rem;
  font-size: .14rem;
  color: $search-fontColor;
  background: $search-bgColor;
  border-radius: .16rem;

  .iconfont {
    position: relative;
    top: .01rem;
    display: inline-block;
    font-size: .16rem;
    padding: 0 .12rem 0 .16rem;
  }

  &.__text {
    display: inline-block;
    font-size: .16rem;
  }
}

.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;

  &__image {
    width: 100%;
  }
}

.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: .16rem;

  &__item {
    width: 20%;

    &__img {
      display: block;
      width: .4rem;
      height: .4rem;
      margin: 0 auto;
    }

    &__desc {
      margin: .06rem 0 .16rem 0;
      text-align: center;
      color: $content-fontcolor;

    }
  }
}

.gap {
  margin: 0 -.18rem;
  height: .1rem;
  background: $content-bgColor;
}
</style>

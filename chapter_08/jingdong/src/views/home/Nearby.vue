<template>
  <div class="nearby">
    <h1 class="nearby__title">附近店铺</h1>
    <router-link
      v-for="item in nearbyList"
      :key="item.id"
      :to="`/shop/${item.id}`"
    >
      <ShopInfo :item="item"/>
    </router-link>

  </div>
  <Toast v-if="toastData.show" :msg="toastData.msg"/>
</template>

<script>
import {ref} from "vue";
import {get} from "../../utils/request";
import Toast, {useToastEffective} from "../../components/Toast";
import ShopInfo from "../../components/ShopInfo";

// 获取附近店铺
const useNearbyEffect = (showToastMsg) => {
  const nearbyList = ref([])
  const getNearbyShopListHandle = async () => {
    try {
      const res = await get("/hotShops")
      console.log(res)
      if (res?.data?.code === "0000" && res?.data?.data.length > 0) {
        nearbyList.value = res.data.data
      }
    } catch (e) {
      showToastMsg("请求失败")
    }
  }
  return {nearbyList, getNearbyShopListHandle}
}

export default {
  name: "Nearby",
  components: {ShopInfo, Toast},
  setup() {
    const {toastData, showToastMsg} = useToastEffective()
    const {nearbyList, getNearbyShopListHandle} = useNearbyEffect(showToastMsg)
    getNearbyShopListHandle()
    return {nearbyList, toastData}
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";

.nearby {
  &__title {
    font-weight: normal;
    font-size: .18rem;
    color: $content-fontcolor;
    margin: .16rem 0 .02rem 0;
  }
}

a {
  text-decoration: none;
}
</style>

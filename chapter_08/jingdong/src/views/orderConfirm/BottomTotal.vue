<template>
  <div class="bottom">
    <div class="bottom__left">
      <span class="bottom__left__text">实付金额 </span>
      <span class="bottom__left__total">
          <span class="bottom__left__total__yen">&yen;</span>{{ totalPrice }}
      </span>
    </div>
    <div
      class="bottom__right"
      @click="handleSubmitOrder(true)"
    >
      提交订单
    </div>
  </div>
  <div
    class="confirm"
    v-if="showConfirmOrderDialogs"
    @click="handleSubmitOrder(false)"
  >
    <div
      class="confirm__area"
      @click.stop
    >
      <h4 class="confirm__area__title">确认要离开收银台？</h4>
      <div class="confirm__area__msg">请尽快完成支付，否则将被取消</div>
      <div class="confirm__area__btns">
        <div
          class="confirm__area__btn confirm__area__btn--cancel"
          @click="handleConfirmOrder(true)"
        >取消订单
        </div>
        <div
          class="confirm__area__btn confirm__area__btn--pay"
          @click="handleConfirmOrder(false)"
        >确认支付
        </div>
      </div>
    </div>
  </div>
  <Toast v-if="toastData.show" :msg="toastData.msg"/>
</template>

<script>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {post} from "../../utils/request";
import Toast, {useToastEffective} from "../../components/Toast";

// 取消订单 确认支付 按钮功能
const useConfirmOrderEffect = (props, showToastMsg) => {
  const router = useRouter()
  const handleConfirmOrder = async (status) => {
    try {
      console.log(props.products)
      const payloadProducts = []
      for (const key in props.products) {
        const product = props.products[key]
        payloadProducts.push({id: product.id, mun: product.count})
      }
      const result = await post("/createOrder", {
        addressId: "1111",
        totalPrice: props.totalPrice,
        shopId: props.shopId,
        shopName: props.shopName,
        isCanceled: status,
        products: payloadProducts,
      })
      console.log(result)
      if (result?.data?.code === "0000") {
        await router.push({name: "OrderList"});  // 指定跳转到首页
      } else {
        showToastMsg("创建订单失败")
      }
    } catch (e) {
      showToastMsg("请求失败")
    }
  }
  return {handleConfirmOrder}
}

// 提交订单 按钮处理逻辑
const useSubmitOrderEffect = () => {
  const showConfirmOrderDialogs = ref(false)
  const handleSubmitOrder = (status) => {
    showConfirmOrderDialogs.value = status
  }
  return {showConfirmOrderDialogs, handleSubmitOrder}
}

export default {
  name: "BottomTotal",
  props: ["totalPrice", "shopId", "shopName", "products"],
  components: {Toast},
  setup(props) {
    const {showConfirmOrderDialogs, handleSubmitOrder} = useSubmitOrderEffect()
    const {toastData, showToastMsg} = useToastEffective()
    const {handleConfirmOrder} = useConfirmOrderEffect(props, showToastMsg)
    return {handleSubmitOrder, showConfirmOrderDialogs, handleConfirmOrder, toastData}
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";

.bottom {
  display: flex;
  position: absolute;
  bottom: 0;
  height: .49rem;
  width: 100%;
  background: $bgColor;

  &__left {
    flex: 1;
    font-size: .14rem;
    color: $content-fontcolor;
    line-height: .49rem;
    padding-left: .24rem;
    text-align: left;

    &__total {
      font-size: .16rem;
      color: #151515;
    }
  }

  &__right {
    width: .98rem;
    line-height: .49rem;
    text-align: center;
    background: #4FB0F9;
    font-size: .14rem;
    color: $bgColor;
  }
}

.confirm {
  z-index: 1;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.50);

  &__area {
    position: absolute;
    width: 3rem;
    height: 1.58rem;
    background: $bgColor;
    border-radius: .04rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    &__title {
      font-size: .18rem;
      color: $content-fontcolor;
      padding-top: .24rem;
      padding-bottom: .08rem;
      line-height: .26rem;
      text-align: center;
      margin: 0;
    }

    &__msg {
      font-size: .14rem;
      color: $medium-fontcolor;
      text-align: center;
    }

    &__btns {
      display: flex;
      margin: .24rem .58rem;
    }

    &__btn {
      width: .8rem;
      height: .32rem;
      border-radius: .16rem;
      border: .01rem solid $btn-bgColor;
      font-size: .14rem;
      color: $btn-bgColor;
      line-height: .32rem;
      text-align: center;

      &--cancel {
        margin-right: .12rem;
      }

      &--pay {
        margin-left: .12rem;
        background: $btn-bgColor;
        color: $bgColor;
      }
    }
  }
}

</style>

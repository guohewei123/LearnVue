<template>
  <div class="wrapper">
    <img
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      class="wrapper__img"
    >
    <div class="wrapper__input">
      <input
        class="wrapper__input_content"
        placeholder="请输入手机号"
        v-model="registerData.account"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input_content"
        placeholder="请输入密码"
        type="password"
        v-model="registerData.password"
        autocomplete="new-password"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input_content"
        placeholder="确认密码"
        type="password"
        v-model="registerData.confirmPassword"
      />
    </div>
    <div class="wrapper__register-button" @click="handleRegister">
      注册
    </div>
    <div class="wrapper__login-link" @click="handleGotoLogin">已有账号去登录</div>
  </div>
  <Toast :msg="toastData.msg" v-if="toastData.show"/>
</template>

<script>
import {reactive} from "vue";
import {useRouter} from "vue-router"
import {post} from "../../utils/request";
import Toast, {useToastEffective} from "../../components/Toast";

// 注册函数
const useRegisterEffective = (showToastMsg) => {
  const router = useRouter();
  const registerData = reactive({account: "", password: "", confirmPassword: ""})
  const handleRegister = async () => {
    try {
      const result = await post("/register", {
        account: registerData.account,
        password: registerData.password,
        confirm_password: registerData.confirmPassword
      })
      if (result?.data?.code === "0000") {
        await router.push({name: "Login"})
      } else {
        showToastMsg("注册失败")
      }
    } catch (e) {
      showToastMsg("请求失败")
    }
  }
  return {registerData, handleRegister}
}

// 跳转登录
const useGotoLoginEffective = () => {
  const router = useRouter();
  const handleGotoLogin = () => {
    router.push({name: "Login"})
  }
  return {handleGotoLogin}
}

export default {
  name: "Register",
  components: {Toast},
  setup() {
    const {toastData, showToastMsg} = useToastEffective()
    const {registerData, handleRegister} = useRegisterEffective(showToastMsg)
    const {handleGotoLogin} = useGotoLoginEffective()
    return {handleRegister, handleGotoLogin, registerData, toastData}
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";

.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);

  &__img {
    display: block;
    margin: 0 auto .4rem auto;
    width: .66rem;
    height: .66rem;
    text-align: center;
  }

  &__input {
    background: #F9F9F9;
    border: .01rem solid rgba(0, 0, 0, 0.10);
    border-radius: .06rem;
    line-height: .48rem;
    margin: 0 .4rem .16rem .4rem;
  }

  &__input_content {
    background: none;
    border-radius: .06rem;
    line-height: .48rem;
    border: none;
    outline: none;
    width: 100%;
    font-size: .16rem;
    color: $content-notice-fontcolor;
    padding-left: .16rem;

    &::placeholder {
      color: $content-notice-fontcolor;
    }
  }

  &__register-button {
    background: $btn-bgColor;
    box-shadow: 0 .04rem .08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: .04rem;
    line-height: .48rem;
    margin: .32rem .4rem .16rem .4rem;
    font-size: .16rem;
    text-align: center;
    color: $bgColor;
  }

  &__login-link {
    font-size: .14rem;
    color: $content-notice-fontcolor;
    text-align: center;
  }
}
</style>

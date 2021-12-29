<template>
  <div class="wrapper">
    <img
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      class="wrapper__img"
    >
    <div class="wrapper__input">
      <input
        class="wrapper__input_content"
        placeholder="请输入账号"
        v-model="loginData.account"/>
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input_content"
        placeholder="请输入密码"
        type="password"
        v-model="loginData.password"
        autocomplete="new-password"
      />
    </div>
    <div class="wrapper__login-button" @click="handleLogin">
      登录
    </div>
    <div class="wrapper__register-link" @click="handleGotoRegister">立即注册</div>
  </div>
  <Toast :msg="toastData.msg" v-if="toastData.show"/>
</template>

<script>
import {useRouter} from 'vue-router'
import {reactive} from "vue"
import {post} from "../../utils/request";
import Toast, {useToastEffective} from "../../components/Toast";

// 登录功能
const useLoginEffective = (showToastMsg) => {
  const router = useRouter();   // 获取 router
  const loginData = reactive({
    account: "",
    password: ""
  })
  const handleLogin = async () => {
    try {
      const result = await post("/login", {
        account: loginData.account,
        password: loginData.password
      })
      console.log(result)
      if (result?.data?.code === "0000") {
        localStorage.isLogin = true;
        await router.push({name: "Home"});  // 指定跳转到首页
      } else {
        showToastMsg("用户名或密码错误")
      }
    } catch (e) {
      showToastMsg("请求失败")
    }
  };
  return {loginData, handleLogin}
}

// 跳转注册
const useGotoRegisterEffective = () => {
  const router = useRouter();   // 获取 router
  const handleGotoRegister = () => {
    router.push({name: "Register"});  // 指定跳转到注册页面
  }
  return {handleGotoRegister}
}

export default {
  name: "Login",
  components: {Toast},
  setup() {
    // 实现点击登录按钮后自动跳转到首页
    const {toastData, showToastMsg} = useToastEffective()
    const {loginData, handleLogin} = useLoginEffective(showToastMsg)
    const {handleGotoRegister} = useGotoRegisterEffective()
    return {handleLogin, handleGotoRegister, loginData, toastData}
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";

.wrapper {
  position: absolute;
  top: 45%;
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

  &__login-button {
    background: $btn-bgColor;
    box-shadow: 0 .04rem .08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: .04rem;
    line-height: .48rem;
    margin: .32rem .4rem .16rem .4rem;
    font-size: .16rem;
    text-align: center;
    color: $bgColor;
  }

  &__register-link {
    font-size: .14rem;
    color: $content-notice-fontcolor;
    text-align: center;
  }
}

</style>

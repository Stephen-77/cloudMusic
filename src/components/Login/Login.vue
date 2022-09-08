<template>
  <div class="login_center">
    <div class="center">
      <h3>{{ currentList[currentIndex] }}登录</h3>
        <i class="el-icon-close close" @click="close"></i>
      <ul>
        <li v-for="(item, index) in currentList" :key="index" @click="changeType(index)" :class="index==currentIndex?'actived':''">
          <a>       
            {{ item }}
          </a>
        </li>
      </ul>
      <component :is="currentComponent" ref="doLogin"/>
      <div class="footer" v-show="currentIndex != 2">
        <el-button type="info"  @click="submit">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import LoginByPhone from "@/components/Login/LoginByPhone.vue";
import LoginByQr from "@/components/Login/LoginByQr.vue";
import LoginByMessage from "@/components/Login/LoginByMessage.vue";
import router from '@/router';
export default {
  name: "Login",
  components: { LoginByMessage, LoginByQr, LoginByPhone },
  data() {
    return {
      currentIndex: 0,
      currentList: ["手机号", "验证码", "二维码"],
      Components: ["LoginByPhone","LoginByMessage", "LoginByQr"],
    };
  },
  computed: {
    currentComponent() {
      return this.Components[this.currentIndex];
    },
  },
  methods: {
    changeType(index) {
      this.currentIndex = index;
    },
    submit() {
        this.$refs.doLogin.submit()
    },
    close(){
        this.$router.back()
    }
  },
};
</script>

<style lang="less" scoped>
.login_center {
  height: 468px;
  background: url('../../assets/images/d35d513c848ae5bf906bcbc585cdd819.jpeg');
  position: relative;
  .center {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%);
    width: 400px;
    height: 300px;
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    // opacity: .4;
    .close{
        position: absolute;
        cursor: pointer;
        top: 10px;
        right: 10px;
        font-size: 20px;
    }
    h3 {
      height: 50px;
      line-height: 50px;
    }
    ul{
        display: flex;
        align-items: center;
        li{
            margin: 0 5px;
            font-size: 14px;
        }
        .actived{
            font-size: 15px;
            font-weight: 700;
            color: rgb(162, 196, 235);

        }
    }
    .login{
        display: flex;
        align-items: center;
        height: 180px;
    }
    
  }
}
</style>
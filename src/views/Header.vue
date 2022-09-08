<template>
  <div class="header">
    <div class="left">
      <h1 class="logo">OK音乐</h1>
    </div>
    <div class="center">
      <div class="goback">
        <i class="el-icon-arrow-left lr" @click="back_btn"></i>
        <i class="el-icon-arrow-right lr" @click="next_btn"></i>
      </div>
      <div class="ipt">
        <i class="el-icon-search" style="color: #ffffff"></i>
        <input type="text" placeholder="搜索" @keyup.enter="goSearch" v-model="keywords"/>
      </div>
    </div>
    <div class="right">
      <img
        v-lazy="userinfo.avatarUrl"
        alt=""
        @click="goUserCenter"
        v-if="userinfo != ''"
      />
      <img
        v-else
        @click="goLogin"
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.teasoo.com%2Fpublic%2FWap%2Fimages%2Favatar.jpg&refer=http%3A%2F%2Fwww.teasoo.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659231887&t=2d36e545c3a7de3a9190fe928eb48b3d"
        alt=""
      />
      <p v-if="userinfo == ''">未登录</p>
      <el-popconfirm
        confirm-button-text="好的"
        cancel-button-text="不用了"
        icon="el-icon-info"
        icon-color="red"
        title="确定退出吗？"
        @confirm="exit"
        v-else
      >
        <p slot="reference">{{ userinfo.nickname }}</p>
      </el-popconfirm>
      <!-- <p v-else @click="gologin">{{ userinfo.nickname }}</p> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "Header",
  data() {
    return {
      userinfo: "",
      formLabelWidth: "150px",
      keywords:'',
    };
  },
  computed: {
    // ...mapState('login',['userinfo'])
  },
  methods: {
    back_btn() {
      this.$router.back(-1);
    },
    next_btn() {
      this.$router.forward(+1);
    },
    getuserinfo() {
      this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
      if (this.userinfo == null) {
        this.userinfo = "";
      }
    },
    open() {
      this.$prompt("请输入邮箱", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern:
          /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: "邮箱格式不正确",
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你的邮箱是: " + value,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    goLogin(){
      this.$router.push({name:'login'})
    },
    async exit() {
      localStorage.removeItem("token");
      localStorage.removeItem("userinfo");
      const res=await this.$API.reqLogout()
      if(res.code==200){
        this.$router.push({name:'home'})
        this.$notify.success({
          message:'退出成功'
        })
        this.$store.commit('collectsong/setCollectSongList',[''])
      }
      this.getuserinfo();
    },
    goUserCenter() {
      this.$router.push({
        name: "usercenter",
      });
    },
    goSearch(){
      
      this.$router.push({
        name:'search',
        query:{keywords:this.keywords}
      })
      // this.$bus.$emit('keyword',this.keywords)
    },
    async getMessage(){
      let time=5
      console.log(this.$refs.message.disabled);
      const res=await this.$API.reqGetMessage(this.form.phone)
      if(res.code==200){
        this.$message.success({message:'验证码已发送！请注意查收'})
        const timer= setInterval(() => {
          this.$refs.message.disabled=true

          if(time==0){
            clearInterval(timer)
            this.$refs.message.innerHTML='获取验证码'
            this.$refs.message.disabled=false
          }
          else{
            this.$refs.message.innerHTML=time+'s'
            time--
            this.$refs.message.disabled=true
          }
        }, 1000);
      }
      else{
        this.$message.error({message:'请求失败!'})
      }
     
    }
  },
  watch: {
    // userinfo(newv, oldv) {
    //    this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
    // },
  },
  mounted() {
    this.getuserinfo();
    this.$bus.$on('updateAvatar',()=>{
      this.getuserinfo()
    })
    // this.submit();
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  //   justify-content: flex-end;
  height: 60px;
  width: 100%;
  background-color: #c4c0c0;
  line-height: 60px;
  .left {
    margin: 0 10px;
    width: 180px;
    height: 60px;
    display: inline-block;
    text-align: center;
    line-height: 60px;
    position: relative;
    .logo {
      font-size: 20px;
      &::after {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 180px;
        height: 60px;
        // background: url("../assets/images/logo.png") no-repeat;
        background-size: 180px 60px;
      }
    }
  }
  .center {
    display: flex;
    align-items: center;
    margin: 0 10px;
    // width: 200px;
    height: 60px;
    line-height: 60px;
    // background-color: #e13e3e;
    .goback {
      display: flex;
      width: 60px;
      margin-right: 10px;
      i{
        cursor: pointer;
      }
    }
    .lr {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 26px;
      height: 26px;
      border-radius: 13px;
      background-color: #978d8d;
      color: #ffffff;
    }
    .ipt {
      display: flex;
      position: relative;
      padding: 0 25px;
      align-items: center;
      width: 200px;
      height: 40px;
      border-radius: 15px;
      background-color: #989494;

      .el-icon-search {
        position: absolute;
        top: 50%;
        left: 5px;
        transform: translateY(-50%);
      }
      input {
        outline: none;
        border: 0;
        margin: 0;
        width: 100%;
        height: 30px;
        background-color: #989494;
        color: #ffffff;
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    margin: 0 5px;
    img {
      display: block;
      cursor: pointer;
      border-radius: 50%;
      width: 30px;
      height: 30px;
    }
    p {
      margin-left: 10px;
      color: #ffffff;
      font-size: 14px;
      cursor: pointer;
    }
  }
  .yanzhengma{
    display: flex;
    justify-content: flex-end;
    a{
      margin-right: 20%;
      height: 30px;
      font-size: 12px;
      display: flex;
      align-items: center;

    }
  }
  .btn_message{
    cursor: pointer;
    margin-left: 10px;
    width: 90px;
    height: 32px;
    border: 0;
    outline: 0;
    border-radius: 2px;
    background-color: rgb(242, 238, 238);
  }
  /deep/.el-dialog__body {
    text-align: initial;
    padding: 25px 25px 0px !important;
  }
}
</style>
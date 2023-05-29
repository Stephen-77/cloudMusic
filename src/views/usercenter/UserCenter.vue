<template>
 <div class="UserDetail" v-loading="loading" element-loading-text="拼了命加载ing..." element-loading-spinner="el-icon-loading">
    <div class="UserDetail-header">
      <img v-lazy="userInfo.profile?userInfo.profile.avatarUrl:''" alt="" />
      <div class="UserDetail-jianjie">
        <h2>{{ userInfo.profile?userInfo.profile.nickname:'' }}</h2>
        <p class="level">
          <span>Lv{{ userInfo.level }}</span>
          <el-button type="info" icon="el-icon-edit" @click="goEditUser" round size="small">编辑个人信息</el-button>
        </p>
        <el-divider></el-divider>
        <p>
          注册时间:<span>{{ userInfo.createTime | getCreateTime }}</span>
        </p>
        <p>
          累计听歌:<span>{{ userInfo.listenSongs}}首</span>
        </p>
        <p>
          个人介绍:<span>{{ userInfo.profile?userInfo.profile.signature:'' }}</span>
        </p>
      </div>
    </div>
    <div class="UserDetail-menu">
      <ul class="menulist">
        <li class="menu" v-for="(item, index) in menulist" :key="index">
          <a
            @click="go(item)"
            :class="[$route.name == item.name ? 'active' : '']"
            >{{ item.menuname }}</a
          >
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name:'UserCenter',
  data() {
    return {
      avatarUrl: '',
      menulist: [
        {
          menuname: "自己的歌单",
          name: "personalsongsheet",
          path: "/usercenter/personalsongsheet",
        },
        {
          menuname: "收藏的歌单",
          name: "collectsongsheet",
          path: "/usercenter/collectsongsheet",
        },
      ],
      loading:false
    }
  },
  computed:{
    ...mapState('userinfo',['userInfo'])
  },
  methods: {
     go(item) {
      this.$router.push({
        name: item.name,
      });
    },
    // async getUserDetail(userId){
    //    const res =await this.$API.reqUserInfo(userId)
    //    if(res.code==200){
    //       this.jianjie=res
    //       console.log(res);
    //    }
    // },
    goEditUser(){
      this.$router.push({
        name:'edituser'
      })
    } 
  },
  mounted() {
    const Userinfo=JSON.parse(localStorage.getItem('userinfo'))
    this.$store.dispatch('userinfo/getUserDetail',Userinfo.userId)
    // this.$nextTick(()=>{
    //   this.avatarUrl=this.userInfo.profile.avatarUrl
    // })
  },
  created() {
   
  },
}
</script>

<style lang="less" scoped>
.UserDetail {
  padding: 25px 0 0px 0px;
  .UserDetail-header {
    padding: 0 0 20px 0;
    display: flex;
    img {
      width: 180px;
      height: 180px;
      border-radius: 50%;
      margin: 0;
    }
    .UserDetail-jianjie {
      margin: 0 0 0 20px;
      display: flex;
      width: 820px;
      flex-direction: column;
      align-items: flex-start;
      align-content: flex-start;
      text-align: left;
      p {
        // display: inline-block;
        display: flex;
        align-items: center;
        margin: 8px 0;
        font-size: 14px;

        span {
          // margin-top: 20px;
          color: #606266;
          padding: 0 5px;
        }
      }
      .level{
        width: 100%;
        justify-content: space-between;
        font-size: 12px;
        color: #606266;
        span{
          margin: 0;
          border-radius: 5px;
          text-align: center;
          background-color: rgb(146, 198, 241);
        }
        .el-button{
          // flex:1;
          margin: 0 2px 0 0;
        }
      }
      .el-divider--horizontal {
          background-color: #d8d9da;
          // display: block;
          // height: 1px;
          // width: 100%;
          margin: 3px 0;
        }
      h2 {
        margin: 0;
      }
    }
  }
  .UserDetail-menu {
    height: 40px;
    .menulist {
      display: flex;
      .menu {
        height: 35px;
        width: 90px;
        margin: 0 0px 0 0;
        text-align: center;
        line-height: 35px;
        // padding: 5px 10px;
        font-size: 14px;
        color: #606266;
        // &:nth-child(1) {
        //   width: 50px;
        // }
        .active {
          font-size: 18px;
          font-weight: 700;
          position: relative;
          color: black;
          &::after {
            content: "";
            position: absolute;
            bottom: -5px;
            left: 50%;
            height: 5px;
            transform: translateX(-50%);
            width: 80%;
            background-color: rgb(137, 135, 135);
            border-radius: 3px;
          }
        }
      }
    }
  }
}
</style>
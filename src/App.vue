<template>
  <div>
    <Header></Header>
    <!-- <div class="box"> -->
    <!-- <Aside></Aside> -->
    <!-- <Center></Center> -->
    <!-- </div> -->
    <transition
      :enter-active-class="enteractive"
      :leave-active-class="leaveactive"
    >
      <router-view></router-view>
    </transition>
    <Bottom></Bottom>
  </div>
</template>

<script>
import Aside from "@/views/Aside.vue";
import Bottom from "@/views/Bottom.vue";
import Center from "@/views/Center.vue";
import Header from "@/views/Header.vue";
export default {
  components: { Aside, Bottom, Header, Center },
  name: "App",
  data() {
    return {
      transitionName: "",
      enteractive: "",
      leaveactive: "",
    };
  },
  watch: {
    $route: {
      deep: true,
      handler(to, from) {
        let level = this.$route.meta.level;
        // console.log(level);
        if (level == 1) {
          this.enteractive = "animate__animated animate__fadeInUp";
          // this.leaveactive="animate__animated animate__fadeOutDown"
        }
      },
    },
  },
};
</script>


<style lang="less" >
body {
  // height: 100%;
  padding-bottom: 80px !important;
}
.el-popup-parent--hidden {
  .v-modal {
    z-index: 0 !important;
  }
}
// .el-container {
//   height: 100vh !important;
// }
a {
  cursor: pointer;
}
li {
  list-style: none;
}
//滚动条的宽度
::-webkit-scrollbar {
  width: 10px;
  // height: 10px;
}
//滚动条的滑块
::-webkit-scrollbar-thumb {
  background-color: #cecece;
  border-radius: 3px;
}
.el-notification {
  // justify-content: flex-start;
  // display: flex;
  align-items: center !important;
}
.el-notification__icon {
  margin: 0 !important;
}
.el-message__icon {
  margin: 0 10px 0 0;
}
.el-loading-spinner {
  top: 16%;
  i {
    color: black;
  }
  .el-loading-text {
    color: black;
  }
}
.el-dialog__wrapper {
  z-index: 999 !important;
}
</style>
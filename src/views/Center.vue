<template>
  <div class="center">
    <!-- <div class="center">center</div> -->
    <el-container>
      <el-aside width="200px">
        <Aside></Aside>
      </el-aside>
      <el-main class="elmain">
        <!--    根据绑定的名字不同，使的跳转页面时动画效果不同-->
        <router-view :key="key"></router-view>
      </el-main>
      <el-backtop target=".el-main" bottom="100">
        <div style="color: red">UP</div>
      </el-backtop>
    </el-container>
  </div>
</template>

<script>
import Aside from "./Aside.vue";
// import Main from './Main.vue';
export default {
  components: { Aside },
  name: "Center",
  data() {
    return {};
  },
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + new Date()
        : this.$route + new Date();
    },
  },
  methods: {},
  mounted() {
    this.$nextTick(() => {
      // if (this.$route.name == "singer") {
        console.log(this.$route);
        document.querySelector(".elmain").addEventListener(
          "scroll",
          (event) => {
            if (this.$route.name == "singer") {
              //变量scrollTop是滚动条滚动时，距离顶部的距离
              //  console.log(event.target.scrollTop);
                var scrollTop = event.target.scrollTop;
                  //变量windowHeight是可视区的高度
                var clientHeight = event.target.clientHeight;
                //变量scrollHeight是滚动条的总高度
                var scrollHeight = event.target.scrollHeight;
                if(scrollHeight-scrollTop-clientHeight<60){
                  this.$bus.$emit('loading','')
                }
              // console.log(scrollTop);
              // console.log(1);
            }
          },
          true
        );
        // console.log(this.$refs.scrollHandler);
      // }
    });
  },
};
</script>
<style lang="less" scoped>
.center {
  //   margin: auto 1px;
  //   height:100%;
  // background-color: antiquewhite;
}
/deep/.el-container {
  // height: 468.008px !important;
  height: calc(100vh - 140px);
}
.el-aside {
  background-color: #d3dce6;
}
.el-main {
  padding: 0 20px;
  height: 100%;
  background-color: #e9eef3;
}
</style>
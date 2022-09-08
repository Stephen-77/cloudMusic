<template>
  <div class="index">
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      active-text-color="#ec4141"
      :router="true"
    >
      <el-menu-item
        v-for="(item, index) in menu"
        :key="index"
        :index="item.path"
        >{{ item.label }}</el-menu-item
      >
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      activeIndex: "0",
      menu: [
        {
          name: "findmusic",
          path: "/home/findmusic",
          label: "个性推荐",
        },
        {
          name: "songsheet",
          path: "/home/songsheet",
          label: "歌单",
        },
        {
          name: "rankinglist",
          path: "/home/rankinglist",
          label: "排行榜",
        },
        {
          name: "singer",
          path: "/home/singer",
          label: "歌手",
        },
      ],
    };
  },
  computed: {
    getactiveIndex() {
      const menulist = this.menu;
      // for(var k in menulist){
      //   console.log(menulist[k]);
      // }
      for (const key in menulist) {
        if (menulist[key].name == this.$route.name) {
          // console.log(key);
          // this.activeIndex = key;
          return key;
        }
      }
    },
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    selectmenu(item) {
      this.$router.push({
        name: item.name,
      });
    },
    scrollHandler() {
      console.log(1);
    },
  },
  mounted() {
    // this.getactiveIndex()
  },
  watch: {
    $route: {
      immediate: true,
      handler(newv, oldv) {
        const menulist = this.menu;
        // for(var k in menulist){
        //   console.log(menulist[k]);
        // }
        for (const key in menulist) {
          if (menulist[key].name == this.$route.name) {
            // console.log(key);
            this.activeIndex = key;
          }
        }
      },
    },
  },
};
</script>
<style lang="less" scoped>
.index {
  // transform:rotate(360deg);
  padding-top: 60px;
}
.el-menu {
  position: fixed;
  z-index: 11;
  margin-top: -60px;
  width: 100%;
}
</style>
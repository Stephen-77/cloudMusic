<template>
  <div class="SingerDetail">
    <div class="singerdetail-header">
      <img :src="jianjie.img1v1Url" alt="" />
      <div class="singer-jianjie">
        <h2>{{ jianjie.name }}</h2>
        <p>
          {{ jianjie.alias }}
        </p>
        <p></p>
        <p></p>
        <p>
          单曲数:<span>{{ jianjie.musicSize }}</span>
        </p>
        <p>
          专辑数:<span>{{ jianjie.albumSize }}</span>
        </p>
      </div>
    </div>
    <div class="singerdetail-menu">
      <ul class="menulist">
        <li class="menu" v-for="(item, index) in menulist" :key="index">
          <a
            @click="go(item)"
            :class="$route.name == item.name ? 'active' : ''"
            >{{ item.menuname }}</a
          >
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "SingerDetail",
  data() {
    return {
      jianjie: {},
      menulist: [
        {
          menuname: "专辑",
          name: "top50",
          path: "/singerdetail/top50",
        },
        {
          menuname: "歌手详情",
          name: "detail",
          path: "/singerdetail/detail",
        },
        {
          menuname: "相似歌手",
          name: "alikesinger",
          path: "/singerdetail/alikesinger",
        },
      ],
    };
  },
  methods: {
    go(item) {
      this.$router.push({
        name: item.name,
        query: { singerid: this.$route.query.singerid },
      });
    },
  },
  mounted() {
    this.jianjie = JSON.parse(sessionStorage.getItem("singerdetail"));
    this.jianjie.alias = this.jianjie.alias.join(" ; ");
    // console.log(this.$route);
    // this.$bus.$on('singerdetail',(item)=>{
    //     this.jianjie={
    //         name:item.name,
    //         anothername:item.alias,
    //         musicSize:item.musicSize[0],
    //         albumSize:item.albumSize
    //     }
    // })
  },
};
</script>

<style lang="less" scoped>
.SingerDetail {
  padding: 25px 0 0px 0px;
  .singerdetail-header {
    padding: 0 0 20px 0;
    display: flex;
    img {
      width: 180px;
      height: 180px;
      border-radius: 5px;
      margin: 0;
    }
    .singer-jianjie {
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
      
      h2 {
        margin: 0;
      }
    }
  }
  .singerdetail-menu {
    height: 40px;
    .menulist {
      display: flex;
      .menu {
        height: 35px;
        width: 80px;
        margin: 0 0px 0 0;
        text-align: center;
        line-height: 35px;
        // padding: 5px 10px;
        font-size: 14px;
        color: #606266;
        &:nth-child(1) {
          width: 50px;
        }
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
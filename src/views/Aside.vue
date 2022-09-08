<template>
  <div>
    <div class="aside">
      <ul>
        <li class="" v-for="(item, index) in asideList" :key="index">
          <a
            :class="[$route.name == item.name ? 'active' : '']"
            @click="goPage(item)"
          >
            <img :src="require(`@/assets/icons/${item.iconurl}.png`)" alt="">
            {{ item.value }}
          </a>
        </li>
      </ul>
      <h4 @click="showList = !showList">
        收藏歌单
        <i class="el-icon-caret-bottom" v-if="showList"></i>
        <i class="el-icon-caret-right" v-else></i>
      </h4>
      <ul class="collectsonglist" v-show="showList">
        <li v-for="(item, index) in collectSongList.slice(2)" :key="index" 
        :class="[$route.params.id==item.id?'active':'']"
        @click="goPlaylistDetail(item.id)">
          <img src="../assets/icons/playlist.png" alt="" />
          <p>{{ item.name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { mapState } from "vuex";
export default {
  name: "Aside",
  data() {
    return {
      asideList: [
        {
          name: "findmusic",
          path: "/home/findmusic",
          value: "发现音乐",
          iconurl: 'home'
        },
        {
          name: "mymusic",
          path: "/mymusic",
          value: "我的音乐",
          iconurl:'mylike',
          readonly:true
        },
        {
          name: "recentlyplayed",
          path: "/recentlyplayed",
          value: "最近播放",
          iconurl:'recentlyplay'
        },
       
      ],
      userInfo: {},
      showList: true,
    };
  },
  computed: {
    ...mapState("collectsong", ["collectSongList"]),
  },
  methods: {
    goPage(item) {
      if(item.name=='mymusic'&&this.collectSongList=='') 
      {
        this.$message.warning({
          message:'此功能需要登录！'
        })
      }
      else this.$router.push({
        name: item.name,
      });
    },
     goPlaylistDetail(deatailid) {
      this.$router.push({
        name: "playlistdetail",
        params: { id: deatailid },
      });
    },
    aboutUserAllInfo(){
      this.userInfo = JSON.parse(localStorage.getItem("userinfo"));
      this.$store.dispatch("collectsong/getCollectSong", this.userInfo.userId);
      this.$store.dispatch('mymusic/getMyMusicList',this.userInfo.userId)
      this.$store.dispatch('mymusic/getMyMusicIdList',this.userInfo.userId)
    }
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("userinfo"));
    if(this.userInfo==null) return
    else this.aboutUserAllInfo()
    this.$bus.$on('aboutUserAllInfo',()=>{
      this.aboutUserAllInfo()
    })
  },
};
</script>

<style lang="less" scoped>
.active {
  font-weight: 600;
  font-size: 18px;
  background-color: #f6f6f6;
}
.aside {
  //   height: 480px;
  background-color: #e9eef3;
  ul {
    li {
      display: flex;
      width: 100%;
      height: 40px;
      a {
        flex: 1;
        color: black;
        line-height: 40px;
        padding-left: 15px;
        text-decoration: none;
        font-size: 15px;
         img {
          margin: 0 7px 0 0;
          width: 18px;
          height: 18px;
          vertical-align: middle;
       }
      }
      &:hover {
        background-color: #f6f6f7;
      }
      .disabled{
        // pointer-events: none;
        &:hover{
          cursor: not-allowed;
        }

      }
    }
  }
  h4 {
    display: block;
    height: 40px;
    cursor: pointer;
    padding-left: 15px;
    line-height: 40px;
    font-weight: 400;
    color: #6e6e70;
    font-size: 15px;
    &:hover {
      i {
        color: black;
      }
    }
  }
  .collectsonglist {
    width: 100%;

    li {
      display: flex;
      padding-left: 15px;
      align-items: center;
      font-size: 12px;
      cursor: pointer;
      img {
        margin: 0 7px 0 0;
        width: 18px;
        height: 18px;
      }
      p {
        margin: 0;
        width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
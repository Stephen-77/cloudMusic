<template>
  <div
    class="findmusic"
    v-loading="loading"
    element-loading-text="拼了命加载ing..."
    element-loading-spinner="el-icon-loading"
  >
    <template >
      <el-carousel :interval="4000" type="card" height="200px" style="z-index: 1">
        <el-carousel-item v-for="item in bannersList" :key="item">
          <!-- <h3 class="medium">{{ item }}</h3> -->
          <a :href="item.url"><img :src="item.imageUrl" alt="" /></a>
        </el-carousel-item>
      </el-carousel>
    </template>
    <h3>热门推荐></h3>
    <ul class="playlist">
      <li v-for="item in recommendedhotsongs" :key="item">
        <a @click="goPlaylistDetail(item.id)">
          <div class="video-playcount">
            <i class="el-icon-video-play"></i>
            <p>{{ getCount(item.playCount) }}</p>
            <!-- <p>{{ parseInt(item.playCount / 10000) }}万</p> -->
          </div>
          <img v-lazy="item.picUrl" alt="" srcset="" />
          <div class="video-bofang bofang-btn">
            <i>
              <img src="../../assets/images/播放.png" alt="" />
            </i>
          </div>
        </a>
        <p>{{ item.name }}</p>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: "FindMusic",
  data() {
    return {
      bannersList: [],
      recommendedhotsongs: [],
      // activeIndex: '1',
      fullscreenLoading: false,
      loading: true,
    };
  },

  computed: {
    getCount() {
      return function (index) {
        let count = parseInt(index / 10000);
        if (index < 10000) {
          return index;
        } else if (count > 9999) {
          return parseInt(count / 10000) + "亿";
        } else return count + "万";
      };
    },
  },
  methods: {
    async getBanners() {
      // this.fullscreenLoading=true
      const res = await this.$http.get("/api/banner?type=0");
      if (res.data.code == 200) {
        this.bannersList = res.data.banners;
      }
      // this.fullscreenLoading=false

      // console.log(res);
    },
    async getRecommendHotSongs() {
      const res = await this.$http.get("/api/personalized");
      // console.log(res);
      if (res.data.code == 200) {
        this.recommendedhotsongs = res.data.result;
      }
      this.loading = false;
    },
    goPlaylistDetail(deatailid) {
      this.$router.push({
        name: "playlistdetail",
        params: { id: deatailid },
      });
    },
  },
  mounted() {
    this.getBanners();
    this.getRecommendHotSongs();
  },
};
</script>
<style lang="less" scoped>
.el-carousel__item img {
  width: 100%;
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-menu {
  position: sticky;
  z-index: 999;
  top: 0;
  left: 0;
}
.findmusic {
  // position: relative;
  // padding-top: 60px;
}
.playlist {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  li {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
    margin: 0;
    // justify-content: center;
    // align-items: center;
    a {
      text-decoration: none;
      color: white;
      position: relative;

      .video-playcount {
        position: absolute;
        font-size: 14px;
        width: 70px;
        height: 20px;
        top: 10px;
        right: 0px;
        display: flex;
        // line-height: 20px;
        align-items: center;
        // justify-content: center;
        i {
          margin-right: 4px;
        }
        P {
          display: block;
          overflow: visible;
          width: 65px;
        }
      }
      .video-bofang {
        // display: none;
        transition: all 0.6s linear;
        opacity: 0;
        position: absolute;
        bottom: 15px;
        right: 15px;
        border-radius: 50%;
        background: white;
        i {
          display: block;
          width: 30px;
          height: 30px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      &:hover {
        .bofang-btn {
          //   display: block;
          opacity: 1;
        }
      }
      img {
        width: 174px;
        height: 174px;
        border-radius: 5px;
        // &::before {
        //   content: ;
        // }
      }
    }
    p {
      //   display: block;
      width: 174px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      // -o-text-overflow: ellipsis;
      font-size: 13px;
    }
  }
}
</style>
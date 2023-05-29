<template>
  <div class="top50">
    <div class="aside">
      <img src="http://47.102.159.133/img/top50.89421d54.png" alt="" />
    </div>
    <div class="container">
      <ul
        v-loading="loading"
        element-loading-text="拼了命加载ing..."
        element-loading-spinner="el-icon-loading"
      >
        <h4 class="bofang">热门50首 <a @click="goPlayMusic(top50List[0])"></a></h4>
        <li
          v-for="(item, index) in top50List.slice(0, this.size)"
          :key="index"
          @dblclick="goPlayMusic(item)"
        >
          <span :class="index < 3 ? 'qiansan' : ''">{{ index + 1 }}</span>
          <h4>
            {{ item.songname }}
            <h5 v-if="item.anothername">({{ item.anothername }})</h5>
          </h4>
          <p>{{ item.time | songtime }}</p>
        </li>
        <li class="last" v-show="show">
          <a @click="size = 50,show=false" >查看全部{{ top50List.length }}首 ></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Top50",
  data() {
    return {
      top50List: [],
      size: 10,
      loading: true,
      show:true
    };
  },
  methods: {
    async getTop50Song(singerid) {
      const res = await this.$API.reqSingerSongList(singerid);
      if (res.code == 200) {
        this.top50List = res.songs.map((item) => ({
          songname: item.name,
          anothername: item.alia[0],
          time: item.dt,
          id: item.id,
          al: item.al,
          ar: item.ar,
          dt: item.dt,
          name: item.name,
        }));
        this.loading = false;
      }
      // this.$forceUpdate();
    },
    openAllSong() {
      this.size=50
      // this.$refs.last.className=
    },
    goPlayMusic(item) {
      console.log(item);
      this.$store.dispatch("player/playMusic", {
        list: this.top50List,
        id: item.id,
      });

    },
  },
  mounted() {
    this.getTop50Song(this.$route.query.singerid);
  },
};
</script>

<style lang="less" scoped>
.top50 {
  display: flex;
  position: relative;
  margin-top: 10px;
  .aside {
    margin: 0;
  }
  img {
    width: 150px;
    height: 150px;
    margin: 10px 20px 10px 10px;
    border-radius: 8px;
  }
  .container {
    margin: 0 0 0 30px;
    width: 77%;
    ul {
      margin: 10px 0 0 0;
      width: 100%;
      // width:700px;
      display: flex;
      flex-direction: column;
      .bofang {
        margin: 0 0 5px 0;
        display: inline-block;
        display: flex;
        align-items: center;
        a {
          display: block;
          margin: 0 0 0 10px;
          width: 20px;
          height: 20px;
          background: url("../../assets/icons/yuxing.png") no-repeat;
          background-size: 100% 100%;
        }
      }

      li {
        display: flex;
        align-items: center;
        width: 100%;
        height: 36px;
        margin: 0;
        border-radius: 4px;
        background-color: rgb(139, 110, 110);
        &:hover {
          background-color: #efefef !important;
        }
        span {
          width: 10%;
          margin: 0;
          text-align: center;
          color: #909399;
        }
        .qiansan {
          color: red;
        }
        h4 {
          width: 60%;
          margin: 0;
          font-weight: normal;
          font-size: 14px;
          h5 {
            display: inline-block;
            color: #909399;
            font-size: 10px;
            font-weight: 400;
          }
        }
        p {
          font-size: 13px;
          width: 30%;
          text-align: right;
          padding-right: 5%;
          color: #909399;
        }
        &:nth-child(2n) {
          background-color: #ffffff;
        }
        &:nth-child(2n + 1) {
          background-color: #f9f9f9;
        }
      }
      .last {
        justify-content:flex-end ;
        a {
          color: #909399;
          font-size: 13px;

          margin: 0 20px 0 0;
          &:hover {
            color: black;
          }
        }
      }
      
    }
  }
}
</style>
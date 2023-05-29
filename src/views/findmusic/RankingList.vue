<template>
  <div class="rankinglist" v-loading="loading" element-loading-text="拼了命加载ing..." element-loading-spinner="el-icon-loading">
    <h3 >官方榜</h3>
    <div class="hotsong" >
      <div class="left">
        <a @click="goPlaylistDetail(rege)">
          <img v-lazy="regeList.img" alt="" />
          <div class="icon"><i class="el-icon-caret-right"></i></div>
        </a>
      </div>
      <ul>
        <li
          v-for="(item, index) in regeList.regelists"
          :key="index"
          @dblclick="goPlayMusic(item)"
        >
          <span :class="index < 3 ? 'qiansan' : ''">{{ index + 1 }}</span>
          <h4>
            {{ item.songname }}
            <h5 v-if="item.anothername">({{ item.anothername }})</h5>
          </h4>
          <p>{{ item.singer }}</p>
        </li>
        <a @click="goPlaylistDetail(rege)">查看全部 ></a>
      </ul>
    </div>
    <div class="hotsong">
      <div class="left">
        <a @click="goPlaylistDetail(biaosheng)">
          <img v-lazy="biaoshengList.img" alt="" />
          <div class="icon"><i class="el-icon-caret-right"></i></div>
        </a>
      </div>
      <ul>
        <li
          v-for="(item, index) in biaoshengList.biaoshenglist"
          :key="index"
          @dblclick="goPlayMusic(item)"
        >
          <span :class="index < 3 ? 'qiansan' : ''">{{ index + 1 }}</span>
          <h4>
            {{ item.songname }}
            <h5 v-if="item.anothername">({{ item.anothername }})</h5>
          </h4>
          <p>{{ item.singer }}</p>
        </li>
        <a @click="goPlaylistDetail(biaosheng)">查看全部 ></a>
      </ul>
    </div>
    <div class="hotsong">
      <div class="left">
        <a @click="goPlaylistDetail(xinge)">
          <img v-lazy="xingeList.img" alt="" />
          <div class="icon"><i class="el-icon-caret-right"></i></div>
        </a>
      </div>
      <ul>
        <li
          v-for="(item, index) in xingeList.xingelist"
          :key="index"
          @dblclick="goPlayMusic(item)"
        >
          <span :class="index < 3 ? 'qiansan' : ''">{{ index + 1 }}</span>
          <h4>
            {{ item.songname }}
            <h5 v-if="item.anothername">({{ item.anothername }})</h5>
          </h4>
          <p>{{ item.singer }}</p>
        </li>
        <a @click="goPlaylistDetail(yuanchuang)">查看全部 ></a>
      </ul>
    </div>
    <div class="hotsong">
      <div class="left">
        <a @click="goPlaylistDetail(xinge)">
          <img v-lazy="yuanchuangList.img" alt="" />
          <div class="icon"><i class="el-icon-caret-right"></i></div>
        </a>
      </div>
      <ul>
        <li
          v-for="(item, index) in yuanchuangList.yuanchuanglist"
          :key="index"
          @dblclick="goPlayMusic(item)"
        >
          <span :class="index < 3 ? 'qiansan' : ''">{{ index + 1 }}</span>
          <h4>
            {{ item.songname }}
            <h5 v-if="item.anothername">({{ item.anothername }})</h5>
          </h4>
          <p>{{ item.singer }}</p>
        </li>
        <a @click="goPlaylistDetail(yuanchuang)">查看全部 ></a>
      </ul>
    </div>
  </div>
</template>

<script>
import time from "@/plugins/time";
import { mapActions } from 'vuex';
import store from '@/store';
export default {
  name: "RankingList",
  data() {
    return {
      rege: "3778678",
      biaosheng: "19723756",
      xinge: "3779629",
      yuanchuang: "2884035",
      regeList: {},
      biaoshengList: {},
      yuanchuangList: {},
      xingeList: {},
      loading:true
    };
  },
  computed:{
    ...mapActions('player',['playMusic'])
  },
  methods: {
    async getRege() {
      const res = await this.$API.reqPlaylistDetail(this.rege);
      if (res.code == 200) {
        this.regeList.img = res.playlist.coverImgUrl;
        this.regeList.regelists = res.playlist.tracks
          .slice(0, 5)
          .map((item) => ({
            songname: item.name,
            anothername: item.alia[0],
            singer: item.ar.map((item) => item.name).join("/"),
            time: time.getMsstime(item.dt),
            // id: item.id,
            // name: item.name,
            // al: item.al,
            // ar: item.ar,
            songsheetid:this.rege,
            songid:item.id
          }));
          // this.$store.dispatch('playMusic',)

      }
      this.$forceUpdate();
    },
    async getBiaosheng() {
      const res = await this.$API.reqPlaylistDetail(this.biaosheng);
      if (res.code == 200) {
        this.biaoshengList.img = res.playlist.coverImgUrl;
        this.biaoshengList.biaoshenglist = res.playlist.tracks
          .slice(0, 5)
          .map((item) => ({
            songname: item.name,
            anothername: item.alia[0],
            singer: item.ar.map((item) => item.name).join("/"),

            time: time.getMsstime(item.dt),
           songsheetid:this.biaosheng,
            songid:item.id
          }));
      }
      this.$forceUpdate();
    },
    async getXinge() {
      const res = await this.$API.reqPlaylistDetail(this.xinge);
      if (res.code == 200) {
        this.xingeList.img = res.playlist.coverImgUrl;
        this.xingeList.xingelist = res.playlist.tracks
          .slice(0, 5)
          .map((item) => ({
            songname: item.name,
            anothername: item.alia[0],
            singer: item.ar.map((item) => item.name).join("/"),

            time: time.getMsstime(item.dt),
            songsheetid:this.xinge,
            songid:item.id
          }));
      }
      this.$forceUpdate();
    },
    async getYuanchuang() {
      const res = await this.$API.reqPlaylistDetail(this.yuanchuang);
      if (res.code == 200) {
        this.yuanchuangList.img = res.playlist.coverImgUrl;
        this.yuanchuangList.yuanchuanglist = res.playlist.tracks
          .slice(0, 5)
          .map((item) => ({
            songname: item.name,
            anothername: item.alia[0],
            singer: item.ar.map((item) => item.name).join("/"),

            time: time.getMsstime(item.dt),
           songsheetid:this.yuanchuang,
            songid:item.id
          }));
      }
      this.$forceUpdate();
      this.loading=false
    },
    goPlaylistDetail(deatailid) {
      this.$router.push({
        name: "playlistdetail",
        params: { id: deatailid },
      });
    },
    async goPlayMusic(item) {
      // this.getSongDetail(item)
      sessionStorage.setItem("songdetailData", JSON.stringify(item));
      // this.$bus.$emit("playmusic", item);
      const res =await this.$API.reqPlaylistDetail(item.songsheetid)
      if(res.code==200){
        // playload={}
      this.$store.dispatch('player/playMusic',{list:res.playlist.tracks,id:item.songid})
      }
    },
  },
  watch: {
    regeList() {
      this.$nextTick(() => {});
    },
  },
  mounted() {
    this.getRege();
    this.getXinge();
    this.getYuanchuang();
    this.getBiaosheng();
  },
};
</script>
<style lang="less" scoped>
.rankinglist {
  padding: 10px 10px 0 10px;
  .hotsong {
    display: flex;
    position: relative;
    margin-top: 10px;
    width: 100%;
    .left {
      margin: 0;
      // width: 22%;
      &:hover {
        .icon {
          opacity: 0.8 !important;
        }
        // width: 10px;
      }
    }
    img {
      width: 180px;
      height: 180px;
      margin: 10px 40px 10px 10px;
      border-radius: 8px;
    }
    .icon {
      position: absolute;
      top: 80px;
      left: 77px;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      border-radius: 50%;
      opacity: 0;
      transition: all 0.5s;
      i {
        font-size: 33px;
        color: red;
      }
    }
    ul {
      margin: 10px 0 0 0;
      width: 70%;
      display: flex;
      flex-direction: column;
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
          width: 50%;
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
          width: 40%;
          text-align: right;
          padding-right: 5px;
          color: #909399;
        }
        &:nth-child(2n) {
          background-color: #ffffff;
        }
        &:nth-child(2n + 1) {
          background-color: #f9f9f9;
        }
      }
      a {
        color: #909399;
        font-size: 13px;
        margin: 10px 0 0 0;
        &:hover {
          color: black;
        }
      }
    }
  }
}
</style>
<template>
  <div class="lyric">
    <div v-if="lyricdata == ''">无歌词</div>
    <div>
      <!-- <div>{{ songdata.name }}</div> -->
      <h2>{{SongName}}</h2>
      <ul class="lyriccontainer" ref="lyriccontainer" v-loading="loading" element-loading-text="正在加载歌词..." element-loading-spinner="el-icon-loading">
        <!-- <div v-for="(item,key,index) in lyricdata" :key="index">
          <span v-if="nowtime > key&&nowtime<allkeys[index+1]">{{ item }}</span>
        </div> -->
        <li class="each" v-for="(item, key, index) in lyricdata" :key="index">
          <p :class="{ choose: key == lyricIndex }">{{ item }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
  name: "Lyric",
  props: [""],
  data() {
    return {
      songdata: {},
      lyricdata: {},
      nowtime: "",
      allkeys: [],
      lyricIndex: 0,
      loading:true
    };
  },
  computed:{
    ...mapState('lyric',['SongName'])
  },
  methods: {
    // getsongdetaildata(result) {
    //   this.songs = result;
    //   // this.$set(this.songs,'name',result.name)
    //   // console.log(this.songs);
    // },
    // ...mapMutations('lyric',['getSongDetail']),
    showlyric(lyric) {
      for (const key in lyric) {
        this.allkeys.push(key);
      }
    },
    fliterLRC(values) {
      if (!values) return;
      var lyric = [];
      let lrc = values.split("\n");
      let reg = /\[\d*:\d*(\.|:)\d*]/g;
      for (let index = 0; index < lrc.length; index++) {
        const timeRegArr = lrc[index].match(reg);
        if (!timeRegArr) continue;
        // 获取歌词
        const content = lrc[index].replace(timeRegArr, "");
        // 获取时间
        const t = timeRegArr[0];
        const minute = parseInt(t.match(/\[\d*/i).toString().slice(1));
        const sec = parseInt(
          t
            .match(/\[\d*:\d*/i)
            .toString()
            .slice(4)
        );
        const time = minute * 60 + sec;
        lyric[time] = content;
      }
      this.lyricdata = lyric;
      this.showlyric(lyric);
    },

    async getlyric() {
      // const res = await this.$API.reqLyric(this.songdata.id);
      const res = await this.$API.reqLyric(this.$route.params.lyricid);
      if (res.code == 200) {
        this.lyricdata = res.lrc.lyric;
        this.fliterLRC(this.lyricdata);

      }
      this.loading=false
    },
  },
  watch: {
    nowtime(newvalue, oldvalue) {
      let i = 0;
      // 循环歌词对象
      for (let key in this.lyricdata) {
        // key表示歌词对象中的时间，如果key等于歌曲进度value，改变当前歌词进度		lyricIndex
        if (+key == parseInt(newvalue)) {
          this.lyricIndex = key;
          // 当歌词进度大于5，即播放到了第5句歌词，开始滚动
          if (i > 5) {
            this.$refs.lyriccontainer.scrollTop = 40 * (i - 5);
          }
        }
        i++;
      }
    },
  },
  mounted() {
    this.$bus.$on("currenttime", (nowtimes) => {
      this.nowtime = nowtimes;
    });
    // this.$bus.$on("songdetaildata",(res)=>{
    //   this.songs=res
    // });
    this.songdata=JSON.parse(sessionStorage.getItem('songdetailData'))
    this.getlyric();
  },
};
</script>

<style lang="less" scoped>
h2 {
  font-weight: normal;
  text-align: center;
  color: #2c3e50;
}
.lyric {
  width: 600px;
  height: calc(100vh - 140px);
  // height: 460px;
  margin: 0 auto;
  display: flex;
  position: relative;
  // background-color: rgb(223, 169, 169);
  .lyriccontainer {
    // top: 0%;
    // left: 0;/
    // position: absolute;
    // flex: 1;
    width: 500px;
    height: calc(100vh - 171px);
    // height: 420px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    list-style: none;
    // background-color: gray;
    .each {
      height: 40px;
      // border: 1px solid #000;
      line-height: 40px;
      font-size: 16px;
      color: #2c3e50;
      // color: aquamarine;
      .choose {
        height: 40px;
        line-height: 40px;
        font-size: 22px;
        font-weight: 700;
        color: #59595b;
      }
    }
    // 修改滚动条样式
    &::-webkit-scrollbar {
      width: 3px;
      height: 1px;
    }
    // 滑块部分
    &::-webkit-scrollbar-thumb {
      background-color: #abacb1;
    }
  }
}
</style>
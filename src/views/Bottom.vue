<template>
  <div class="footer">
    <div class="player">
      <div class="player-left">
        <!-- <img
          v-if="songDetail.isnull == ''"
          src="../assets/images/player-logo.png"
          alt=""
        /> -->
        <!-- <div> -->
        <img :src="imgInfo.imgUrl" alt="" ref="imgs" />
        <div class="zhezhao" ref="zhezhao" @click="showlyric">
          <i v-show="show" class="el-icon-arrow-up"></i>
          <i v-show="!show" class="el-icon-arrow-down"></i>
        </div>
        <!-- </div> -->

        <div class="player-detail">
          <!-- <div v-if="songDetail.isnull == ''">
            <p class="song-title">未知歌名</p>
            <p class="singer">未知歌手</p>
          </div> -->
          <div>
            <p class="song-title">{{ imgInfo.name }}</p>
            <p class="singer">{{ imgInfo.author }}</p>
          </div>
        </div>
      </div>
      <div class="player-center">
        <!-- 播放器 -->
        <div class="player-wrapper">
          <!-- 播放器按钮 -->
          <div class="player-bar">
            <!-- <button class="player-bar-btn" @click="changePlayModel">
            <i class="iconfont icon-liebiaoshunxu"></i>
          </button> -->
            <button class="isliked" @click="changePlayMode">
                <img v-show="playmode==1"  src="../assets/icons/liebiao.png" alt="" title="顺序播放">                              
                <img v-show="playmode==2" src="../assets/icons/danqu.png" alt="" title="单曲循环">                              
                <img v-show="playmode==3" src="../assets/icons/suiji.png" alt="" title="随机播放">                              
            </button>
       
            <button class="player-bar-btn" @click="lastMusic">
              <!-- :class="{ 'player-bar-btn_disabled': playType === 'personalFm' }" -->
              <i class="el-icon-arrow">
                <img src="../assets/icons/lastplay.png" alt="" />
              </i>
            </button>
            <button class="player-bar-btn" @click="pause">
              <i v-show="isPlay" class="el-icon-video">
                <img src="../assets/icons/playing.png" alt="" srcset="" />
              </i>
              <i v-show="!isPlay" class="el-icon-video">
                <img src="../assets/icons/zanting.png" alt="" srcset="" />
              </i>
            </button>
            <button class="player-bar-btn" @click="nextMusic">
              <i class="el-icon-arrow">
                <img src="../assets/icons/nextplay.png" alt="" srcset="" />
              </i>
            </button>
            <button class="isliked" @click="likemusic">
                <img v-show="isliked"  src="../assets/icons/nolike.png" alt="" title="喜欢">                              
                <img v-show="!isliked" src="../assets/icons/like.png" alt="" title="取消喜欢">                              
            </button>
       
          </div>
          <!-- 进度条 -->
          <div class="time-progress">
            <span class="font-12">{{
              currenMusicInfo.currenTime | playtime
            }}</span>
            <el-slider
              v-model="curren"
              class="timeSlider"
              :show-tooltip="false"
              @change="changeCurrenTime"
              :disabled="musicUrl == ''"
            ></el-slider>
            <span class="font-12">{{
              currenMusicInfo.totalTime | songtime
            }}</span>
          </div>
        </div>
        <audio
          ref="audioRef"
          :src="musicUrl"
          autoplay
          @ended="zidong"
          @timeupdate="updateCurrenTime"
        ></audio>
      </div>
      <div class="player-right">
          <div @click="isMute = !isMute" class="voice">
            <img v-show="volume==0" src="../assets/icons/mute.png" alt="">
            <img v-show="volume!=0" src="../assets/icons/nomute.png" alt="">
          </div>
          <div class="volume-slider">
            <el-slider v-model="volume"> </el-slider>
          </div>
          <div class="playlist" @click="table=true">
            <img src="../assets/icons/playlist2.png" alt="">
          </div>
          <el-drawer
            title="当前播放"
            :visible.sync="table"
            direction="rtl"
            :modal="false"
            >
            <div class="header">
              <p>总共{{playMusicList.length}}首</p>
              <p>当前播放第{{getCurrentPlayIndex+1}}首</p> 
            </div>
            <el-divider></el-divider>
            <el-table :data="playMusicList" stripe :show-header="false" @row-dblclick="goPlayMusic" empty-text="快去播放音乐吧！">
                <el-table-column   class="table" width="40"> 
                  <template slot-scope="scope"> 
                    <span :class="currenMusicId==scope.row.id?'iconplay':''">{{scope.row.index+1}}</span>
                  </template>
                </el-table-column>
                <el-table-column property="songname" width="100" show-overflow-tooltip></el-table-column>
                <el-table-column property="singer" width="180" show-overflow-tooltip></el-table-column>
                <el-table-column property="songtime"></el-table-column>
            </el-table>
            
          </el-drawer>
         
      </div>
    </div>
  </div>
</template>

<script>
import time from '@/plugins/time';
import { mapMutations, mapState } from "vuex";
export default {
  name: "Bottom",
  data() {
    return {
      songDetail: { isnull: "" },
      playMusicList: [],
      songDetailData: {},
      curren: 0, //进度条的百分比，
      musicUrl: "", //音乐地址
      volume: 50, //音量
      saveVolume: 50, //静音前保存的音量
      isMute: false, //是否是静音
      imgInfo: {
        imgUrl:
          "https://img1.baidu.com/it/u=7080172,655695762&fm=253&fmt=auto&app=138&f=GIF?w=240&h=240",
        name: "未知歌名",
        author: "未知歌手名",
      },
      show: true,
      table:false,
      playmode:1
    };
  },
  computed: {
    ...mapState("lyric", ["songdetaildata"]),
    ...mapState("player", [
      "isPlay",
      "currenMusicId",
      "currenIndex",
      "musicList",
      "currenMusicInfo",
    ]),
    ...mapState('mymusic',['myMusicIdList']),
    isliked(){
      console.log(this.currenMusicId);
      if(!this.currenMusicId) return
      return this.myMusicIdList.indexOf(this.currenMusicId)==-1
    },
    getCurrentPlayIndex(){
      return this.musicList.findIndex(item=>item.id==this.currenMusicId)
    }
  },
  methods: {
     getPlayMusicList() {
        this.playMusicList=this.musicList.map((item,index)=>({
          id:item.id,
          index:index,
          songname:item.name,
          singer:item.ar.map((item) => item.name).join("/"),
          songtime:time.getMsstime(item.dt)
        }))      
    
    },
    ...mapMutations("lyric", ["setSongName"]),
    ...mapMutations('recentlysong',['setRecentlySongList']),
    ...mapMutations('mymusic',['addMylikeMusic','cancelMyLikeMusic']),
    async likemusic(){
      if(localStorage.getItem('userinfo')==null){
        this.$message.warning({
          message:'需要登录才能操作！'
        })
      }
      else{
        const res =await this.$API.reqLikeThisSong(this.isliked,this.currenMusicId)
        if(res.code=200){
          this.$message.success({
            message:this.isliked?'已添加到我的喜欢':'取消喜欢成功'
          })
          if(this.isliked){
            this.$store.commit('mymusic/addMylikeMusic',this.musicList[this.currenIndex])
          }
          else this.$store.commit('mymusic/cancelMyLikeMusic',this.currenMusicId)

        }
        else return
      }
    },
    watchIsLiked(){
      this.isliked
    },
    addEventHandle() {
      this.$refs.audioRef.addEventListener("timeupdate", (e) => {
        this.$bus.$emit("currenttime", this.$refs.audioRef.currentTime);
        // this.currenttime=this.$refs.player.currentTime
      });
    },
    changePlayMode(){
      if(this.playmode>=3) this.playmode=1
      else this.playmode=this.playmode+1
    },
    /* 获取音乐地址 */
    async getMusicUrl() {
      this.getImgInfo();
      this.getToltime();
      const res = await this.$API.reqSongURLDetail(this.currenMusicId);
      console.log(res);
      if (res.code !== 200) return this.$message.error("播放失败");
      if (!res.data[0].url) {
        const h = this.$createElement;
        this.$notify({
          title: "当前歌曲暂无音源",
          message: h(
            "i",
            { style: "color: teal" },
            "因版权方要求，该资源暂时无法播放，我们正在争取歌曲回归"
          ),
        });
        this.musicUrl = "";
        this.$store.commit("player/setPlayState", false);
        return;
      }
      this.musicUrl = res.data[0].url;
      console.log(res);
    },
    /* 改变音量 */
    changeVolume() {
      this.$refs.audioRef.volume = this.volume / 100;
    },
    /* 暂停 */
    pause() {
      if (this.musicUrl.length === 0) return;
      this.$store.commit("player/setPlayState", !this.isPlay);
    },
    /* 获取图片信息 */
    async getImgInfo() {
      if (!Object.hasOwn(this.musicList[this.currenIndex].al, "picUrl")) {
        const res = await this.$API.reqSongDetail(
          this.musicList[this.currenIndex].id
        );
        if (res.code == 200) {
          this.imgInfo.imgUrl = res.songs[0].al.picUrl;
        }
      } else if (this.musicList[this.currenIndex].al.picUrl != null) {
        this.imgInfo.imgUrl = this.musicList[this.currenIndex].al.picUrl;
      } else {
        this.imgInfo.imgUrl =
          "https://img1.baidu.com/it/u=7080172,655695762&fm=253&fmt=auto&app=138&f=GIF?w=240&h=240";
      }
      this.imgInfo.author = this.musicList[this.currenIndex].ar
        .map((item) => item.name)
        .join("/");
      this.imgInfo.name = this.musicList[this.currenIndex].name;
      // this.setHistory()
    },
    /* 获取歌曲时长 */
    getToltime() {
      this.$store.commit(
        "player/setTotalTime",
        this.musicList[this.currenIndex].dt
      );
    },
    /* 更新当前播放时间 */
    updateCurrenTime() {
      if (!this.$refs.audioRef) return;
      /* 通过audio对象的方法获取当前时间 */
      let time = this.$refs.audioRef.currentTime;

      time = Math.floor(time);
      /* 同步进度条 */
      if (time != this.currenMusicInfo.currenTime) {
        this.$store.commit("player/setCurrenTime", time);
        let percent =
          ((this.currenMusicInfo.currenTime * 1000) /
            this.currenMusicInfo.totalTime) *
          100;
        percent = Math.floor(percent);
        this.curren = percent;
      }
    },
    /* 拖动进度条的回调，手动改变播放进度 */
    changeCurrenTime(val) {
      console.log(val);
      let time = ((val / 100) * this.currenMusicInfo.totalTime) / 1000;
      this.$refs.audioRef.currentTime = time;
    },
    /* 上一首 */
    lastMusic() {
      console.log("上一首");
      // if (this.playType == 'music') {
      if (this.currenIndex != 0) {
        this.$store.commit("player/setCurrenIndex", this.currenIndex - 1);
        this.$store.commit(
          "player/setCurrenMusicId",
          this.musicList[this.currenIndex].id
        );
      } else {
        this.$store.commit("setPlayState", false);
        this.$message.error("已经是第一首了");
      }
      // } else if (this.playType == 'personalFm') {
      //   return false
      // }
    },
    /* 下一首 */
    nextMusic() {
      console.log("下一首");
      if (this.playmode === 1||this.playmode==2) {
        if (this.currenIndex != this.musicList.length - 1) {
          this.$store.commit("player/setCurrenIndex", this.currenIndex + 1);
          this.$store.commit(
            "player/setCurrenMusicId",
            this.musicList[this.currenIndex].id
          );
        } else {
          this.$store.commit("player/setPlayState", false);
          this.$message.error("已经是最后一首了！");
        }
      }
      else if(this.playmode==3){
        const currenIndex1= Math.round(Math.random()*(this.musicList.length))
         this.$store.commit("player/setCurrenIndex", currenIndex1);
         this.$store.commit(
            "player/setCurrenMusicId",
            this.musicList[currenIndex1].id
          );
      }
    },
    // 触发结束条件
    zidong(){
      if(this.playmode==1||this.playmode==3) this.nextMusic()
      else if(this.playmode==2) this.$refs.audioRef.play()
      
    },
    showlyric(){
      
      if(this.show){
         this.setSongName(this.imgInfo.name);
         this.$router.push({
          name: "lyric",
          params: { lyricid: this.currenMusicId },
         });
      this.show=!this.show
      }
      else{
        this.$router.back()
        this.show=!this.show

      }
    },
    goPlayMusic(item){
      console.log(item);
      this.$store.dispatch('player/currentPlayMusicList',item.id)
    }
   
  },
  watch: {
    /* 通过Vuex管理的播放状态,audio会自动播放 */
    isPlay(val) {
      /* 由于misicUrl第一次是状态改变后获取，所以第一次改变不要进入监听 */
      if (this.musicUrl === "") return;
      if (val) {
        this.$refs.audioRef.play();
      } else {
        this.$refs.audioRef.pause();
      }
    },
    /* 监听静音状态 */
    isMute(val) {
      if (val) {
        this.saveVolume = this.volume;
        this.volume = 0;
      } else {
        this.volume = this.saveVolume;
      }
    },
    /* 监听音量的改变 */
    volume() {
      this.changeVolume();
    },
    currenMusicId() {
      console.log("播放的歌曲改变了");
      this.getMusicUrl();
      this.setRecentlySongList(this.musicList[this.currenIndex])

      if (this.isPlay == false) {
        this.$store.commit("player/setPlayState", true);
      }

      // if (this.PlayViewDrawer) {
      //   document.querySelector('.player .el-drawer__body').scrollTop = 0
      // }
    },
     myMusicIdList(){
      this.watchIsLiked()
      // this.getPlayMusicList()
    },
    musicList:{
      immediate:true,
      handler(newv){
        // console.log(newv);
        this.getPlayMusicList()
      }
    }
  },
  mounted() {
    this.addEventHandle();
    // console.log(this.$refs.table);
   
    // this.songDetailData=JSON.parse(sessionStorage.getItem('songdetailData'))
    // this.playmusic(this.songdetaildata)
    // this.$bus.$on("playmusic", this.playmusic);
    // this.$nextTick(() => {
    //   this.$refs.imgs.addEventListener("mouseenter", function(){
    //     console.log(1);
    //   });
    // });
  },
};
</script>

<style lang="less" scoped>
.footer {
  position: fixed;
  z-index: 999;
  bottom: 0;
  left: 0;
  height: 80px;
  width: 100%;
  background: #c4c0c0;
  .player {
    height: 100%;
    width: 100%;
    display: flex;
    // justify-content: space-around;
    align-items: center;
    .player-left {
      margin: 0 10px;
      width: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      img {
        margin: 0 1px;
        width: 50px;
        height: 50px;
        border-radius: 8px;
      }
      .zhezhao {
        position: absolute;
        display: inline-block;
        left: 1px;
        top: 0;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        background-color: #2c3e50;
        // opacity: .8;
        opacity: 0;
        border-radius: 8px;
        transition: all .5s;
        cursor: pointer;
        i {
          font-size: 20px;
          color: white;
          font-weight: 700;
        }
        &:hover{
          opacity: .8;
        }
      }
      .player-detail {
        margin: 0 auto 0 10px;
        color: #2c3e50;
        .song-title {
          width: 220px;
          font-size: 14px;
          overflow: hidden;
           white-space:nowrap;
          text-overflow: ellipsis;
        }
        .singer {
          font-size: 12px;
        }
      }
    }
    .player-center {
      margin: 0 10px;
      width: 600px;

      /* 中间的按钮区 */
      .player-bar {
        width: 300px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        margin-top: 6px;
        justify-content: space-around;

        &-btn {
          height: 25px;
          width: 25px;
          outline: none;
          border: none;
          background-color: #c4c0c0;
          cursor: pointer;
           display: flex;
            align-items: center;
            justify-content: center;
          &:hover {
            i {
              transform: scale(0.8);
            }
          }
          i {
            // font-size: 18px;
            transform: scale(0.6);
            transition: all 0.5s;
            img {
              width: 100%;
            }
          }
          &:nth-child(3) {
            height: 32px;
            width: 32px;
            border-radius: 50%;
            background-color: #f4f4f4;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          &:nth-child(3):hover {
            background-color: #e5e5e5;
          }
          
        }
        .isliked{
            height: 25px;
            width: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: scale(0.8);
            transition: all 0.5s;
            outline: none;
            border: none;
            background-color: #c4c0c0;

            cursor: pointer;
              img {
               width: 100%;
              }
            &:hover{
                transform: scale(1);
            }
          
          }
        &-btn_disabled {
          cursor: not-allowed;
          color: #e5e5e5;

          &:hover {
            color: #e5e5e5;
          }
        }
      }

      /* 时间进度条 */
      .time-progress {
        line-height: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        /deep/.el-slider__bar {
          background-color: rgb(121, 118, 118);
        }
        /deep/.el-slider__button {
          border: 2px solid #dcdcf5;
          background-color: rgb(127, 132, 132);
        }
        .font-12 {
          font-size: 12px;
        }
      }

      .timeSlider {
        width: 460px;
        margin: 0 10px;
      }
      audio {
        width: 100%;
        outline: none;
      }
    }
    .player-right {
      display: flex;
      justify-content: space-around;
      align-items: center;
      // width:225px;

      i {
        font-size: 30px;
      }
      .voice{
        display: flex;
        align-items: center;
        margin: 0 10px;
        width: 30px;
        height: 30px;
        cursor: pointer;
        img{
          width: 30px;
          height: 30px;
        }
      }
      .volume-slider{
        margin: 0;
        width: 100px;
          /deep/.el-slider__bar {
          background-color: rgb(121, 118, 118);
        }
        /deep/.el-slider__button {
          // border: 2px solid #dcdcf5;
          border: 0;
          width: 8px;
          height: 8px;
          background-color: rgb(147, 151, 151);
        }
      }
      .playlist{
        // width: 95px;
        margin:0 0 0 50px;
        img{
          width: 30px;
          height: 25px;
        }
      
      }
      /deep/.el-drawer__body{
        .header{
          display: flex;
          height: 30px;
          width: 400px;
          background-color: #0000 !important;
          // justify-content: space-around;
          p{
            width: 50%;
            // flex: 1;
            margin: 0;
            text-align: center;
            line-height: 50px;
            font-size: 12px;
            color: #454444;
          }
        }
        .el-table{
          font-size: 12px;
          .cell {
            
            .iconplay{
              position: relative;
              transform: scale(.8);
               &::after{
                  content: '';
                  position: absolute;
                  top: 0;
                  left: 0;
                  background:#fafafa url('../assets/icons/iconplay.png');
                  width: 18px;
                  height: 18px;
                  background-size: 100%;
                  opacity: 1;
              }
            }
           
          }
        }
      }
      // /deep/.el-drawer__container .el-drawer__open{
        /deep/.el-drawer{
          width: 400px !important;
        }
          /deep/.el-drawer__header{
         
            width: 100% !important;
         
          }
        // }
      // }
    
    }
  }
}
</style>
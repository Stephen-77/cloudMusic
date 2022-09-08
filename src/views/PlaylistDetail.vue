<template>
  <div
    class="playlist"
    v-loading="loading"
    element-loading-text="拼了命加载ing..."
    element-loading-spinner="el-icon-loading"
  >
    <div class="playlist-header">
      <img v-lazy="jianjie.coverImgUrl" alt="" />
      <div class="playlist-jianjie">
        <h3>
          <span v-if="$route.query.isBoutique">精品歌单</span>
          <span v-else>歌单</span>
          {{ jianjie.name }}
        </h3>
        <p>
          歌单创作者:{{ jianjie.nickname }}
          <span>{{ jianjie.createTime }}创建</span>
        </p>
        <a>
          <a @click="goPlayMusic(playlistDetailList[0])" class="goAddSongSheet"
            ><i class="el-icon-caret-right"></i>播放全部
          </a>
          <a @click="goAddSongSheet" class="goAddSongSheet" v-if="addorcancel"
            ><i class="el-icon-folder-add"></i>收藏
          </a>
          <a @click="goCancelSongSheet" class="goAddSongSheet" v-else
            ><i class="el-icon-folder-checked"></i>已收藏</a
          >
        </a>
        <p>
          标签:<span>{{ jianjie.tags }}</span>
        </p>
        <p>
          歌曲:<span>{{ playlistDetailList.length }}</span
          >播放: <span>{{ jianjie.playCount }}</span>
        </p>
        <el-collapse accordion style="width: 100%">
          <el-collapse-item class="jianjie-detail">
            <template slot="title">
              <div class="jianjie">简介:{{ jianjie.description }}...</div>
            </template>
            <div
              ref="title"
              style="padding-right: 20px; background-color: #e9eef3"
            ></div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>

    <el-table
      :data="playlistDetailList"
      stripe
      size="small"
      style="width: 100%"
      @row-dblclick="goPlayMusic"
    >
      <el-table-column type="index" width=""></el-table-column>
      <el-table-column
        prop="name"
        label="歌名"
        width="300"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="singer"
        label="歌手"
        width="280"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="zhuanji"
        label="专辑"
        width="300"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="time" label="时长" width="70"> </el-table-column>
    </el-table>
  </div>
</template> 

<script>
import { mapMutations, mapState } from "vuex";
import time from "@/plugins/time.js";
import router from "@/router";
export default {
  name: "PlaylistDetail",
  data() {
    return {
      playlistDetailList: [],
      jianjie: {},
      loading: true,
      addorcancel: "",
      userId: "",
      isBoutique:true
    };
  },
  computed: {
    ...mapState("collectsong", ["collectSongList"]),
  },
  methods: {
    ...mapMutations("lyric", ["getSongDetail"]),
    ...mapMutations("collectsong", ["addCollectSong", "cancelCollectSong"]),
    async getPlaylistDetail() {
      const res = await this.$API.reqPlaylistDetail(this.$route.params.id);
      if (res.code == 200) {
        this.playlistDetailList = res.playlist.tracks.map((item) => ({
          id: item.id,
          name: item.name,
          al: item.al,
          ar: item.ar,
          dt: item.dt,
          singer: item.ar.map((item) => item.name).join("/"),
          zhuanji: item.al.name,
          time: time.getMsstime(item.dt),
        }));
        this.jianjie = {
          id: res.playlist.id,
          name: res.playlist.name,
          nickname: res.playlist.creator.nickname,
          createTime: time.getCreateTime(res.playlist.createTime),
          playCount: res.playlist.playCount + "次",
          coverImgUrl: res.playlist.coverImgUrl,
          tags: res.playlist.tags.join("/"),
          description: res.playlist.description||''.split("\n")[0],
          title: res.playlist.description||''.replace(/\n/g, "<br/>"),
        };
      }
      this.$refs.title.innerHTML = this.jianjie.title;
      this.loading = false;
    },
    goPlayMusic(item) {
      // this.getSongDetail(item)
      sessionStorage.setItem("songdetailData", JSON.stringify(item));
      // this.$bus.$emit("playmusic", item);
      this.$store.dispatch("player/playMusic", {
        list: this.playlistDetailList,
        id: item.id,
      });
    },
    async goAddSongSheet() {
      if (localStorage.getItem("userinfo") == null) {
        this.$message({
          duration: 0,
          showClose: true,
          message: "还未登录,请登录后再来添加！",
          type: "error",
        });
      } else {
        const res = await this.$API.reqAddOrCancelCollectSong(1,this.$route.params.id);
        if (res.code == 200) {
          this.$message.success({
            message: "收藏歌单成功",
          });
          // this.$store.dispatch('collectsong/getCollectSong',this.userId)
          this.addCollectSong(this.jianjie);
          this.addorcancel = false;
        } else if (res.code == 501) {
        }
      }
    },
    async goCancelSongSheet() {
      this.$confirm("你确定取消收藏此歌单吗?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true,
        showClose:true
      })
        .then(() => {
          this.$API.reqAddOrCancelCollectSong(
            2,
            this.$route.params.id
          ).then((res)=>{
            if (res.code == 200) {
            this.cancelCollectSong(this.jianjie);
            this.addorcancel = true;
            this.$message({
              type: "success",
              message: "歌单取消收藏成功!",
            });
          }
          })
          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消收藏",
          });
        });
      // this.$message.success({
      //   message:'取消添加'
      // })
      // this.$store.dispatch('collectsong/getCollectSong',this.userId)
     
    }, 
    
  },
  watch: {
    collectSongList: {
      immediate: true,
      // deep:true,
      handler(newv) {
        let index = this.collectSongList.findIndex(
          (item) => item.id == this.$route.params.id
        );
        if (index != -1) {
          this.addorcancel = false;
        }
        // if(newv==''&&index!=-1){
        //   this.addorcancel=false
        // }
        // if(newv==''&&index==-1){
        //   this.addorcancel=true
        // }
        else this.addorcancel = true;
      },
    },
  },
  mounted() {
    this.getPlaylistDetail();
    this.userId = JSON.parse(localStorage.getItem("userinfo")).userId;
    // this.$message.success('success')
    // this.$nextTick(()=>{
    //    let index= this.collectSongList.findIndex(item=>item.id==this.$route.params.id)
    //     console.log(index);
    //     if(index!=-1){
    //       this.addorcancel=false
    //     }

    // })
  },
};
</script>

<style lang="less" scoped>
.playlist {
  padding: 25px 0 0px 0px;
  .playlist-header {
    // height: 200px;
    padding: 0 0 20px 0;
    // width: 840px;
    // background-color: rgb(231, 159, 159);
    display: flex;
    img {
      width: 180px;
      height: 180px;
      border-radius: 5px;
      margin: 0;
    }
    .playlist-jianjie {
      margin: 0 0 0 20px;
      display: flex;
      width: 820px;
      flex-direction: column;
      align-items: flex-start;
      align-content: flex-start;
      text-align: left;
      h3{
        span{
          display: inline-block;
          padding: 2px 5px;
          font-size: 13px;
          font-weight: normal;
          border: 1px solid #617dfc;
          color:#617dfc;
          margin-right: 5px;
          // width: 32px;
          // height: 22px;
          text-align: center;
          // transform: scale(.9);
        }
      }
      a {
        margin: 10px 0 10px 0px;

        .goAddSongSheet {
          display: inline-block;
          width: 115px;
          height: 30px;
          border-radius: 30px;
          text-align: center;
          line-height: 30px;
          background-color: #f1f3f4;
          color: #606266;
          text-decoration: none;
          font-size: 16px;
          border: 1px solid rgb(213, 211, 211);
          &:hover {
            background-color: #c1c2c3;
          }
          i {
            font-size: 20px;
            vertical-align: text-bottom;
          }
          &:nth-child(2) {
            width: 120px;
          }
        }
        &:nth-child(2) {
          width: 80px;
          background-color: #a6aaac;
          color: #eaebed;
        }
      }
      p {
        // display: inline-block;
        display: flex;
        align-items: center;
        margin: 4px 0;
        font-size: 14px;
        span {
          color: #606266;
          padding: 0 5px;
        }
        .jianjie {
          width: 780px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      /deep/.el-collapse-item__header {
        background-color: #e9eef3 !important;
        // opacity: 0;
      }
      /deep/ .el-collapse-item__content {
        background-color: #e9eef3 !important;
      }
      .jianjie {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      h3 {
        margin: 0;
      }
    }
  }
}
</style>
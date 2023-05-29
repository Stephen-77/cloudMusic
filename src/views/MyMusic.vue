<template>
  <div class="MyMusic">
    <div class="MyMusic-header">
      <img v-lazy="coverImgUrl" alt="" />
      <div class="MyMusic-jianjie">
        <h2>我喜欢的音乐</h2>
        <p>
          <img :src="userInfo.avatarUrl" alt="" srcset="">
          {{ userInfo.nickname }}
          <!-- <span>{{ jianjie.createTime }}创建</span> -->
        </p>
        <a>
            <a @click="goPlayAllSong" class="goAddSongSheet"><i class="el-icon-caret-right"></i>播放全部 </a>
        </a>
        <p>
          <!-- 标签:<span>{{ jianjie.tags }}</span> -->
        </p>
        <p>
          歌曲:<span>{{myMusicList.length}}</span>
          <!-- </span>播放: <span>{{ jianjie.playCount }} -->
        </p>
      </div>
    </div>
    <el-input v-model="search" placeholder="搜索歌单音乐~" :clearable='true'  prefix-icon="el-icon-search" size="small"></el-input>
    <el-table
      :data="MusicsList"
      stripe
      size="small"
      style="width: 100%"
      @row-dblclick="goPlayMusic"
      empty-text="暂无你要搜的音乐~_~"
    >
    <el-table-column type="index" :index="nindex"></el-table-column>
      <el-table-column
        prop="name"
        label="歌名"
        min-width="31%"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="singer" label="歌手" min-width="29%" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="zhuanji" label="专辑" min-width="31%" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="time" label="时长" min-width="9%"> </el-table-column>
    </el-table>
     <div style="text-align: center">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pagesize"
        @current-change="current_change"
        :current-page.sync="currentPage"
        :total="parseInt(table_length)"
      >
        >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import time from "@/plugins/time.js";
import { mapState } from 'vuex';

export default {
  name: "MyMusic",
  data() {
    return {
      userInfo:{},
      // myMusicList:[],
      search:'',
      musicUrl:'',
      pagesize: 15, //每页多少数据
      currentPage: 1, //默认当前页为第一页
      table_length:''
    }
  },
  computed:{
    ...mapState('mymusic',['myMusicList','coverImgUrl']),
    MusicsList(){
      let search=this.search
      if(search){
        let list=this.myMusicList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())|| data.singer.toLowerCase().includes(search.toLowerCase()));
        let fenye=list.slice((this.currentPage-1)*this.pagesize,this.pagesize*this.currentPage)
        this.table_length=list.length
        return list,fenye
      }
      else{
        this.table_length=this.myMusicList.length
        let fenye=this.myMusicList.slice((this.currentPage-1)*this.pagesize,this.pagesize*this.currentPage)
        return fenye
      }
    },
    
    
  },
  methods: {
    nindex(index){
      return index+1+(this.currentPage-1)*this.pagesize
    }
    ,
     current_change(currentPage) {
      //改变当前页
      this.currentPage = currentPage;
    },
    async getMyMusicList(){
     await this.$API.reqLikeSong(this.userInfo.userId).then((res)=>{
        if(res.code==200){
          const ids=res.ids.join(',')
          this.$API.reqSongDetail(ids).then(res=>{
            if(res.code==200){
              // console.log(res.songs);
              this.myMusicList=res.songs.map(item=>({
                id: item.id,
                name: item.name,
                al: item.al,
                ar: item.ar,
                dt:item.dt,
                singer: item.ar.map((item) => item.name).join("/"),
                zhuanji: item.al.name,
                time: time.getMsstime(item.dt),
                
              }))
            }
          })
        }
      })
      
    },
    goPlayMusic(item){
      this.$store.dispatch('player/playMusic',{list:this.MusicsList,id:item.id})
    },
    goPlayAllSong(){
      this.$store.dispatch('player/playMusic',{list:this.MusicsList,id:this.MusicsList[0].id})

    }
  },
  watch:{
    coverImgUrl(){
      this.$nextTick(()=>{
      this.musicUrl= this.coverImgUrl
    })
    }
  },
  mounted() {
    this.userInfo=JSON.parse(localStorage.getItem('userinfo'))
    // this.getMyMusicList()
  //  this.$store.dispatch('mymusic/getMyMusicList',this.userInfo.userId)
  //  this.$store.dispatch('mymusic/getMyMusicIdList',this.userInfo.userId)
  },

};
</script>
<style lang="less" scoped>
.MyMusic{
  padding: 25px 0 0px 0px;
  .MyMusic-header {
    // height: 200px;
    padding: 0 0 10px 0;
    // width: 840px;
    // background-color: rgb(231, 159, 159);
    display: flex;
    img {
      width: 180px;
      height: 180px;
      border-radius: 5px;
      margin: 0;
    }
    .MyMusic-jianjie {
      margin: 0 0 0 20px;
      display: flex;
      width: 820px;
      flex-direction: column;
      align-items: flex-start;
      align-content: flex-start;
      text-align: left;
      a{
        margin: 5px 0 5px 0px;

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
        }
        &:nth-child(2){
          width: 80px;
          background-color: #a6aaac;
          color: #eaebed;
        }
      }
      p {
        // display: inline-block;
        display: flex;
        align-items: center;
        margin: 4px 0 0 5px;
        font-size: 14px;
        span {
          color: #606266;
          padding: 0 5px;
        }
        img{
          width: 22px;
          height: 22px;
          border-radius: 50%;
          margin-right: 5px;
        }
        .jianjie {
          width: 780px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    
      /deep/.el-collapse-item__header{
        background-color: #e9eef3 !important;
        // opacity: 0;
      }
      /deep/ .el-collapse-item__content{
        background-color: #e9eef3 !important;

      }
      .jianjie {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

      h2 {
        margin: 0 0 15px 0;
      }
    }
     
  }
  /deep/.el-input{
    float: right;
    width: 250px;
  }
   /deep/.el-input--small .el-input__inner{
        border: 1px solid rgb(230, 227, 227);
        // border: none;
      }
}

</style>
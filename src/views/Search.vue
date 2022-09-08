<template>
  <div v-loading="loading" element-loading-text="拼了命加载ing..." element-loading-spinner="el-icon-loading">
    <h3>搜索：{{$route.query.keywords}}</h3>
    <el-table
      :data="
        tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
      "
      
      stripe
      size="small"
      style="width: 100%"
      @row-dblclick="goplayer"
    >
      <el-table-column
        prop="songname"
        label="歌名"
        width="300"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="singer" label="歌手" width="300">
      </el-table-column>
      <el-table-column prop="zhuanji" label="专辑" width="300">
      </el-table-column>
      <el-table-column prop="time" label="时长" width="70">
      </el-table-column>
    </el-table>
    <div style="text-align: center">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pagesize"
        @current-change="current_change"
        :current-page.sync="currentPage"
        :total="tableData.length"
      >
        >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import time from '@/plugins/time'
export default {
  name: "Search",
  data() {
    return {
      //keywords: "",
      tableData: [],
      pagesize: 15, //每页多少数据
      currentPage: 1, //默认当前页为第一页
      loading:true
    };
  },
  methods: {
    current_change(currentPage) {
      //改变当前页
      this.currentPage = currentPage;
    },
    async getSearch() {
      const res = await this.$API.reqSearch(this.$route.query.keywords);
    //   const res = await this.$API.reqSearch(keywords);
      if (res.code == 200) {
        this.tableData = res.result.songs.map((item) => ({
          id: item.id,
          songname: item.name,
          singer: item.artists.map((item) => item.name).join("/"),
          zhuanji: item.album.name,
          time:time.getMsstime(item.duration),
          dt:item.duration,
          al:item.album.artist,
          ar:item.artists,
          name:item.name
        }));
        this.loading=false
      }
    },
    async goplayer(e) {
        const res=await this.$API.reqSongDetail(e.id)
        if(res.code==200){
            sessionStorage.setItem('songdetailData',JSON.stringify(res.songs[0]))
            // this.$bus.$emit('playmusic',res.songs[0])
            this.$store.dispatch('player/playMusic',{list:this.tableData,id:e.id})

        }
    //   console.log(e);
    },
  },
  mounted() {
    this.getSearch();
    // this.$bus.$on("keyword", this.getSearch);
  },
//   watch: {
//     tableData: {
//       immediate: true,
//       handler() {
//         this.$nextTick(() => {});
//       },
//     },
//   },
};
</script>

<style lang="less" scoped>
h3{
    margin: 10px 0px 10px 5px;
    color: #2c3e50;
}
/deep/ .el-pagination.is-background {
    .el-pager li:not(.disabled).active {
    background-color: #ec4141 !important;
    &:hover{
      color: white;
    }
}
.el-pager li:not(.disabled):hover {
    color: #ec4141;

}
}
</style>
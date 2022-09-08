<template>
  <div class="recentlyplayed">
    <h3>
      最近播放<span>共{{ recentlyList.length }}首</span>
    </h3>
    <a @click="goPlayMusic(recentlyList[0])" class="goPlayAllSong">
      <i class="el-icon-caret-right"></i>播放全部
    </a>
    <a class="clear" @click="goClearList">清空列表</a>
    <el-table
      :data="recentlySongList"
      stripe
      size="small"
      style="width: 100%"
      @row-dblclick="goPlayMusic"
      empty-text="当前没有音乐哦"
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

export default {
  name: "RecentlyPlayed",
  data() {
    return {
      recentlySongList: [],
    };
  },
  computed: {
    ...mapState("recentlysong", ["recentlyList"]),
  },
  methods: {
    ...mapMutations("recentlysong",['clearList']),
    goPlayMusic(item) {
      console.log(item);
      // sessionStorage.setItem("songdetailData", JSON.stringify(item));
      this.$store.dispatch("player/playMusic", {
        list: this.recentlyList,
        id: item.id,
      });
    },
    goClearList(){
        this.clearList()
        this.recentlySongList=null
    }
  },
  watch: {
    recentlyList: {
      immediate: true,
      handler(newv) {
        this.recentlySongList = this.recentlyList.map((item) => ({
          id:item.id,
          al:item.al,
          ar:item.ar,
          dt:item.dt,
          name: item.name,
          singer: item.ar.map((item) => item.name).join("/"),
          zhuanji: item.al.name,
          time: time.getMsstime(item.dt),
        }));
      },
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.recentlyplayed {
  margin-top: 20px;
  h3 {
    span {
      font-weight: 400;
      font-size: 13px;
      margin-left: 10px;      
    }
  }
  .goPlayAllSong {
    margin: 20px 0;
    display: inline-block;
    width: 115px;
    height: 30px;
    border-radius: 30px;
    text-align: center;
    line-height: 30px;
    background-color: #fafbfc;
    color: #606266;
    text-decoration: none;
    font-size: 16px;
    border: 1px solid rgb(164, 163, 163);
    &:hover {
      background-color: #e4e1e1;
    }
    i {
      font-size: 20px;
      vertical-align: text-bottom;
    }
  }
  .clear {
    float: right;
    font-size: 14px;
    &:hover{
        color: blue;
    }
  }
}
</style>
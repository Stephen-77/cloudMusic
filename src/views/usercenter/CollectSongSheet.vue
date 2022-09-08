<template>
  <div>
     <ul class="playlist">
      <li v-for="(item, index) in collectSongList.slice(2)" :key="index">
        <a @click="goPlaylistDetail(item.id)">
          <div class="video-playcount">
            <i class="el-icon-video-play"></i>
            <p>{{ getCount(item.playCount) }}</p>
            <!-- <p>{{ parseInt(item.playCount / 10000) }}万</p> -->
          </div>
          <img v-lazy="item.coverImgUrl" alt="" srcset="" />
          <div class="video-bofang bofang-btn">
            <i>
              <img src="../../assets/images/播放.png" alt="" />
            </i>
          </div>
        </a>
        <p>{{ item.name }}</p>
        <p style="color:gray;font-size:12px">{{ item.trackCount }}首</p>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name:'CollectSongSheet',
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState('collectsong',['collectSongList']),

        getCount() {
        return function (index) {
            let count = parseInt(index / 10000);
            if(index<10000){
            return index
            }
            else if (count > 9999) {
            return parseInt(count / 10000) + "亿";
            } else return count + "万";
        };
        },
    },
    methods: {
        goPlaylistDetail(deatailid) {
            this.$router.push({
                name: "playlistdetail",
                params: { id: deatailid },
            });
        },
    },
}
</script>

<style lang="less" scoped>
.playlist {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    li {
      width: 20%;
        margin: 0;
      display: flex;
      flex-direction: column;
      padding-bottom: 20px;
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
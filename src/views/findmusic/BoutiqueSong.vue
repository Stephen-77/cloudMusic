<template>
  <div class="Boutique" @click="show = false">
    <div class="boutique-header">
      <h3>精品歌单</h3>
      <div class="menu-right">
        <a @click.stop="show = !show" class="menu-button"
          ><span ref="showCategoryName"></span>
          <i v-if="show" class="el-icon-caret-bottom"></i>
          <i v-else class="el-icon-caret-right"></i>
        </a>
        <div class="allsongsheet" v-show="show">
          <div class="allsongsheet-header">
            <a>全部歌单</a>
          </div>
          <el-divider></el-divider>
          <div class="allsongsheet-container">
            <div class="floor">
              <div class="container">
                <a
                  v-for="(item, index) in boutiqueTags"
                  :key="index"
                  @click="goBoutique(item.name)"
                >
                  <p
                    :class="[
                      $route.query.categoryname == item.name ? 'checked' : '',
                    ]"
                  >
                    {{ item.name }}
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="boutique-container">
         <ul class="playlist">
            <li v-for="(item, index) in boutiqueDetailList" :key="index">
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
                <div class="playlist-right">
                    <p @click="goPlaylistDetail(item.id)">{{ item.name }}</p>
                    <span>by {{item.creator.nickname}}</span>
                    <span>{{item.copywriter}}</span>
                </div>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "BoutiqueSong",
  data() {
    return {
      show: false,
      boutiqueTags: [],
      boutiqueDetailList:[]
    };
  },
  computed: {
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
    async getBoutiqueTags() {
      const res = await this.$API.reqBoutiqueTags();
      if (res.code == 200) {
        this.boutiqueTags = res.tags;
      }
    },
     async getBoutiqueDetail(){
      let tag=''
      if(this.$route.query.categoryname==null) tag='华语' 
      else tag=this.$route.query.categoryname
      const res=await this.$API.reqBoutiqueDetail(tag,50)
      if(res.code==200){
        this.boutiqueDetailList=res.playlists
        // this.$refs.header.style.backgroud=
      }
    },
    goBoutique(item) {
      let tag = "";
      if (this.$route.query.categoryname == null) tag = "华语";
      else tag = this.$route.query.categoryname;
      this.$router.push({
        name: "boutiquesong",
        query: { categoryname: item },
      });
    },

    goCategory(item) {
      this.$router.push({
        name: "songsheet",
        query: { categoryname: item },
      });
    },
    goPlaylistDetail(deatailid) {
      this.$router.push({
        name: "playlistdetail",
        params: { id: deatailid },
        query:{isBoutique:true}
      });
    },
  },
  mounted() {
    this.getBoutiqueTags();
    this.getBoutiqueDetail()
    this.$refs.showCategoryName.innerHTML=this.$route.query.categoryname?this.$route.query.categoryname:'全部歌单'

  },
};
</script>
<style lang="less" scoped>
.Boutique {
.boutique-header{
    display: flex;
    margin-top: 20px;
    width: 100%;
    justify-content: space-between;
    h3{
        margin: 0;
    }
 .menu-right {
      margin: 0 2px 0 0;
    // width: 400px;
    //   padding-left: 20px;
    position: relative;
    // background-color: rgb(242, 57, 57);;
    .menu-button {
      display: block;
      width: 110px;
      height: 30px;
      margin-left: 1px;
      border: 1px solid gray;
      border-radius: 15px;
      background-color: aliceblue;
      text-decoration: none;
      color: black;
      font-size: 14px;
      text-align: center;
      line-height: 30px;
      &:hover {
        background-color: rgb(242, 239, 239);
      }
    }
    .allsongsheet {
      position: absolute;
      z-index: 9;
      top: 40px;
      right: 0;
      width: 500px;
      height: 400px;
      border-radius: 5px;
      background-color: #ffffff;
      box-shadow: 0 0 5px #bcc0c2;
      a:hover {
        color: red;
      }
      .allsongsheet-header {
        height: 50px;
        line-height: 50px;
        a {
          margin-left: 20px;
          padding: 5px;
          border-radius: 10px;
          font-size: 14px;
          // background-color: rgb(243, 188, 188);
        }
      }
      .allsongsheet-container {
        padding: 10px 0;
        .floor {
          width: 100%;
          display: flex;
          margin-bottom: 10px;
        
          .container {
            flex: 1;
            display: flex;
            flex-wrap: wrap;
            a {
              // flex: 1;
              width: 20%;
              height: 30px;
              line-height: 30px;
              margin: 0 0 20px 0;
              p {
                display: inline-block;
                padding: 0 16px;
                // background-color: aquamarine;
                border-radius: 10px;
                font-size: 14px;
              }
              .hot {
                position: relative;
                &::after {
                  content: "HOT";
                  position: absolute;
                  // width: 10px;
                  height: 10px;
                  top: 0;
                  right: -5px;
                  color: red;
                  font-size: 1px;
                  font-weight: 700;
                  transform: scale(0.6);
                }
              }
            }
          }
        }
      }
      .el-divider--horizontal {
        margin: 2px 0;
      }
    }
     .checked{
      background-color: rgb(255, 232, 232);
      color: red !important;;
     }
  }
}
 .boutique-container{
     .playlist {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    li {
    width: 339px;
      display: flex;
      margin: 0;
      padding-bottom: 20px;
      a {
        text-decoration: none;
        color: white;
        position: relative;

        .video-playcount {
          position: absolute;
          font-size: 14px;
          width: 70px;
          height: 20px;
          top: 5px;
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
          width: 140px;
          height: 140px;
          border-radius: 5px;
        }
      }
      .playlist-right{
        display: flex;
        flex-direction: column;
        justify-content: center;
         p,span {
            width: 174px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
         }
         p{
            font-size: 14px;
            margin: 0 0 10px 0;
            cursor: pointer;
         }
         span{
            font-size: 12px;
            margin: 0 0 10px 0;
            color: #bcc0c2;
            &:nth-child(2){
                color: #7b7c7d;
                margin-bottom: 20px;
            }
         }
      }
     
    }
  }
 }
}
</style>
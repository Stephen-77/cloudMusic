<template>
  <div class="songsheet" @click="show=false"  v-loading="loading" element-loading-text="拼了命加载ing..." element-loading-spinner="el-icon-loading">
    <div class="songsheet-header" ref="header" :style="{'background-image':'url('+boutiqueDetail.coverImgUrl+')','background-position':'center'}" @click="goBoutique">
      <img v-lazy="boutiqueDetail.coverImgUrl" alt="" srcset="">
      <div class="header-r">
          <div>精品歌单</div>
          <p>{{boutiqueDetail.name}}</p>
      </div>
    </div>
    <div class="songsheet-menu" >
      <div class="menu-left">
        <a @click.stop="openAllSongSheet" class="menu-button"
          ><span ref="showCategoryName"></span>
           <i v-if="show" class="el-icon-caret-bottom"></i>
          <i v-else class="el-icon-caret-right"></i>
        </a>
        <div class="allsongsheet" v-show="show">
          <div class="allsongsheet-header">
            <a>{{ categoryHeader.name }}</a>
          </div>
          <el-divider></el-divider>
          <div class="allsongsheet-container">
            <div class="floor">
              <div class="aside">
                <img src="../../assets/icons/language.png" alt="" />
                <span>语种</span>
              </div>
              <div class="container">
                <a v-for="(item, index) in categoryList0" :key="index" @click="goCategory(item.name)">
                  <!-- <p class="hot">{{item.name}}</p> -->
                  <p :class="[item.hot == true ? 'hot' : '',$route.query.categoryname==item.name?'checked':''] ">{{ item.name }}</p>
                </a>
              </div>
            </div>
            <div class="floor">
              <div class="aside">
                <img src="../../assets/icons/fengge.png" alt="" />
                <span>风格</span>
              </div>
              <div class="container">
                <a v-for="(item, index) in categoryList1" :key="index" @click="goCategory(item.name)">
                  <!-- <p class="hot">{{item.name}}</p> -->
                  <p :class="[item.hot == true ? 'hot' : '',$route.query.categoryname==item.name?'checked':''] ">{{ item.name }}</p>
                </a>
              </div>
            </div>
            <div class="floor">
              <div class="aside">
                <img src="../../assets/icons/cahngjing.png" alt="" />
                <span>场景</span>
              </div>
              <div class="container">
                <a v-for="(item, index) in categoryList2" :key="index" @click="goCategory(item.name)">
                  <!-- <p class="hot">{{item.name}}</p> -->
                  <p :class="[item.hot == true ? 'hot' : '',$route.query.categoryname==item.name?'checked':''] ">{{ item.name }}</p>
                </a>
              </div>
            </div>
            <div class="floor">
              <div class="aside">
                <img src="../../assets/icons/smile.png" alt="" />
                <span>情感</span>
              </div>
              <div class="container">
                <a v-for="(item, index) in categoryList3" :key="index" @click="goCategory(item.name)">
                  <!-- <p class="hot">{{item.name}}</p> -->
                  <p :class="[item.hot == true ? 'hot' : '',$route.query.categoryname==item.name?'checked':''] ">{{ item.name }}</p>
                </a>
              </div>
            </div>
            <div class="floor">
              <div class="aside">
                <img src="../../assets/icons/menu.png" alt="" />
                <span>主题</span>
              </div>
              <div class="container">
                <a v-for="(item, index) in categoryList4" :key="index" @click="goCategory(item.name)">
                  <!-- <p class="hot">{{item.name}}</p> -->
                  <p :class="[item.hot == true ? 'hot' : '',$route.query.categoryname==item.name?'checked':''] ">{{ item.name }}</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="menu-right">
        <a
          v-for="(item, index) in menuRight"
          :key="index"
          @click="goCategory(item.name)"
          :class="$route.query.categoryname==item.name?'checked':''"
          >{{ item.name }}</a
        >
      </div>
    </div>
    <ul class="playlist">
      <li v-for="(item, index) in recommendSongSheetList" :key="index">
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
      </li>
    </ul>
  </div>
</template>

<script>
import router from '@/router';
export default {
  name: "SongSheet",
  data() {
    return {
      show: false,
      categoryHeader: {},
      categoryList0: [],
      categoryList1: [],
      categoryList2: [],
      categoryList3: [],
      categoryList4: [],
      menuRight: [
        {
          name: "华语",
        },
        {
          name: "流行",
        },
        {
          name: "摇滚",
        },
        {
          name: "民谣",
        },
        {
          name: "电子",
        },
        {
          name: "另类/独立",
        },
        {
          name: "轻音乐",
        },
        {
          name: "综艺",
        },
        {
          name: "影视原声",
        },
        {
          name: "ACG",
        },
      ],
      recommendSongSheetList: [],
      boutiqueTags:[],
      boutiqueDetail:{},
      seachCategoryName:'',
      loading:true
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
    // showBoutique(){

    //   return this.boutiqueTags.findIndex(item=>item.name==$route.query.categoryname)
    // }
  },
  methods: {
    openAllSongSheet() {
      this.show = !this.show;
    },
    async getSongSheetList() {
      const res = await this.$API.reqSongSheetList();
      if (res.code == 200) {
        this.categoryHeader = res.all;
        this.categoryList0 = res.sub.filter((item) => {
          if (item.category == 0) return item;
        });
        this.categoryList1 = res.sub.filter((item) => {
          if (item.category == 1) return item;
        });
        this.categoryList2 = res.sub.filter((item) => {
          if (item.category == 2) return item;
        });
        this.categoryList3 = res.sub.filter((item) => {
          if (item.category == 3) return item;
        });
        this.categoryList4 = res.sub.filter((item) => {
          if (item.category == 4) return item;
        });
      }
    },
    async getRecommendSongSheetList() {
      // const seachCategoryName=''
      if(!this.$route.query.categoryname) this.seachCategoryName='华语'
      else this.seachCategoryName=this.$route.query.categoryname
      const res = await this.$API.reqSongSheet(this.seachCategoryName);
      // console.log(res);
      if (res.code == 200) {
        this.recommendSongSheetList = res.playlists;
      }
      this.loading = false;
    },
    goPlaylistDetail(deatailid) {
      this.$router.push({
        name: "playlistdetail",
        params: { id: deatailid },
      });
    },
    goCategory(item) {
      this.$router.push({
        name: "songsheet",
        query: { categoryname: item},
      });
      
    },
    goBoutique(){
      let tag=''
      if(this.$route.query.categoryname==null) tag='华语' 
      else tag=this.$route.query.categoryname
       this.$router.push({
        name: "boutiquesong",
        query: { categoryname:tag},
      });
    },
  
    async getBoutiqueDetail(){
      let tag=''
      if(this.$route.query.categoryname==null) tag='华语' 
      else tag=this.$route.query.categoryname
      const res=await this.$API.reqBoutiqueDetail(tag,1)
      if(res.code==200){
        this.boutiqueDetail=res.playlists[0]
        // this.$refs.header.style.backgroud=
      }
    }
  },
  mounted() {
    this.getSongSheetList();
    this.getRecommendSongSheetList();
    this.getBoutiqueDetail()
    this.$refs.showCategoryName.innerHTML=this.$route.query.categoryname?this.$route.query.categoryname:'全部歌单'
  },
};
</script>

<style lang="less" scoped>
.songsheet {
  margin-top: 20px;
  .songsheet-header{
    display: flex;
    padding: 10px 0 10px 20px;
    border-radius:5px ;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    &::after{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
       backdrop-filter: blur(35px);
      // background-color: rgba(255, 255, 255, 0.3);
    }
    img{
      margin: 0;
      width: 130px;
      height: 130px;
      border-radius: 5px;
      z-index: 1;
    }
    .header-r{
      margin: 0 0 0 10px;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      div{
        border: 1px solid #00bfff;
        width: 100px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-radius: 15px;
        margin: 0;
        font-size: 14px;
        color: #00bfff;
        margin-bottom: 10px;
      }
      p{
        color: white;
      }
    }
  }
  .songsheet-menu {
    display: flex;
    height: 35px;
    align-items: center;
    margin-top: 10px;
    // background-color: aqua;
    .menu-left {
      margin: 0;
      width: 400px;
      padding-left: 20px;
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
        z-index: 999;
        top: 40px;
        left: 0;
        width: 810px;
        height: 600px;
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
            .aside {
              margin: 0;
              width: 150px;
              text-align: center;
              img {
                width: 26px;
                height: 26px;
                margin: 4px 0px 0 0;
                // vertical-align: middle;
              }
              span {
                display: block;
                // margin-top:-4px ;
                font-size: 12px;
                color: #909399;
              }
            }
            .container {
              flex: 1;
              display: flex;
              flex-wrap: wrap;
              a {
                // flex: 1;
                width: 16.66666%;
                height: 30px;
                line-height: 30px;
                margin: 0 0 10px 0;
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
    }
    .menu-right {
      flex: 1;
      display: flex;
      a {
        // flex: 1;
        // margin: 0 0 0 20px;
        padding: 5px 5px;
        border-radius: 8px;
        font-size: 14px;
        color: #909399;
        // background-color: rgb(245, 216, 216);
        &:hover{
          color: black;
        }
      }
     
    }
     .checked{
      background-color: rgb(255, 232, 232);
      color: red !important;;
     }
  }
  .playlist {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    li {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding-bottom: 20px;
      margin:0 ;
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
}
</style>
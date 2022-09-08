<template>
  <div class="singer">
    <div class="singer-header">
      <div class="yuzhong">
        <div class="aside">语种:</div>
        <ul class="yz">
          <li v-for="(item, index) in yuzhong" :key="index">
            <!-- <a @click="selectArea(item.area)" :class="[area==item.area?'hightlight':'',area==null&&index==0?'hightlight':'']">{{ item.name }}</a> -->
            <a @click="selectArea(item.area)" :class="[$route.query.area==item.area?'hightlight':'',$route.query.area==null&&index==0?'hightlight':'']">{{ item.name }}</a>

          </li>
        </ul>
      </div>
      <div class="yuzhong">
        <div class="aside">分类:</div>
        <ul class="yz">
          <li v-for="(item, index) in fenlei" :key="index">
            <!-- <a @click="selectType(item.type)" :class="[type==item.type?'hightlight':'',type==null&&index==0?'hightlight':'']">{{ item.name }}</a> -->
            <a @click="selectType(item.type)" :class="[$route.query.type==item.type?'hightlight':'',$route.query.type==null&&index==0?'hightlight':'']">{{ item.name }}</a>
          </li>
        </ul>
      </div>
      <div class="yuzhong">
        <div class="aside">筛选:</div>
        <ul class="yz">
          <li v-for="(item, index) in zimu" :key="index">
            <!-- <a @click="selectInitial(item.initial)" :class="[initial==item.initial?'hightlight':'',initial==null&&index==0?'hightlight':'']">{{ item.name }}</a> -->
            <a @click="selectInitial(item.initial)" :class="[$route.query.initial==item.initial?'hightlight':'',$route.query.initial==null&&index==0?'hightlight':'']">{{ item.name }}</a>

          </li>
        </ul>
      </div>
    </div>
    <div class="singer-container" v-loading="loading" element-loading-text="拼了命加载ing..." element-loading-spinner="el-icon-loading">
      <ul class="container">
        <li v-for="(item, index) in songerList" :key="index">
          <a @click="goSingerDetail(item)">
            <img v-lazy="item.img1v1Url" alt="" />
            <p>{{ item.name }}</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Singer",
  data() {
    return {
      fenlei: [
        {
          name: "全部",
          type: "-1",
        },
        {
          name: "男歌手",
          type: "1",
        },
        {
          name: "女歌手",
          type: "2",
        },
        {
          name: "乐队",
          type: "3",
        },
      ],
      yuzhong: [
        {
          name: "全部",
          area: "-1",
        },
        {
          name: "华语",
          area: "7",
        },
        {
          name: "欧美",
          area: "96",
        },
        {
          name: "日本",
          area: "8",
        },
        {
          name: "韩国",
          area: "16",
        },
        {
          name: "其他",
          area: "0",
        },
      ],
      zimu: [
        {
          name: "热门",
          initial: "-1",
        },
        {
          name: "A",
          initial: "a",
        },
        {
          name: "B",
          initial: "b",
        },
        {
          name: "C",
          initial: "c",
        },
        {
          name: "D",
          initial: "d",
        },
        {
          name: "E",
          initial: "e",
        },
        {
          name: "F",
          initial: "f",
        },
        {
          name: "G",
          initial: "g",
        },
        {
          name: "H",
          initial: "h",
        },
        {
          name: "I",
          initial: "i",
        },
        {
          name: "J",
          initial: "j",
        },
        {
          name: "K",
          initial: "k",
        },
        {
          name: "L",
          initial: "l",
        },
        {
          name: "M",
          initial: "m",
        },
        {
          name: "N",
          initial: "n",
        },
        {
          name: "O",
          initial: "o",
        },
        {
          name: "P",
          initial: "p",
        },
        {
          name: "Q",
          initial: "q",
        },
        {
          name: "R",
          initial: "r",
        },
        {
          name: "S",
          initial: "s",
        },
        {
          name: "T",
          initial: "t",
        },
        {
          name: "U",
          initial: "u",
        },
        {
          name: "V",
          initial: "v",
        },
        {
          name: "W",
          initial: "w",
        },
        {
          name: "X",
          initial: "x",
        },
        {
          name: "Y",
          initial: "y",
        },
        {
          name: "Z",
          initial: "z",
        },
      ],
      t: "-1",
      i: "-1",
      a: "-1",
      // offset:
      songerList: [],
      loading:true,
      isloading:false,
      page:1,
      o:0
    };
  },
  methods: {
    async getSingerList(offset) {
      // this.loading=true
      if (this.$route.query.type) this.t =this.$route.query.type;
      if (this.$route.query.area) this.a =this.$route.query.area;
      if (this.$route.query.initial) this.i =this.$route.query.initial;
      if(offset==null) this.o=0
      else this.o=offset
      const res = await this.$API.reqSingerCategory(
        this.t,
        this.a,
        this.i,
        this.o
      );
      if (res.code == 200) {
        this.songerList.push(...res.artists);
        
      }
      this.isloading=false
      this.loading=false
    },
    goSingerDetail(item){
       sessionStorage.setItem('singerdetail',JSON.stringify(item))
      this.$router.push({
        name:"singerdetail",
        query:{
          singerid:item.id
        }
      })
      // this.$bus.$emit('singerdetail',item)
      
    }   ,
    selectArea(item){
      this.$router.push({
        name:'singer',
        query:{type:this.$route.query.type,area:item,initial:this.$route.query.initial}
      })
    },
    selectType(item){
      this.$router.push({
        name:'singer',
        query:{
          type:item,
          area:this.$route.query.area,
          initial:this.$route.query.initial
        }
      })
    },
    selectInitial(item){
      this.$router.push({
        name:'singer',
        query:{
          type:this.$route.query.type,
          area:this.$route.query.area,
          initial:item
        }
      })
    },
    scrollHandler(){
      if(this.isloading) return
      this.page=this.page+1
      this.isloading=true
      this.getSingerList((this.page-1)*30)
    
    }
  },
  mounted() {
    this.getSingerList();
    this.$bus.$on('loading',this.scrollHandler)
  },
  watch:{
    type(newvalue){
      console.log(newvalue);
      // this.getSingerList(newvalue)
    }
  },
};
</script>

<style lang="less" scoped>
.singer {
  height: 100%;
  .singer-header {
    margin-top: 10px;

    .yuzhong {
      display: flex;
      // background-color: rgb(210, 157, 157);
      .aside {
        width: 50px;
        margin: 7px 0;
        font-size: 14px;
        text-align: center;
      }
      .yz {
        display: flex;
        width: 100%;
        margin: 0;
        flex-wrap: wrap;
        li {
          margin: 0 0 5px 0;
          width: 65px;
          height: 30px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          &::after {
            content: "|";
            color: #d4d2d2;
            position: absolute;
            top: 50%;
            right: 0;
            font-size: 8px;
            transform: translateY(-50%);
          }
          a {
            font-size: 14px;
            margin: 0;
            padding: 5px 10px;
            color: #909399;
            // background-color: aqua;
            border-radius: 10px;
            &:hover {
              color: black;
            }
          }
          .hightlight{
            background-color: #f8d7d7 !important;
            color: red !important;
          }
        }
      }
    }
  }
  .singer-container {
    // display: flex;
    margin-top: 10px;
    width: 100%;
    .container {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      li {
        width: 16.66%;
        padding: 14px 0 0 0;
        a {
          display: flex;
          flex-direction: column;
          padding: 0 15px 0 0;
          img {
            width: 100%;
            height: 150px;
            border-radius: 5px;
          }
          p {
            font-size: 14px;
            margin: 5px 0 0 0;
          }
        }
      }
    }
  }
}
</style>
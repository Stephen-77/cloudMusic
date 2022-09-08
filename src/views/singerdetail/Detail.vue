<template>
  <div class="detail" >
    <p ref="detail" v-for="item,index in singerdetail" :key="index">{{item}}</p>
  </div>
</template>

<script>
export default {
    name:'Detail',
    data() {
        return {
            singerdetail:[]
        } 
    },
    methods: {
      async getDetail(){
        const res=await this.$API.reqSingerDetail(this.$route.query.singerid)
        if(res.code==200){
         this.singerdetail=res.data.artist.briefDesc.split('\n')
          // this.$refs.detail.innerHTML=res.data.artist.briefDesc.replace(/\n/g,'<br/>')
        }
      }
    },
    mounted() {
        this.getDetail()
    },
}
</script>

<style lang="less" scoped>
.detail{
  width: 100%;
  font-size: 15px;
  margin-top:10px ;
  p{
    color: #606266;
    width: 95%;
    text-indent: 32px;
    letter-spacing: 1px;
    margin-bottom: 5px;
    line-height: 30px;
  }
}
</style>
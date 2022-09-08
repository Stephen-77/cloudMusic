<template>
  <div class="login-qr">
    <p>打开<span>网易云手机端</span>扫码登录</p>
    <img :src="imgurl" alt="" srcset="">
    <div class="zhezhao" v-show="refresh" @click="getUpdateKey">
      <i class="el-icon-refresh-right"></i>
    </div>
    <p>状态:
      <span style="margin-left:6px">{{state}}</span>
    </p>

  </div>
</template>

<script>
import router from '@/router'
// const base64='data:image/png;base64,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'

export default {
    name:"LoginByQr",
    data() {
        return {
            refresh:false,
            // base64:'',
            qrkey:'',
            state:'等待扫码',
            imgurl:[]
        }
    },
    methods: {
      async getKey(){
        const res=await this.$API.reqGetQrKey()
        if(res.code==200){
          this.qrkey=res.data.unikey
          const result=await this.$API.reqCreateQr(res.data.unikey)
          if(result.code==200){
            this.imgurl='data:image/png;base64,'+result.data.qrimg.split(',')[1]
            this.checkKey()
          }
          else{
            this.$message.info({message:'二维码生成失败！'})
          }
        }
        else{
          this.$message.info({message:'请求报错！'})
        }
      },
      async checkKey(){
        // let that=this
           const res=await this.$API.reqCheckQr(this.qrkey)
            if(res.code==800) {
              this.refresh=true
              this.state=res.message
            }
            //800 为二维码过期 801 为等待扫码,802 为待确认,803 为授权登录成功(
            else if(res.code==801||res.code==802){
              this.state=res.message
              this.timer=window.setTimeout(async()=>{
                this.checkKey()
              },5000)
            }
            else if(res.code==803){
              this.state=res.message
              await this.$store.dispatch('login/userInfo').then(res=>{
                this.$bus.$emit('updateAvatar','')
                this.$bus.$emit('aboutUserAllInfo','')
                this.$router.push({name:'center'})
              })
            }       
      },
      async getUpdateKey(){
        await this.getKey()
        this.refresh=false
      }
    },
    beforeDestroy(){
      window.clearTimeout(this.timer)
    },
    mounted() {
      this.getKey()
    },
}
</script>
<style lang="less" scoped>
.login-qr{
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  height: 220px;
  p{
    span{
      color: #7c7cef;
    }
    margin-top: 5px;
    font-size: 12px;
  }
  img{
    margin-top: 10px;
    width: 150px;
    height: 150px;
  }
  .zhezhao{
    position: absolute;
    top:30px;
    width: 150px;
    height: 153px;
    text-align: center;
    cursor: pointer;
    background-color: rgb(139, 137, 137);
    opacity: .7;
    i{
      color: red;
      font-size: 20px;
      font-weight: 700;
      line-height: 153px;
    }
  }
}
</style>
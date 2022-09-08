<template>
  <div class="EditUser">
    <h3>编辑个人信息</h3>
    <div class="EditUser-left">
      <ul>
        <li>
          <span>昵称:</span>
          <!-- <el-select
            v-model="value"
            filterable
            clearable
            remote
            reserve-keyword
            placeholder="请输入你的昵称"
            :remote-method="remoteMethod"
            :loading="loading"
            size="small"
          >
            <el-option
              v-for="(item, index) in repeatNickNameList"
              :key="index"
              :label="item.label"
              :value="item.value"
                :disabled="item.disabled"

            >
            </el-option>
          </el-select> -->
          <el-autocomplete
            v-model="nickname"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            clearable
            show-word-limit
            ></el-autocomplete>
        </li>
        <li>
          <span>介绍:</span>
          <el-input
            v-model="signature"
            placeholder="请输入你的介绍"
            type="textarea"
            maxlength="300"
            show-word-limit
          ></el-input>
        </li>
        <li>
          <span>性别:</span>
          <el-radio-group v-model="gender">
            <el-radio :label="0">保密</el-radio>
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </li>
        <li>
            <span>生日:</span>
             <el-select v-model="year" clearable value-key placeholder="请选择">
                <el-option
                v-for="item in yearlist"
                :key="item.value"
                :value="item.value">
                </el-option>
            </el-select>
             <el-select v-model="month" clearable value-key placeholder="请选择">
                <el-option
                v-for="item in monthlist"
                :key="item.value"
                :value="item.value">
                </el-option>
            </el-select>
             <el-select v-model="day" clearable value-key placeholder="请选择">
                <el-option
                v-for="item in daylist"
                :key="item.value"
                :value="item.value">
                </el-option>
            </el-select>
        </li>
        <li>
            <span></span>
            <el-button type="info" round size="small" style="width:90px" @click="updateUserInfo">保存</el-button>
            <el-button round size="small" style="width:90px" @click="$router.push({name:'usercenter'})">取消</el-button>
        </li>
      </ul>
    </div>
    <div class="EditUser-right">
        <img :src="imgurl" alt="" srcset="">
        <el-button size="small" round style="width: 90px;margin-top:20px" @click="dialogVisible=true">修改头像</el-button>
    </div>
    <el-dialog
      title="修改头像"
      :visible.sync="dialogVisible"
      width="width"
      center
    >
      <div class="cropper-content">
        <div class="cropper-box">
          <div class="cropper">
            <vue-cropper
              ref="cropper"
              :img="option.img"
              :outputSize="option.outputSize"
              :outputType="option.outputType"
              :info="option.info"
              :canScale="option.canScale"
              :autoCrop="option.autoCrop"
              :autoCropWidth="option.autoCropWidth"
              :autoCropHeight="option.autoCropHeight"
              :fixed="option.fixed"
              :fixedNumber="option.fixedNumber"
              :full="option.full"
              :fixedBox="option.fixedBox"
              :canMove="option.canMove"
              :canMoveBox="option.canMoveBox"
              :original="option.original"
              :centerBox="option.centerBox"
              :height="option.height"
              :infoTrue="option.infoTrue"
              :maxImgSize="option.maxImgSize"
              :enlarge="option.enlarge"
              :mode="option.mode"
              @realTime="realTime"
              @imgLoad="imgLoad"
            >
            </vue-cropper>
          </div>
          <!--底部操作工具按钮-->
          <div class="footer-btn">
            <div class="scope-btn">
              <el-button
                size="mini"
                type="info"
                circle
                icon="el-icon-zoom-in"
                @click="changeScale(1)"
              ></el-button>
              <el-button
                size="mini"
                type="info"
                circle
                icon="el-icon-zoom-out"
                @click="changeScale(-1)"
              ></el-button>
              <el-button
                size="mini"
                type="info"
                circle
                icon="el-icon-refresh-left"
                @click="rotateLeft"
              ></el-button>
              <el-button
                size="mini"
                type="info"
                circle
                icon="el-icon-refresh-right"
                @click="rotateRight"
              ></el-button>
            </div>
            <!-- <div class="upload-btn">
          <el-button size="mini"  round @click="uploadImg('blob')">上传封面 <i class="el-icon-upload"></i></el-button>
        </div> -->
          </div>
        </div>
        <!--预览效果图-->
        <div class="show-preview">
          <div :style="previews.div" class="preview">
            <img :src="previews.url" :style="previews.img" />
          </div>
          <p>预览图</p>
        </div>
      </div>
      <div slot="footer" class="footer">
        <label class="btn" for="uploads">选择封面</label>
        <input
          type="file"
          id="uploads"
          style="display: none"
          accept="image/png, image/jpeg, image/gif, image/jpg"
          @change="selectImg($event)"
        />
        <el-button type="info" size="small" @click="uploadImg('blob')"
          >确认修改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { VueCropper } from "vue-cropper";
import { mapState } from "vuex";
import store from '@/store';
export default {
  name: "EditUser",
  components: {
    VueCropper,
  },
  // props:['Name'],
  data() {
    return {
      dialogVisible: false,
      name: this.Name,
      previews: {},
      option: {
        img: "", //裁剪图片的地址
        outputSize: 1, //裁剪生成图片的质量(可选0.1 - 1)
        outputType: "jpeg", //裁剪生成图片的格式（jpeg || png || webp）
        info: true, //图片大小信息
        canScale: true, //图片是否允许滚轮缩放
        autoCrop: true, //是否默认生成截图框
        autoCropWidth: 150, //默认生成截图框宽度
        autoCropHeight: 150, //默认生成截图框高度
        fixed: true, //是否开启截图框宽高固定比例
        // fixedNumber: [1.53, 1], //截图框的宽高比例
        full: false, //false按原比例裁切图片，不失真
        fixedBox: true, //固定截图框大小，不允许改变
        canMove: false, //上传图片是否可以移动
        canMoveBox: true, //截图框能否拖动
        original: false, //上传图片按照原始比例渲染
        centerBox: true, //截图框是否被限制在图片里面
        height: true, //是否按照设备的dpr 输出等比例图片
        infoTrue: true, //true为展示真实输出图片宽高，false展示看到的截图框宽高
        maxImgSize: 3000, //限制图片最大宽度和高度
        enlarge: 1, //图片根据截图框输出比例倍数
        mode: "230px 150px", //图片默认渲染方式
      },
      value1: "",
      nicknameList: [],
    //   loading: false,
      timer: null,
      nickname: '',
      signature: "",
      gender: 0,
      ing:false,
      imgurl:'',
      yearlist:[{
          value: '2022年',
        }, {
          value: '2021年',
        }, {
          value: '2020年',
        }, {
          value: '2019年',
        }, {
          value: '2018年',
        }],
        monthlist:[{value: '1月'},{value: '2月'},{value: '3月'},{value: '4月'},
            {value: '5月'},{value: '6月'},{value: '7月'},{value: '8月'},{value: '9月'},
            {value: '10月'},{value: '11月'},{value: '12月'},],
      daylist:[{value: '1日'},{value: '2日'},{value: '3日'},{value: '4日'},
        {value: '5日'},{value: '6日'},{value: '7日'},{value: '8日'},{value: '9日'},
        {value: '10日'},{value: '11日'},{value: '12日'},{value: '13日'},{value: '14日'},
        {value: '15日'},{value: '16日'},{value: '17日'},{value: '18日'},{value: '19日'},
        {value: '20日'},{value: '21日'},{value: '22日'},{value: '23日'},{value: '24日'},
        {value: '25日'},{value: '26日'},{value: '27日'},{value: '28日'},{value: '29日'},
        {value: '30日'},{value: '31日'}],
        year:'',
        month:'',
        day:'',
        // birthday:''

    };
  },
  computed: {
    ...mapState("userinfo", ["userInfo",'repeatNickNameList','loading']),
    getBirthday(){
        return function(){
            const y=this.year.slice(0,-1)
            const m=this.month.slice(0,-1)
            const d=this.day.slice(0,-1)
            const date=[y,m,d]
            return Date.parse(date.join('/')) //返回当前时间的事件戳
        }
      
    }
  },
  methods: {
    // remoteMethod(query) {
    //   if (query !== "") { 
    //     // this.loading = true;
    //     this.$store.commit('userinfo/setLoadingType',true)
    //     //   setTimeout(() => {
    //     //     this.loading = false;
    //     //     this.options = this.list.filter(item => {
    //     //       return item.label.toLowerCase()
    //     //         .indexOf(query.toLowerCase()) > -1;
    //     //     });
    //     //   }, 200);
    //     clearTimeout(this.timer);
    //     this.timer = null;
    //     let that = this;
    //     this.timer = setTimeout(function () {
    //       // async()=>{
    //     //   const res = that.$API.reqRepeatNickName(query);
    //     //   if (res.code == 200) {
    //     //     if (res.duplicated) {
    //     //       const list = res.candidateNicknames.map((item) => {
    //     //         return { value: `${item}`, label: `${item}` };
    //     //       });
    //     //       console.log(list);
    //     //       that.nicknameList = ["你的昵称已被注册", "推荐以下...", ...list];
    //     //     } else {
    //     //       that.nicknameList = ["该昵称可用!"];
    //     //     }
    //     //     that.loading = false;
    //     //   }
    //     //   else if(res.code==401){
    //     //     that.$message.warning({
    //     //         message:'该昵称不符合规范！'
    //     //     })
    //     //   }
    //         that.$store.dispatch('userinfo/getRepeatNickName',query)
    //       // }
    //     }, 2000);
    //   } else {
    //     this.nicknameList = [];
    //   }
    // },

    //初始化函数
    querySearchAsync(queryString, cb) {
       if(this.ing||!queryString) return
        clearTimeout(this.timer);
        this.timer=null
        let that=this
        this.timer = setTimeout(() => {
            this.ing=true
            that.$store.dispatch('userinfo/getRepeatNickName',queryString).then(res=>cb(this.repeatNickNameList))  
            this.ing=false
        }, 1000);
      },
    async updateUserInfo(){
        if(!(this.nickname&&this.signature&&this.year&&this.month&&this.day))
        {
             this.$notify({
                title:'保存失败！',
                message:'请检查你的信息里是否有空!',
                type:'warning'
            })
        }
        else{
            const birthday= this.getBirthday()
            const res=await this.$API.reqUpdateUserInfo(this.nickname,this.gender,this.signature,birthday);
            console.log(res);
            if(res.code==200){
                this.$message.success({
                    message:'保存成功！'
                })
                this.$router.push({
                    name:'usercenter'
                })
            }
        }
    },
    imgLoad(msg) {
      console.log("工具初始化函数=====" + msg);
    },
    //图片缩放
    changeScale(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    //向左旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    //向右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    //实时预览函数
    realTime(data) {
      this.previews = data;
    },
    //选择图片
    selectImg(e) {
      let file = e.target.files[0];
      if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)) {
        this.$message({
          message: "图片类型要求：jpeg、jpg、png",
          type: "error",
        });
        return false;
      }
      //转化为blob
      let reader = new FileReader();
      reader.onload = (e) => {
        let data;
        if (typeof e.target.result === "object") {
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        this.option.img = data;
      };
      //转化为base64
      reader.readAsDataURL(file);
    },
    //上传图片
    uploadImg(type) {
      let _this = this;
      if (type === "blob") {
        //获取截图的blob数据
        this.$refs.cropper.getCropBlob(async (data) => {
          let formData = new FormData();
          formData.append("imgFile",data);
          //调用axios上传
          let res = await _this.$API.reqUpdateAvatar(formData);
          console.log(res);
          if (res.code === 200) {
            _this.$message.success({
              message: '修改头像成功',
            });
            _this.imgurl=res.data.url
            _this.dialogVisible=false
            const local = JSON.parse(localStorage.getItem("userinfo"))
            local.avatarUrl = res.data.url;

            localStorage.setItem("userinfo", JSON.stringify(local));
            _this.$bus.$emit('updateAvatar','')
          } else {
            _this.$message({
              message: "文件服务异常，请联系管理员！",
              type: "error",
            });
          }
        });
      }
    },
  },
  watch:{
   
  },
  mounted() {
   this.$nextTick(()=>{
        this.nickname = this.userInfo.profile.nickname;
        this.signature = this.userInfo.profile.signature;
        this.gender = this.userInfo.profile.gender;
        this.imgurl=this.userInfo.profile.avatarUrl
        var date = new Date(this.userInfo.profile.birthday); // 时间戳若为13位则不需要乘1000
        this.year= date.getFullYear()+'年';
        this.month= (date.getMonth()+1)+'月';
        this.day= date.getDate()+'日';
   })
  },
};
</script>

<style scoped lang="scss">
.EditUser {
  padding: 20px 0 0 0;
  display: flex;
  flex-wrap: wrap;
  h3 {
    width: 100%;
  }
  .EditUser-left {
    width: 50%;
    margin: 10px 0 0 0;
    ul {
      display: flex;
      flex-direction: column;
      li {
        display: flex;
        margin: 10px 0;
        span {
          width: 80px;
          margin: 0;
        }
        .el-select {
            margin: 0 10px 0 0;
          width: 100px;
        }
        .el-autocomplete{
            margin: 0;
            width: 400px;
        }
        .el-textarea{
            margin: 0;
            width: 400px;
        }
        /deep/.el-radio-group {
          margin: 0;
          .el-radio__input.is-checked .el-radio__inner {
            border-color: #9da0a1 !important;
            background: #929497 !important;
          }
          .el-radio__input.is-checked + .el-radio__label {
            color: black;
          }
        }
      }
    }
  }
  .EditUser-right{
    margin: 10px 0 0 0;
    padding-left: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
        width: 150px;
        height: 150px;
        border-radius: 10px;
    }
  }
  .cropper-content {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    .cropper-box {
      // flex: 1;
      width: 300px;
      height: 300px;
      margin: 0;

      .cropper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 200px;
        // background-color: #fff;
        .vue-cropper {
          /deep/ .cropper-crop-box {
            margin: 0 !important;
          }
        }
      }
    }

    .show-preview {
      // flex: 1;
      // -webkit-flex: 1;
      // display: flex;
      // display: -webkit-flex;
      // justify-content: center;
      margin: 0;
      width: 200px;
      display: flex;
      flex-direction: column;
      .preview {
        border-radius: 5px;
        transform: scale(0.8);
        overflow: hidden;
        background: #cccccc;
      }
    }
  }
  .footer-btn {
    margin-top: 30px;
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    .scope-btn {
      display: flex;
      display: -webkit-flex;
      // justify-content: space-between;
      padding-right: 10px;
    }
    .upload-btn {
      flex: 1;
      -webkit-flex: 1;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
    }
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
    .btn {
      display: inline-block;
      width: 80px;
      height: 32px;
      margin: 0;
      background-color: rgb(184, 182, 182);
      border-radius: 3px;
      line-height: 32px;
      font-size: 14px;
      color: #646668;
    }
  }
  .el-dialog--center .el-dialog__body {
    text-align: initial;
    padding: 25px 25px 0px;
  }
}
</style>


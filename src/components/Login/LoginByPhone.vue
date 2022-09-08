<template>
  <div class="login-phone login">
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-form-item :label-width="formLabelWidth" prop="phone">
        <el-input
          v-model="form.phone"
          autocomplete="off"
          style="width: 230px"
          prefix-icon="el-icon-mobile-phone"   
          placeholder="输入手机号"       
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item  :label-width="formLabelWidth" prop="password">
        <el-input
          v-model="form.password"
          autocomplete="off"
          style="width: 230px"
          type="password"
          :show-password="true"
          prefix-icon="el-icon-key"          
          placeholder="输入密码"
          clearable
        ></el-input>
      </el-form-item>
      
    </el-form>
  </div>
</template>

<script>
var checkPhone = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入手机号！"));
  }
  setTimeout(() => {
    var isPhone = /^1[3456789]\d{9}$/; //手机号码
    if (!isPhone.test(value)) {
      callback(new Error("请输入正确的手机格式！"));
    } else callback();
  }, 500);
};
var checkPass = (rule, value, callback) => {
  console.log(value);
  if (value === "") {
    callback(new Error("请输入密码！"));
  } else {
    callback();
  }
};
export default {
  name: "LoginByPhone",
  data() {
    return {
      form: {
        phone: "",
        password: "",
      },
      rules: {
        password: [{ validator: checkPass, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }],
      },
      formLabelWidth: "0px",
    };
  },
  methods: {
    goHomePage() {},
    submit() {
       this.$refs.ruleForm.validate(async (valid) => {
          if (valid) {
               await this.$store.dispatch("login/userlogin", {
                phone: this.form.phone,
                pass: this.form.password,
              }).then(res=>{
                 this.$bus.$emit('updateAvatar','')
                this.$bus.$emit('aboutUserAllInfo','')
                this.$router.push({name:'center'})
              },err=>{
                
              });
            // alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      
    },
  },
};
</script>

<style>
</style>
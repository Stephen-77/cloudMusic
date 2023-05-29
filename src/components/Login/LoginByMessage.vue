<template>
  <div class="login-message login">
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
      <el-form-item :label-width="formLabelWidth" prop="captcha">
        <el-input
          v-model="form.captcha"
          autocomplete="off"
          style="width: 130px"
          prefix-icon="el-icon-key"
          placeholder="验证码"
        ></el-input>
        <button class="btn_message" ref="message" @click.prevent="getMessage">
          获取验证码
        </button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
var checkPhone = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入手机号！"))
  }
  setTimeout(() => {
    var isPhone = /^1[3456789]\d{9}$/ //手机号码
    if (!isPhone.test(value)) {
      callback(new Error("请输入正确的手机格式！"))
    } else callback()
  }, 500)
}
var checkCaptcha = (rule, value, callback) => {
  console.log(value)
  if (!value) {
    return callback(new Error('验证码不能为空！'))
  }
  else if (isNaN(value)) {
    callback(new Error('请输入数字值！'))
  }
  else {
    if (value.length > 4) {
      callback(new Error('不能超过4位数！'))
    } else {
      callback()
    }
  }
}
export default {
  name: "LoginByMessage",
  data () {
    return {
      form: {
        phone: "",
        captcha: "",
      },
      rules: {
        phone: [{ validator: checkPhone, trigger: "blur" }],
        captcha: [{ validator: checkCaptcha, trigger: 'blur' }]
      },
      formLabelWidth: "0px",
    }
  },
  methods: {
    goHomePage () { },
    submit () {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const res = await this.$API.reqCheckMessage(this.form.phone, this.form.captcha)
          if (res.code == 200) {
            this.$message.success({ message: '登陆成功！' })
            await this.$store.dispatch('login/userInfo').then(res => {
              this.$bus.$emit('updateAvatar', '')
              this.$bus.$emit('aboutUserAllInfo', '')
              this.$router.push({ name: 'center' })
            })
          }
          // alert('submit!');
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async getMessage (e) {

      let time = 60
      var isPhone = /^1[3456789]\d{9}$/ //手机号码
      if (!this.form.phone) return false
      else if (!isPhone.test(this.form.phone)) return false
      const res = await this.$API.reqGetMessage(this.form.phone)
      if (res.code == 200) {
        this.$message.success({ message: '验证码已发送！请注意查收' })
        const timer = setInterval(() => {
          this.$refs.message.disabled = true

          if (time == 0) {
            clearInterval(timer)
            this.$refs.message.innerHTML = '获取验证码'
            this.$refs.message.disabled = false
          }
          else {
            this.$refs.message.innerHTML = time + 's'
            time--
            this.$refs.message.disabled = true
          }
        }, 1000)
        return true
      }
      else {
        this.$message.error({ message: '请求失败!' })
      }

    }
  },
};
</script>
<style lang="less" scoped>
.login-message {
  .btn_message {
    cursor: pointer;
    margin-left: 10px;
    width: 90px;
    height: 32px;
    border: 0;
    outline: 0;
    border-radius: 2px;
    background-color: rgb(242, 238, 238);
  }
}
</style>
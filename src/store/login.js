import { getUserInfo, reqCheckMessage, reqGetMessage, reqLogin } from "@/api";
const actions = {
  async userlogin(context, { phone, pass }) {
    const res = await reqLogin(phone, pass);
    // console.log(context);
    console.log(res);
    if (res.code == 200) {
      localStorage.setItem("token", JSON.stringify(res.token));
      localStorage.setItem("userinfo", JSON.stringify(res.profile));
      context.commit("GETUSERLOGIN", res);
    } else if (res.code == 502) {
      // return Promise.reject(new Error('fail'))
      this._vm.$notify.error({
        title: "错误",
        message: "账号或者密码错误",
        duration: 0
      });
      return Promise.reject(new Error('faile'))
    }
    else return Promise.reject(new Error('faile'))
  },
  async userInfo({commit}){
    const res=await getUserInfo()
    if(res.code==200){
      localStorage.setItem("userinfo", JSON.stringify(res.profile));
    }
  }
};
const mutations = {
  GETUSERLOGIN(state, userinfo) {
    state.userinfo = userinfo;
  },
};
const state = {
  userinfo: {},
};
const getters = {};
export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};

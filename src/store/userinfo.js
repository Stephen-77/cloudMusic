import { reqUserInfo, reqRepeatNickName } from "@/api";
const actions = {
  async getUserDetail({ commit }, userId) {
    const res = await reqUserInfo(userId);
    if (res.code == 200) {
      commit("setUserInfo", res);
    } else if (res.code == 502) {
      this._vm.$notify.error({
        title: "错误",
        message: "未知错误",
        duration: 0,
      });
    }
  },
  async getRepeatNickName({ commit }, nickname) {
    const nicknameList = [];
    const res = await reqRepeatNickName(nickname);

    if (res.code == 200) {
      if (res.duplicated) {
        const list = res.candidateNicknames.map((item) => {
          return { value: `${item}`, label: `${item}` };
        });
        // nicknameList = [...list];
        // commit('setRepeatNickNameList',[{value:'该昵称已被注册占用!..推荐以下',disabled:true},...list])
       
        this._vm.$message.error({
            message:'该昵称已被注册占用'
        })
        commit('setRepeatNickNameList',[...list])
        // {'你的昵称已被注册'},'推荐以下...',
      } else {
        this._vm.$message.success({
            message:'该昵称可用'
        })
        commit('setRepeatNickNameList',[''])
      }
      this.loading = false;
      commit('setLoadingType',false)
    }
    else if(res.code==400){
        this._vm.$message.warning({
                message:'该昵称不符合规范！'
            })
          }
  },
};
const mutations = {
  setUserInfo(state, userinfo) {
    state.userInfo = userinfo;
  },
  setLoadingType(state, type) {
    state.loading=type
  },
  setRepeatNickNameList(state, list) {
    state.repeatNickNameList=list
  },
};
const state = {
  loading: true,
  userInfo: {},
  repeatNickNameList:[]
};
const getters = {};
export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};

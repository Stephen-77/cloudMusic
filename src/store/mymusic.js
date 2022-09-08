import { reqLikeSong, reqSongDetail,reqPlaylistDetail, reqCollectSong} from "@/api";
import time from "@/plugins/time";
const actions = {
  async getMyMusicList({ commit }, userid) {
    await reqCollectSong(userid+'&limit=1').then((res) => {
      if (res.code == 200) {
        reqPlaylistDetail(res.playlist[0].id).then((res) => {
          if (res.code == 200) {
            // console.log(res.songs);
            commit('setCoverImgUrl',res.playlist.coverImgUrl)
            commit("setMyMusicList", res.playlist.tracks);
            // this.myMusicList = res.songs
          }
        });
      }
    });
  },
  async getMyMusicIdList({commit},userid) {
    await reqLikeSong(userid).then((res) => {
      if (res.code == 200) {
        commit('setMyMusicIdList',res.ids)
      }
    });
  },
};

const mutations = {
  setMyMusicList(state, list) {
    state.myMusicList = list.map((item) => ({
      id: item.id,
      name: item.name,
      al: item.al,
      ar: item.ar,
      dt: item.dt,
      singer: item.ar.map((item) => item.name).join("/"),
      zhuanji: item.al.name,
      time: time.getMsstime(item.dt),
    }));
  },
  setMyMusicIdList(state,list){
    state.myMusicIdList=list
  },
  setCoverImgUrl(state,url){
    state.coverImgUrl=url
  },
  addMylikeMusic(state,list){
     state.myMusicList.unshift(list)
     state.myMusicIdList.unshift(list.id)
  },
  cancelMyLikeMusic(state,musicid){
    state.myMusicList=state.myMusicList.filter(item=>item.id!=musicid)
    state.myMusicIdList=state.myMusicIdList.filter(item=>item!=musicid)
  }
};
const state = {
  coverImgUrl:'',
  myMusicIdList: [],
  myMusicList: [],
};
const getters = {};
export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};

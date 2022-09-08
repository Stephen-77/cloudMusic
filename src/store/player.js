const actions = {
  /* music */
  playMusic({ commit }, payload) {
    /* payload :{list,id} */
    commit("setMusicList", payload.list);
    commit("setCurrenMusicId", payload.id);
    let index = payload.list.findIndex((item) => item.id == payload.id);
    commit("setCurrenIndex", index);
    // commit("setPlayType", "music");
    commit("setPlayState", true);
    commit("setLikeSong", true);

  },
  currentPlayMusicList({commit},musicid){
    commit("setCurrenMusicId1", musicid);
  
  }

};

const mutations = {
    setMusicList(state, musicList) {
        state.musicList = musicList
    },
    setPlayState(state, isPlay) {
        state.isPlay = isPlay
    },
    setCurrenMusicId(state, currenMusicId) {
        state.currenMusicId = currenMusicId
    },
    setCurrenMusicId1(state, currenMusicId) {
        state.currenMusicId = currenMusicId
        state.currenIndex= state.musicList.findIndex((item) => item.id == currenMusicId);
    },
    setCurrenIndex(state, currenIndex) {
        state.currenIndex = currenIndex
    },
    setTotalTime(state, totalTime) {
        state.currenMusicInfo.totalTime = totalTime
    },
    setCurrenTime(state, currenTime) {
        state.currenMusicInfo.currenTime = currenTime
    },
    setLikeSong(state,list){

    }
    // setPlayType(state, playType) {
    //     if (playType === 'music' || playType === 'personalFm') {
    //         state.playType = playType
    //     }
    // }
};
const state = {
  /* 播放列表 */
  musicList: [],
  /* 播放状态 */
  isPlay: false,
  /* 当前播放的id */
  currenMusicId: 0,
  /* 当前播放的列表下标 */
  currenIndex: 0,
  /* 播放音乐的总时间和当前时间 */
  currenMusicInfo: {
    totalTime: 0,
    currenTime: 0,
  },
};
const getters = {};
export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};

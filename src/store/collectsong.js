import { reqCollectSong } from "@/api"
const actions={
    async getCollectSong({commit},id){
        const res=await reqCollectSong(id)
        if(res.code==200){
            commit('setCollectSongList',res.playlist)
        }
        else{
            return Promise.reject(new Error('error'))
        }
    }
    
}

const mutations={
    setCollectSongList(state,list)
    {   
        state.collectSongList=list
    },
    addCollectSong(state,list)
    {   
        state.collectSongList.splice(2,0,list)
    },
    cancelCollectSong(state,list)
    {   
        state.collectSongList=state.collectSongList.filter(item=>item.id!=list.id)
    },
    
}
const state={
    collectSongList:[]
}
const getters={}
export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters,
}
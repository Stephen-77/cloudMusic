const actions={
    recentlysong({commit},list){
        const index=recentlyList.findIndex(item=>item.id==list.id)
        if(index!=-1){
            const newlist=list.splice(index,1)
            commit('setRecentlySongList',newlist)
        }
        else{
            commit('setRecentlySongList',list)
        }
    }
}

const mutations={
    setRecentlySongList(state,list)
    {   
        const index=state.recentlyList.findIndex(item=>item.id==list.id)
        if(index!=-1){
            state.recentlyList.splice(index,1)
            // commit('setRecentlySongList',newlist)
            state.recentlyList.unshift(list)

        }
        else{
            state.recentlyList.unshift(list)
        }
        // state.recentlyList.push(value)
    },
    clearList(state){
       state.recentlyList=[]
    }
}
const state={
    recentlyList:[]
}
const getters={}
export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters,
}
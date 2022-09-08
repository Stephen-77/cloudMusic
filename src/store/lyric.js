const actions={}
const getters={}
const mutations={
    setSongName(state,value)
    {
        state.SongName=value
    }
}
const state={
    SongName:''
}
export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters,
}
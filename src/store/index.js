import Vue from "vue";
import Vuex from 'vuex'
import login from './login'
import lyric from "./lyric";
import player from './player'
import recentlysong from './recentlysong'
import mymusic from './mymusic'
import collectsong from './collectsong'
import userinfo from './userinfo'
Vue.use(Vuex)
export default new Vuex.Store({
    modules:{
        login,
        lyric,
        player,
        recentlysong,
        mymusic,
        collectsong,
        userinfo
    }
})

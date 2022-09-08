export default [
  {
    name: "lyric",
    path: "/lyric/:lyricid",
    meta: { level: 1 },
    component: () => import("@/views/Lyric"),
  },
  {
    name: "login",
    path: "/login",
    component: () => import("@/components/Login/Login"),
  },

  {
    name: "center",
    path: "/center",
    component: () => import("@/views/Center"),
    redirect: "/home",
    children: [
      {
        name: "search",
        path: "/search",
        component: () => import("@/views/Search"),
      },
      {
        name: "player",
        path: "/player",
        component: () => import("@/views/Player"),
      },
      {
        name: "playlistdetail",
        path: "/playlistdetail/:id",
        component: () => import("@/views/PlaylistDetail"),
      },
      {
        name: "usercenter",
        path: "/usercenter",
        component: () => import("@/views/usercenter/UserCenter"),
        redirect:'/usercenter/personalsongsheet',
        children: [
          {
            name: "personalsongsheet",
            path: "/usercenter/personalsongsheet",
            component: () => import("@/views/usercenter/PersonalSongSheet"),
          },
          {
            name: "collectsongsheet",
            path: "/usercenter/collectsongsheet",
            component: () => import("@/views/usercenter/CollectSongSheet"),
          },
        ],
      },
      {
        name:'edituser',
        path:'/edituser',
        component:()=>import('@/views/usercenter/EditUser')
      },
      {
        name: "recentlyplayed",
        path: "/recentlyplayed",
        component: () => import("@/views/RecentlyPlayed"),
      },
      {
        name: "mymusic",
        path: "/mymusic",
        component: () => import("@/views/MyMusic"),
      },
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/findmusic/index"),
        redirect: "/home/findmusic",
        children: [
          {
            name: "findmusic",
            path: "/home/findmusic",
            component: () => import("@/views/findmusic/FindMusic"),
          },
          {
            name: "songsheet",
            path: "/home/songsheet",
            component: () => import("@/views/findmusic/SongSheet"),
          },
          {
            name: "boutiquesong",
            path: "/home/boutiquesong",
            component: () => import("@/views/findmusic/BoutiqueSong"),
          },
          {
            name: "rankinglist",
            path: "/home/rankinglist",
            component: () => import("@/views/findmusic/RankingList"),
          },
          {
            name: "singer",
            path: "/home/singer",
            component: () => import("@/views/findmusic/Singer"),
          },
        ],
      },
      {
        name: "singerdetail",
        path: "/singerdetail",
        component: () => import("@/views/singerdetail/index.vue"),
        redirect: "/singerdetail/top50",
        children: [
          {
            name: "top50",
            path: "/singerdetail/top50",
            component: () => import("@/views/singerdetail/Top50"),
          },
          {
            name: "detail",
            path: "/singerdetail/detail",
            component: () => import("@/views/singerdetail/Detail"),
          },
          {
            name: "alikesinger",
            path: "/singerdetail/alikesinger",
            component: () => import("@/views/singerdetail/AlikeSinger"),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    redirect: "/center",
  },
];

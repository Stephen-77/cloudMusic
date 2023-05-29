import requests from "./request";
// 登录的接口
export const reqLogin = (phone, pass) =>
  requests({
    url: `/login/cellphone?phone=${phone}&password=${pass}`,
    method: "get",
  });
// 退出登录
export const reqLogout = () =>
  requests({
    url: `/logout`,
    method: "get",
  });
//用户详情
export const reqUserInfo = (userId) =>
  requests({
    url: `/user/detail?uid=${userId}`,
    method: "get",
  });
// findmusic推荐歌单详情
export const reqPlaylistDetail = (playlistId) =>
  requests({
    url: `/playlist/detail?id=${playlistId}`,
    method: "get",
  });
// 歌曲音频URL
export const reqSongURLDetail = (musicId) =>
  requests({
    url: `/song/url?id=${musicId}`,
    method: "get",
  });
// 得到歌词
export const reqLyric = (musicId) =>
  requests({
    url: `/lyric?id=${musicId}`,
    method: "get",
  });
// 搜索歌曲
export const reqSearch = (value) =>
  requests({
    url: `/search?keywords=${value}&limit=80`,
    method: "get",
  });
// 歌曲详情
export const reqSongDetail = (musicId) =>
  requests({
    url: `/song/detail?ids=${musicId}`,
    method: "get",
  });
// 按照歌单分类搜索
//参数tags： 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)

export const reqSongSheet = (tag) =>
  requests({
    url: `/top/playlist?cat=${tag}&limit=30`,
    method: "get",
  });
// 精品歌单标签
export const reqBoutiqueTags = () =>
  requests({
    url: `/playlist/highquality/tags`,
    method: "get",
  });
// 精品歌单信息内容
export const reqBoutiqueDetail = (tag, size) =>
  requests({
    url: `/top/playlist/highquality?cat=${tag}&limit=${size}`,
    method: "get",
  });
// 歌单分类的全部集合
export const reqSongSheetList = () =>
  requests({
    url: `/playlist/catlist`,
    method: "get",
  });
// 所有的排行榜id
export const reqAllTopList = () =>
  requests({
    url: `/toplist`,
    method: "get",
  });
// 歌手分类 偏移数量，用于分页 ,
// 如 : offset如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
// initial: 按首字母索引查找参数,如 /artist/list?type=1&area=96&initial=b
// 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列,
// 热门   传递initial的值-1为,  #  传 0
export const reqSingerCategory = (type, area, initial, offset) =>
  requests({
    url: `/artist/list?type=${type}&area=${area}&initial=${initial}&limit=30&offset=${offset}`,
    method: "get",
  });

// 歌手歌曲的全部集合
export const reqSingerSongList = (singerid) =>
  requests({
    url: `/artist/songs?id=${singerid}&limit=50`,
    method: "get",
  });
// 歌手详情信息
export const reqSingerDetail = (singerid) =>
  requests({
    url: `/artist/detail?id=${singerid}`,
    method: "get",
  });
// 相似歌手信息
export const reqAlikeSinger = (singerid) =>
  requests({
    url: `/simi/artist?id=${singerid}`,
    method: "get",
  });
// 我的喜欢的音乐
export const reqLikeSong = (singerid) =>
  requests({
    url: `/likelist?uid=${singerid}`,
    method: "get",
  });
// 用户收藏的音乐
export const reqCollectSong = (userid) =>
  requests({
    url: `/user/playlist?uid=${userid}`,
    method: "get",
  });
// 用户收藏或取消歌单
export const reqAddOrCancelCollectSong = (type, id) =>
  requests({
    url: `/playlist/subscribe?t=${type}&id=${id}`,
    method: "get",
  });
// 用户点击添加或取消喜欢的音乐
export const reqLikeThisSong = (type, musicid) =>
  requests({
    url: `/like?like=${type}&id=${musicid}`,
    method: "get",
  });

// 重复昵称检测
export const reqRepeatNickName = (nickname) =>
  requests({
    url: `/nickname/check?nickname=${nickname}`,
    method: "get",
  });
//更新用户信息
export const reqUpdateUserInfo = (nickname, gender, signature, birthday) =>
  requests({
    url: `/user/update?gender=${gender}&signature=${signature}&city=440300&nickname=${nickname}&birthday=${birthday}&province=440000`,
    method: "get",
  });
// 更新头像
export const reqUpdateAvatar = (formData) =>
  requests({
    url: `/avatar/upload?imgSize=200`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
// 收取-短信验证码
export const reqGetMessage = (phone) =>
  requests({
    url: `/captcha/sent?phone=${phone}&timestamp=${Date.now()}`,
    method: "get",
  });
// 验证-验证码
export const reqCheckMessage = (phone, captcha) =>
  requests({
    url: `/captcha/verify?phone=${phone}&captcha=${captcha}&timestamp=${Date.now()}`,
    method: "get",
  });
// 请求二维码key
export const reqGetQrKey = () =>
  requests({
    url: `/login/qr/key`,
    method: "get",
  });
// 生成二维码
export const reqCreateQr = (key) =>
  requests({
    url: `/login/qr/create?key=${key}&qrimg=true&timestamp=${Date.now()}`,
    method: "get",
  });
// 查询二维码登录状态
export const reqCheckQr = (key) =>
  requests({
    url: `/login/qr/check?key=${key}&timestamp=${Date.now()}`,
    method: "get",
  });
//
export const getUserInfo = () =>
  requests({
    url: `/user/account`,
    method: "get",
  });

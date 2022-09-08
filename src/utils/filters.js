import Vue from "vue";
// 歌曲时长过滤器
Vue.filter("songtime", function (mss) {
  var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = parseInt((mss % (1000 * 60)) / 1000);
  const m = minutes >=10 ? minutes : "0" + minutes;
  const s = seconds >=10 ? seconds : "0" + seconds;
  return m + ":" + s;
});
// 歌曲正在的播放进程时间
Vue.filter("playtime", function (mss) {
  var minutes = parseInt(mss/60);
  var seconds = parseInt(mss % 60);
  const m = minutes >=10 ? minutes : "0" + minutes;
  const s = seconds >=10 ? seconds : "0" + seconds;
  return m + ":" + s;
});
Vue.filter('getCreateTime',function (timestamp) {
    // var date = new Date(timestamp * 1000);//时间戳若为10位时需*1000
    var date = new Date(timestamp); // 时间戳若为13位则不需要乘1000
    var Y = date.getFullYear();
    var M =
      date.getMonth() + 1 > 10
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1);
    var D = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
    return `${Y}-${M}-${D}`;
})
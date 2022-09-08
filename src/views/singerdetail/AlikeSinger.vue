<template>
  <div class="AlikeSinger">
    <div
      class="singer-container"
      v-loading="loading"
      element-loading-text="拼了命加载ing..."
      element-loading-spinner="el-icon-loading"
    >
      <ul class="container">
        <li v-for="(item, index) in songerList" :key="index">
          <a @click="goSingerDetail(item)">
            <img v-lazy="item.img1v1Url" alt="" />
            <p>{{ item.name }}</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlikeSinger",
  data() {
    return {
      songerList: [],
      loading: true,
    };
  },
  methods: {
    async getAlikeSinger() {
      const res = await this.$API.reqAlikeSinger(this.$route.query.singerid);
      if (res.code == 200) {
        this.songerList = res.artists;
      } else if (res.code == "301") {
        this.$notify.error({
          title: "请登录",
        });
      }
      this.loading = false;
    },
    goSingerDetail(item) {
      sessionStorage.setItem("singerdetail", JSON.stringify(item));
      this.$router.push({
        name: "singerdetail",
        query: {
          singerid: item.id,
        },
      });
    },
  },
  mounted() {
    this.getAlikeSinger();
  },
};
</script>

<style lang="less" scoped>
.AlikeSinger {
  .singer-container {
    // display: flex;
    margin-top: 10px;
    width: 100%;
    .container {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      li {
        width: 16.66%;
        margin: 0;
        padding: 14px 0 0 0;
        a {
          display: flex;
          flex-direction: column;
          padding: 0 15px 0 0;
          img {
            width: 100%;
            height: 150px;
            border-radius: 5px;
          }
          p {
            font-size: 14px;
            margin: 5px 0 0 0;
          }
        }
      }
    }
  }
}
</style>
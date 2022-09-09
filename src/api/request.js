import axios from "axios";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import Vue from "vue";
import { Message } from "element-ui";
const requests = axios.create({
  baseURL: "http://47.104.17.25/api",
  timeout: 10000,
});
requests.interceptors.request.use((config) => {
  nProgress.start();
  return config;
});
requests.interceptors.response.use(
  (res) => {
    nProgress.done();
    return res.data;
  },
  (err) => {
    console.log(err.response);
    if(err.response.status==301){
      Message({
        message: '未登录或者登录信息失效',
        type: 'error',
        showClose: true,
      })
      nProgress.done()
    }
    
    return Promise.reject(new Error("faile"));
  }
);
export default requests;

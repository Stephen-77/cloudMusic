import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import http from "@/axios/index";
import store from '@/store/index'
import * as Api from '@/api'
import VueLazyload from "vue-lazyload";
import filters from '@/utils/filters'
import "animate.css"
import { Button, Container, Header, Aside, Footer,Main,Menu,MenuItem,MenuItemGroup,Submenu,Carousel,CarouselItem, MessageBox, Message, Dialog, Form, FormItem, Input, Notification, Popover, Popconfirm, Backtop, Table, TableColumn, Pagination, Tooltip, Loading, Collapse, CollapseItem, Divider, Slider, Drawer, Upload, DatePicker, Select, Option, Radio, RadioGroup, Autocomplete} from "element-ui";
Vue.config.productionTip = false;
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)

Vue.use(VueLazyload,{
  loading:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.pp-sp.com%2FUploadFiles%2Fimg_0_1693192080_4286726362_26.jpg&refer=http%3A%2F%2Fwww.pp-sp.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659230089&t=924c0984da4a69cbdfa48a652f8ad916'
})
Vue.use(Button),Vue.use(DatePicker),Vue.use(Select),Vue.use(Option)
  Vue.use(Container),Vue.use(Divider),Vue.use(Slider),Vue.use(Drawer)
  Vue.use(Header),Vue.use(Tooltip),Vue.use(Loading),Vue.use(Collapse),Vue.use(CollapseItem)
  Vue.use(Aside),Vue.use(Backtop),Vue.use(Table),Vue.use(TableColumn),Vue.use(Pagination)
  Vue.use(Footer),Vue.use(Main);
Vue.use(Menu),Vue.use(MenuItem),Vue.use(MenuItemGroup),Vue.use(Submenu),Vue.use(Carousel),Vue.use(CarouselItem)
Vue.use(Upload),Vue.use(Radio),Vue.use(RadioGroup),Vue.use(Autocomplete)
Vue.component(MessageBox.name, MessageBox);
Vue.component(Message.name, Message);
Vue.component(Dialog.name,Dialog)
Vue.component(Form.name,Form)
Vue.component(Input.name,Input)
Vue.component(FormItem.name,FormItem)
Vue.component(Notification.name,Notification)
Vue.component(Popover.name,Popover)
Vue.component(Popconfirm.name,Popconfirm)
// Vue.use(Message)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;

Vue.prototype.$http = http;
new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate(){
    Vue.prototype.$API=Api
    Vue.prototype.$bus=this
    Vue.prototype.$message = Message;
    Vue.prototype.$notify = Notification;


  }
}).$mount("#app");

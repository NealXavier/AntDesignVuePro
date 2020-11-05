import Vue from 'vue'
import router from './router'
import {Form,Button,Layout,Icon,Drawer,Radio,Menu,Input,Select,Tag} from 'ant-design-vue/es'
import App from './App.vue'
import Authority from './components/Authorized'
import Auth from './directives/auth'
import store from './store/index'

import queryString from "query-string";
import enUS from "@/assets/languages/en.js";
import zhCN from "@/assets/languages/zh.js";

import 'ant-design-vue/dist/antd.less'


// 国际化工具
import VueI18n from 'vue-i18n'

Vue.config.productionTip = false


Vue.use(Button)
Vue.use(Layout)
Vue.use(Icon)
Vue.use(Drawer)
Vue.use(Radio)
Vue.use(Menu)
Vue.use(Form)
Vue.use(Input)
Vue.use(Select)
Vue.use(Tag)

// Vue.use(Antd)
Vue.component('Authority',Authority)
Vue.use(Auth)

Vue.use(VueI18n)


const i18n = new VueI18n({
  // parse 解析成对象
  locale: queryString.parse(location.search).locale || "zhCN",
  messages: {
    zhCN: { message: zhCN },
    enUS: { message: enUS }
  }
});


// //设置axios为form-data
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.transformRequest = [function (data) {
//     let ret = ''
//     for (let it in data) {
//       ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//     }
//     return ret
// }]

//然后再修改原型链
// Vue.prototype.$axios = axios

new Vue({
  i18n,
  store,
  router,
  render: h => h(App)
}).$mount("#app")

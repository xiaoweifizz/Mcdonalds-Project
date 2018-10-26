import Vue from 'vue'
import App from './App.vue'
import "weui";
import Vuex from 'vuex'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
Vue.use(MuseUI);

Vue.use(Vuex)


import "./assets/iconfonts/iconfont.css";
import "./assets/iconfonts_two/iconfont.css";
import "./assets/iconfonts_three/iconfont.css";
import "./assets/iconfonts_four/iconfont.css";
import "./assets/iconfonts_five/iconfont.css";
import "./assets/iconfonts_six/iconfont.css";
import "./assets/iconfonts_seven/iconfont.css";
import "./assets/iconfonts_mean/iconfont.css";
import "./assets/iconfonts_back/iconfont.css";
import "./assets/iconfonts_delete/iconfont.css";
import "./assets/iconfonts_check/iconfont.css";
import "./assets/iconfonts_shandian/iconfont.css";
import "./assets/iconfonts_xiala/iconfont.css";





//引入动画
import './api/animate.css';








import computed_rem from "./api/rem.js";

computed_rem()


import VueRouter from 'vue-router'
Vue.use(VueRouter)
Vue.config.productionTip = false

import Yhome from './containers/Yhome.vue'
import Ycoupon from './containers/Ycoupon.vue'
import Yknowledge from './containers/Yknowledge.vue'





const routes = [{
	path: '/Yhome',
	component: Yhome
},
{
	path: '/',
	component: Yhome
},
{
	path: '/Ycoupon',
	component: Ycoupon
},
{
	path: '/Yknowledge',
	component: Yknowledge
}
]

const router = new VueRouter({
	routes // (缩写) 相当于 routes: routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

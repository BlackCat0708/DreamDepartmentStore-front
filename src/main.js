import Vue from 'vue'
import Buefy from 'buefy'
import './plugins/axios.js'
import App from './App.vue'
import 'buefy/dist/buefy.css'
import router from './router'
import store from './store'
import './scss/style.scss'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar, faMagnifyingGlass, faLink, faHouseUser, faXmark, faPen, faRightFromBracket, faUserGear, faBan, faHeart, faMoneyCheckDollar, faImages, faListCheck, faIdCard, faGear, faEnvelope, faBell, faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle, faArrowUp, faAngleRight, faAngleLeft, faAngleDown, faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload, faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import mixin from './mixin.js'

library.add(faCircleQuestion, faCaretUp, faCaretDown, faStar, faMagnifyingGlass, faLink, faHouseUser, faXmark, faPen, faRightFromBracket, faUserGear, faBan, faHeart, faMoneyCheckDollar, faImages, faListCheck, faIdCard, faGear, faEnvelope, faBell, faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
  faArrowUp, faAngleRight, faAngleLeft, faAngleDown, faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload)
Vue.component('vue-fontawesome', FontAwesomeIcon)

Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas'
})
Vue.use(VueSweetalert2)
// 可以讓所有元件都用到 mixin 裡 function 抓到的資料
Vue.mixin(mixin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

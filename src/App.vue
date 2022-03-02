<template>
  <div id="app">
    <div id="navbar">
      <div class="navbar-container">
        <b-navbar>
          <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
              <img src="./assets/images/夢百貨logo00.png">
            </b-navbar-item>
          </template>
          <template #start>
            <b-navbar-item tag="router-link" :to="{ path: '/about' }">
              關於夢百貨
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{ path: '/commissionsList' }">
              委託列表
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{ path: '/illustratorsList' }">
              創作者列表
            </b-navbar-item>
          </template>
          <template #end>
            <b-navbar-item>
              <div class="buttons">
                <b-button type="is-light" @click="openLoginModal = true" v-if="!user.isLogin">會員登入</b-button>
              </div>
            </b-navbar-item>
            <div class="login" v-if="user.isLogin">
              <div class="navbarMenu">
                <router-link class="navbar-headshot" :to='"/member/" + user._id ' >
                  <img :src="user.headshot">
                </router-link>
                <b-navbar-dropdown>
                  <!-- 委託者會員中心 -->
                  <b-navbar-item tag="router-link" :to="{ path: '/user' }" v-if="user.isUser && !user.isAdmin">
                    <b-icon pack="fas" icon="gear"></b-icon>
                    <p>會員中心</p>
                  </b-navbar-item>
                  <!-- 創作者會員中心 -->
                  <b-navbar-item tag="router-link" :to="{ path: '/illustrator' }" v-if="user.isIllustrator && !user.isAdmin">
                    <b-icon pack="fas" icon="gear"></b-icon>
                    <p>會員中心</p>
                  </b-navbar-item>
                  <!-- 委託者個人資料 -->
                  <b-navbar-item tag="router-link" :to="{ path: '/user/myinfo' }" v-if="user.isUser && !user.isAdmin">
                    <b-icon pack="fas" icon="id-card"></b-icon>
                    <p>個人資料</p>
                  </b-navbar-item>
                  <!-- 創作者個人資料 -->
                  <b-navbar-item tag="router-link" :to="{ path: '/illustrator/myinfo' }" v-if="user.isIllustrator&& !user.isAdmin">
                    <b-icon pack="fas" icon="id-card"></b-icon>
                    <p>個人資料</p>
                  </b-navbar-item>
                  <!-- 創作者項目管理 -->
                  <b-navbar-item tag="router-link" :to="{ path: '/illustrator/products' }" v-if="user.isIllustrator && !user.isAdmin">
                    <b-icon pack="fas" icon="list-check"></b-icon>
                    <p>項目管理</p>
                  </b-navbar-item>
                  <!-- 委託者相簿管理 -->
                  <b-navbar-item tag="router-link" :to="{ path: '/user/album' }" v-if="user.isUser && !user.isAdmin">
                    <b-icon pack="fas" icon="images"></b-icon>
                    <p>相簿管理</p>
                  </b-navbar-item>
                  <!-- 創作者相簿管理 -->
                  <b-navbar-item tag="router-link" :to="{ path: '/illustrator/album' }" v-if="user.isIllustrator && !user.isAdmin">
                    <b-icon pack="fas" icon="images"></b-icon>
                    <p>相簿管理</p>
                  </b-navbar-item>
                  <!-- 創作者交易紀錄 -->
                  <b-navbar-item tag="router-link" :to="{ path: '/illustrator/orders' }" v-if="user.isIllustrator && !user.isAdmin">
                    <b-icon pack="fas" icon="money-check-dollar"></b-icon>
                    <p>交易紀錄</p>
                  </b-navbar-item>
                  <!-- 委託者委託紀錄 -->
                  <b-navbar-item tag="router-link" :to="{ path: '/user/orders' }" v-if="user.isUser && !user.isAdmin">
                    <b-icon pack="fas" icon="money-check-dollar"></b-icon>
                    <p>委託紀錄</p>
                  </b-navbar-item>
                  <!-- 委託者口袋名單 -->
                  <!-- <b-navbar-item tag="router-link" :to="{ path: '/user/favorite' }" v-if="user.isUser && !user.isAdmin">
                    <b-icon pack="fas" icon="heart"></b-icon>
                    <p>口袋名單</p>
                  </b-navbar-item> -->
                  <!-- 委託者黑名單 -->
                  <!-- <b-navbar-item tag="router-link" :to="{ path: '/' }" v-if="user.isUser && !user.isAdmin">
                    <b-icon pack="fas" icon="ban"></b-icon>
                    <p>黑名單</p>
                  </b-navbar-item> -->
                  <!-- 創作者者黑名單 -->
                  <!-- <b-navbar-item tag="router-link" :to="{ path: '/' }" v-if="user.isIllustrator && !user.isAdmin">
                    <b-icon pack="fas" icon="ban"></b-icon>
                    <p>黑名單</p>
                  </b-navbar-item> -->
                  <!-- 管理員用戶管理 -->
                  <b-navbar-item tag="router-link" :to="{ path: '/admin' }" v-if="user.isAdmin">
                    <b-icon pack="fas" icon="user-gear"></b-icon>
                    <p>用戶管理</p>
                  </b-navbar-item>
                  <b-navbar-item tag="router-link" :to="{ path: '/admin/products' }" v-if="user.isAdmin">
                    <b-icon pack="fas" icon="list-check"></b-icon>
                    <p>項目管理</p>
                  </b-navbar-item>
                  <b-navbar-item tag="router-link" :to="{ path: '/admin/orders' }" v-if="user.isAdmin">
                    <b-icon pack="fas" icon="money-check-dollar"></b-icon>
                    <p>交易管理</p>
                  </b-navbar-item>
                  <b-navbar-item tag="router-link" :to="{ path: '/admin/questions' }" v-if="user.isAdmin">
                    <b-icon pack="fas" icon="circle-question"></b-icon>
                    <p>問題回報</p>
                  </b-navbar-item>
                  <b-navbar-item @click="logout">
                    <b-icon pack="fas" icon="right-from-bracket"></b-icon>
                    <p>登出</p>
                  </b-navbar-item>
                </b-navbar-dropdown>
              </div>
              <div class="login-icon">
                <b-navbar-item>
                  <b-icon pack="fas" icon="envelope"></b-icon>
                </b-navbar-item>
                <b-navbar-item>
                  <b-icon pack="fas" icon="bell"></b-icon>
                </b-navbar-item>
              </div>
            </div>
          </template>
        </b-navbar>
      </div>
    </div>

      <b-modal v-model="openLoginModal" width="750px" scroll="keep">
        <div id="login-card">
          <div class="row">
            <div class="col modal-white">
              <img src="./assets/images/夢百貨_ribbon01.png">
              <h1 class="loginTitle">會員登入</h1>
              <form class="form-group" @submit.prevent="login">
                <b-field label="帳號" horizontal :type="loginType.account" :message="loginMessage.account" label-for="loginAccount">
                  <b-input v-model="form.login.account" placeholder="請輸入帳號" id="loginAccount"></b-input>
                </b-field>
                <b-field label="密碼" horizontal :type="loginType.password" :message="loginMessage.password" label-for="loginPassword">
                  <b-input type="password" v-model="form.login.password" placeholder="請輸入密碼" id="loginPassword"></b-input>
                </b-field>
                <input type="submit" value="登入" class="button is-success submit">
              </form>
            </div>
            <div class="col modal-red">
              <p>還沒建立帳號嗎？</p>
              <b-button type="is-light" outlined @click="openRegisterModal = true;openLoginModal = false">註冊</b-button>
            </div>
          </div>
        </div>
      </b-modal>

      <b-modal v-model="openRegisterModal" width="900px" scroll="keep">
        <div id="register-card">
          <div class="row">
            <div class="col modal-white">
              <h1 class="registerTitle">會員註冊</h1>
              <form class="form-group" @submit.prevent="register">
                <b-field label="帳號" :type="registerType.account" :message="registerMessage.account" label-for="registerAccount">
                  <b-input v-model="form.register.account" placeholder="請輸入帳號" maxlength="20" id="registerAccount"></b-input>
                </b-field>
                <b-field label="密碼" :type="registerType.password" :message="registerMessage.password" label-for="registerPassword">
                  <b-input type="password" v-model="form.register.password" placeholder="請輸入密碼" maxlength="20" id="registerPassword"></b-input>
                </b-field>
                <b-field label="確認密碼" :type="registerType.confirmationPassword" :message="registerMessage.confirmationPassword" label-for="registerConfirmationPassword">
                  <b-input type="password" v-model="form.register.confirmationPassword" placeholder="請再次輸入密碼" id="registerConfirmationPassword"></b-input>
                </b-field>
                <b-field label="暱稱" :type="registerType.nickname" :message="registerMessage.nickname" label-for="registerNickname">
                  <b-input v-model="form.register.nickname" placeholder="請輸入暱稱" maxlength="10" id="registerNickname"></b-input>
                </b-field>
                <b-field label="使用身份" :type="registerType.role" :message="registerMessage.role" label-for="registerRole">
                  <b-select v-model="form.register.role" id="registerRole">
                    <option value="" disabled>我是委託者/創作者</option>
                    <option value="0">委託者</option>
                    <option value="1">創作者</option>
                  </b-select>
                </b-field>
                <input type="submit" value="註冊" class="button is-success submit">
              </form>
            </div>
            <div class="col modal-red">
              <div class="welcome">
                <p>歡迎光臨</p>
                <img src="./assets/images/夢百貨logo00.png">
              </div>
              <p>已經註冊過了？</p>
              <b-button type="is-light" outlined @click="openLoginModal = true;openRegisterModal = false">登入</b-button>
            </div>
          </div>
        </div>
      </b-modal>

    <router-view></router-view>

    <section id="footer">
      <img src="./assets/images/夢百貨_ribbon02.png">
      <div class="text">
        <p>Copyright © BlackCat 2022</p>
        <div class="link-group">
          <a href="https://twitter.com/dream_ds_2022?s=20&t=9ZY_d7N8jpzBbexjXNa1LQ" target="_blank">官方推特</a>
          <a href="https://www.plurk.com/dream_department_store" target="_blank">官方噗浪</a>
          <router-link to="/terms">服務條款與隱私權政策</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      openLoginModal: false,
      openRegisterModal: false,
      form: {
        login: {
          account: '',
          password: ''
        },
        register: {
          account: '',
          password: '',
          confirmationPassword: '',
          nickname: '',
          role: ''
        }
      }
    }
  },
  computed: {
    loginType () {
      return {
        account: this.form.login.account.length === 0 ? null : this.form.login.account.length >= 4 && this.form.login.account.length <= 20 ? 'is-success' : 'is-danger',
        password: this.form.login.password.length === 0 ? null : this.form.login.password.length >= 4 && this.form.login.password.length <= 20 ? 'is-success' : 'is-danger'
      }
    },
    loginMessage () {
      return {
        account: this.form.login.account.length === 0 ? null : this.form.login.account.length >= 4 && this.form.login.account.length <= 20 ? null : '帳號格式錯誤',
        password: this.form.login.password.length === 0 ? null : this.form.login.password.length >= 4 && this.form.login.password.length <= 20 ? null : '密碼格式錯誤'
      }
    },
    registerType () {
      return {
        account: this.form.register.account.length === 0 ? null : this.form.register.account.length >= 4 && this.form.register.account.length <= 20 ? 'is-success' : 'is-danger',
        password: this.form.register.password.length === 0 ? null : this.form.register.password.length >= 4 && this.form.register.password.length <= 20 ? 'is-success' : 'is-danger',
        confirmationPassword: this.form.register.confirmationPassword.length === 0 ? null : this.form.register.password === this.form.register.confirmationPassword ? 'is-success' : 'is-danger',
        nickname: this.form.register.nickname.length === 0 ? null : this.form.register.nickname.length >= 1 && this.form.register.nickname.length <= 10 ? 'is-success' : 'is-danger',
        role: this.form.register.role === '0' || this.form.register.role === '1' ? 'is-success' : null
      }
    },
    registerMessage () {
      return {
        account: this.form.register.account.length === 0 ? '帳號長度為 4 到 20 個字' : this.form.register.account.length >= 4 && this.form.register.account.length <= 20 ? '帳號長度為 4 到 20 個字' : '帳號格式錯誤',
        password: this.form.register.password.length === 0 ? '密碼長度為 4 到 20 個字' : this.form.register.password.length >= 4 && this.form.register.password.length <= 20 ? '密碼長度為 4 到 20 個字' : '密碼格式錯誤',
        confirmationPassword: this.form.register.confirmationPassword.length === 0 ? null : this.form.register.password === this.form.register.confirmationPassword ? null : '請輸入正確的密碼',
        nickname: this.form.register.nickname.length === 0 ? '暱稱長度為 10 個字以內' : this.form.register.nickname.length >= 1 && this.form.register.nickname.length <= 10 ? '暱稱長度為 10 個字以內' : '暱稱格式錯誤',
        role: this.form.register.role === '0' || this.form.register.role === '1' ? null : '請選擇身份類別'
      }
    }
  },
  methods: {
    async register () {
      if (this.form.register.role.length === 0) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '身分欄位不能空白'
        })
        return
      }
      try {
        await this.api.post('/users', this.form.register)
        this.$swal({
          imageUrl: 'https://res.cloudinary.com/duplahipf/image/upload/v1644452906/%E5%A4%A2%E7%99%BE%E8%B2%A8logo_mxa6fd.png',
          imageWidth: 400,
          title: '註冊成功',
          text: '您成功加入夢百貨的會員'
        })
        this.openRegisterModal = false
        this.openLoginModal = true
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
    },
    login () {
      // dispatch 呼叫的是 action 裡的 login
      this.$store.dispatch('user/login', this.form.login)
      this.openLoginModal = false
    },
    logout () {
      this.$store.dispatch('user/logout')
    }
  },
  async created () {
    this.$store.dispatch('user/getUserInfo')
  }
}
</script>

<template>
  <div id="illustrator">
    <div class="container">
      <div class="management-left">
        <ul>
          <li>
            <router-link to="/illustrator">
              <b-icon pack="fas" icon="gear"></b-icon>
              <p>會員中心</p>
            </router-link>
          </li>
          <li>
            <router-link to="/illustrator/myinfo">
              <b-icon pack="fas" icon="id-card"></b-icon>
              <p>個人資料</p>
              </router-link>
          </li>
          <li>
            <router-link to="/illustrator/products">
              <b-icon pack="fas" icon="list-check"></b-icon>
              <p>項目管理</p>
            </router-link>
          </li>
          <li>
            <router-link to="/illustrator/album">
              <b-icon pack="fas" icon="images"></b-icon>
              <p>相簿管理</p>
            </router-link>
          </li>
          <li>
            <router-link to="/illustrator/orders">
              <b-icon pack="fas" icon="money-check-dollar"></b-icon>
              <p>交易紀錄</p>
            </router-link>
          </li>
          <!-- <li>
            <router-link to="/illustrator">
              <b-icon pack="fas" icon="ban"></b-icon>
              <p>黑名單</p>
            </router-link>
          </li> -->
          <li class="menu-logout" @click="logout">
            <b-icon pack="fas" icon="right-from-bracket"></b-icon>
            <p>登出</p>
          </li>
          <img src="../../assets/images/夢百貨_ribbon02.png">
        </ul>
      </div>
      <div class="management-right">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      isActive: true
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('user/logout')
    }
  }
}
</script>

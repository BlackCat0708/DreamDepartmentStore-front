<template>
  <div id="admin">
    <div class="container">
      <div class="management-left">
        <ul>
          <li>
            <router-link to="/admin">
              <b-icon pack="fas" icon="user-gear"></b-icon>
              <p>用戶管理</p>
            </router-link>
          </li>
          <li>
            <router-link to="/admin/products">
              <b-icon pack="fas" icon="list-check"></b-icon>
              <p>項目管理</p>
            </router-link>
          </li>
          <li>
            <router-link to="/admin/orders">
              <b-icon pack="fas" icon="money-check-dollar"></b-icon>
              <p>交易管理</p>
            </router-link>
          </li>
          <li>
            <router-link to="/admin/questions">
              <b-icon pack="fas" icon="circle-question"></b-icon>
              <p>問題回報</p>
            </router-link>
          </li>
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

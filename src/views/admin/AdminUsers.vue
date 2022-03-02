<template>
  <div id="adminUsers">
    <h1 class="management-title">用戶管理</h1>
    <div class="search">
      <b-field>
        <b-input v-model="keywords" placeholder="搜尋使用者" type="search" icon="magnifying-glass"></b-input>
        <p class="control">
          <b-button type="is-success" label="搜尋" @click="search" />
        </p>
      </b-field>
    </div>
    <div class="admin-container">
      <b-table :data="false ? [] : users" :striped = "true" :hoverable = "true" ref='table'>

        <b-table-column label="帳號" v-slot="props">
          <span>{{ props.row.account }}</span>
        </b-table-column>

        <b-table-column label="暱稱" v-slot="props">
          <router-link class="link" :to='"/member/" + props.row._id ' >
            <div class="user-headshot">
              <img :src="props.row.headshot">
            </div>
            <span>{{ props.row.nickname }}</span>
          </router-link>
        </b-table-column>

        <b-table-column label="ID" width="350" v-slot="props">
          <span>{{ props.row._id }}</span>
        </b-table-column>

        <b-table-column label="身份" width="120" v-slot="props">
          <span>{{ props.row.role }}</span>
        </b-table-column>

        <b-table-column label="刪除" width="70" v-slot="props">
          <b-button class="delete is-danger"  @click="deleteUser(props.index)">
            <b-icon pack="fas" icon="xmark"></b-icon>
          </b-button>
        </b-table-column>

          <template #empty>
            <div class="has-text-centered">沒有資料</div>
          </template>
        </b-table>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      submitting: false,
      keywords: '',
      users: []
    }
  },
  methods: {
    async deleteUser (index) {
      try {
        await this.api.delete('/users/' + this.users[index]._id, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.users.splice(index, 1)
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '刪除成功'
        })
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '刪除失敗'
        })
      }
    },
    async search (event) {
      event.preventDefault()
      this.submitting = true
      const search = `&keywords=${this.keywords.split(' ')}`

      try {
        const { data } = await this.api.get('/users/all?' + search, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.users = data.result
        this.submitting = false
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '找不到符合條件的商品'
        })
      }
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/users/all', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.users = data.result
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得用戶失敗'
      })
    }
  }
}
</script>

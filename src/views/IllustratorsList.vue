<template>
  <div id="illustratorlist">
    <div class="container">
      <div class="search">
        <b-field>
          <b-input v-model="keywords" placeholder="搜尋創作者" type="search" icon="magnifying-glass"></b-input>
          <p class="control">
            <b-button type="is-success" label="搜尋" @click="search" />
          </p>
        </b-field>
      </div>
      <div class="list">
        <div class="row">
          <p class="search-0" v-if="illustrators.length === 0">沒有符合條件的創作者</p>
          <div class="col" v-for="illustrator in illustrators" :key="illustrator._id">
            <IllustratorCard :illustrator="illustrator" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IllustratorCard from '../components/IllustratorCard.vue'

export default {
  components: {
    IllustratorCard
  },
  data () {
    return {
      illustrators: [],
      keywords: ''
    }
  },
  methods: {
    async search () {
      const search = `keywords=${this.keywords.split(' ')}`
      try {
        const { data } = await this.api.get('/users?' + search)
        this.illustrators = data.result.reverse()
        this.submitting = false
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '找不到符合條件的創作者'
        })
      }
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/users')
      this.illustrators = data.result.reverse()
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '資料取得失敗'
      })
    }
  }
}
</script>

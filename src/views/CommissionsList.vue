<template>
  <div id="commissionslist">
    <div class="container list-container">
      <div class="search">
        <div class="search-green">
          <h1>條件搜尋</h1>
        </div>
        <form class="form-group" @submit.prevent="search">
          <b-field label="✦ 關鍵字/標籤搜尋" label-for="keywords">
            <b-input v-model="form.keywords" id="keywords" placeholder="請輸入關鍵字"></b-input>
          </b-field>
          <h3 class="popular-tags">人氣標籤</h3>
          <div class="tags">
            <b-tag rounded v-for="(tag, i) in tags" :key="i" @click="input(i)">{{ '#' + tag }}</b-tag>
          </div>
          <b-field label="✦ 授權範圍">
            <b-select placeholder="請選擇" v-model="form.authorize">
              <option value="">請選擇</option>
              <option value="個人收藏使用">個人收藏使用</option>
              <option value="可縮放裁切">可縮放裁切</option>
              <option value="可二次加工">可二次加工</option>
              <option value="可註明出處後發布">可註明出處後發布</option>
              <option value="可不註明出處發布">可不註明出處發布</option>
              <option value="可平面印刷">可平面印刷</option>
              <option value="可製作成立體製品(徽章/立牌/吊飾)">可製作成立體製品(徽章/立牌/吊飾)</option>
            </b-select>
          </b-field>
          <b-field label="✦ 預算範圍">
            <b-input v-model="form.price_gte" placeholder="請輸入最低預算"></b-input>
          </b-field>
          <b-field>
            <b-input v-model="form.price_lte" placeholder="請輸入最高預算"></b-input>
          </b-field>
          <div class="buttons">
            <b-button class="is-dark">清除所有條件</b-button>
            <input type="submit" value="開始搜尋" class="button is-success submit">
          </div>
        </form>
      </div>
      <div class="list">
        <div class="row">
          <p class="search-0" v-if="products.length === 0">沒有符合條件的商品</p>
          <div class="col" v-for="product in products" :key="product._id">
            <ProductCard :product="product"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'

export default {
  components: {
    ProductCard
  },
  data () {
    return {
      submitting: false,
      products: [],
      tags: ['單人', '雙人', '頭像', 'Q版', '插畫', '立繪', '服裝驚喜包', '服裝設計', '互動圖'],
      form: {
        keywords: '',
        authorize: '',
        price_gte: '',
        price_lte: ''
      }
    }
  },
  methods: {
    input (index) {
      this.form.keywords = this.tags[index]
    },
    async search (event) {
      event.preventDefault()
      this.submitting = true
      const keywords = `&keywords=${this.form.keywords.split(' ')}`
      const authorize = `&authorize=${this.form.authorize}`
      const gte = `&price_gte=${this.form.price_gte}`
      const lte = `&price_lte=${this.form.price_lte}`
      const search = keywords + authorize + gte + lte

      try {
        const { data } = await this.api.get('/products?' + search)
        this.products = data.result.reverse()
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
      const { data } = await this.api.get('/products')
      this.products = data.result.reverse()
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '商品取得失敗'
      })
    }
  }
}
</script>

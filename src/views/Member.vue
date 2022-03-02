<template>
  <div id="member">
    <div class="container">
      <!-- 基本資訊 -->
      <div class="member-main">
        <div class="member-headshot">
          <img :src="member.headshot">
        </div>
        <div class="member-info">
          <h1 class="member-nickname">{{ member.nickname }}</h1>
          <div class="member-websites">
            <div class="member-website" v-for="website in member.websites" :key="website._id">
              <a :href="website.website" target="_blank" v-if='website.category !== "email"'>
                <b-icon pack="fas" icon="house-user" v-if='website.category === "個人網站"'></b-icon>
                <img class="svg facebook" src="../assets/svg/facebook-square-brands.svg" v-if='website.category === "Facebook"'>
                <img class="svg" src="../assets/svg/plurk.svg" v-if='website.category === "Plurk"'>
                <img class="svg" src="../assets/svg/twitter-brands.svg" v-if='website.category === "Twitter"'>
                <img class="svg" src="../assets/svg/pixiv.svg" v-if='website.category === "pixiv"'>
                <b-icon pack="fas" icon="link" v-if='website.category === "其他"'></b-icon>
              </a>
              <a :href="'mailto:' + website.website" v-if='website.category === "email"'>
                <b-icon pack="fas" icon="envelope"></b-icon>
              </a>
            </div>
          </div>
          <p class="member-self-introduction">{{ member.selfIntroduction }}</p>
        </div>
      </div>

      <!-- 其他資訊內容 -->
      <b-tabs>
        <!-- 委託項目 -->
        <b-tab-item label="委託項目" v-if="member.role === 1">
        <div class="row">
          <p class="search-0" v-if="products.length === 0">目前未有委託項目</p>
          <div class="col" v-for="product in products" :key="product._id">
            <ProductCard :product="product"/>
          </div>
        </div>
        </b-tab-item>
        <!-- 首頁 -->
        <b-tab-item label="首頁" v-if="member.role === 0">
          <div class="cover-container">
            <div class="member-cover">
              <img :src="member.coverpicture">
              <div class="member-overlay">
                <p class="member-cover-illustrator"> {{ '繪師 ✦ ' + member.coverIllustrator }} </p>
              </div>
            </div>
          </div>
        </b-tab-item>
        <!-- 介紹 -->
        <b-tab-item label="介紹" v-if="member.role === 0">
          <b-tabs size="is-small" class="block small-tabs">
            <b-tab-item label="夢設" v-if="member.role === 0">
              <div class="row">
                <div class="col">
                  <img :src="member.yumejoshi[0].image">
                </div>
                <div class="col">
                  <h1 class="yume-name">{{ member.yumejoshi[0].name }}</h1>
                  <p class="yuem-info">{{ member.yumejoshi[0].introduction}}</p>
                </div>
              </div>
            </b-tab-item>
            <b-tab-item label="夢角" v-if="member.role === 0">
              <div class="row">
                <div class="col">
                  <img :src="member.character[0].image">
                </div>
                <div class="col">
                  <h1 class="yume-name">{{ member.character[0].name }}</h1>
                  <p class="yuem-info">{{ member.character[0].introduction}}</p>
                </div>
              </div>
            </b-tab-item>
          </b-tabs>
        </b-tab-item>
        <!-- 委託者相簿 -->
        <b-tab-item label="相簿" v-if="member.role === 0">
          <div class="album-container">
            <div class="col" v-for="image in member.album" :key="image._id">
              <a :href="'#image/'+ image._id">
                <div class="image-card">
                  <img :src="image.image">
                  <div class="album-overlay">
                    <p class="album-illustrator"> {{ '繪師 ✦ ' + image.illustrator }} </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </b-tab-item>
        <!-- 創作者相簿 -->
        <b-tab-item label="相簿" v-if="member.role === 1">
          <div class="album-container">
            <div class="col" v-for="image in member.album" :key="image._id">
              <a :href="'#image/'+ image._id">
                <div class="image-card">
                  <img :src="image.image">
                </div>
              </a>
            </div>
          </div>
        </b-tab-item>
        <!-- 衣櫃 -->
        <b-tab-item label="衣櫃" v-if="member.role === 0">
          <div class="album-container">
            <div class="col" v-for="image in member.cabinet" :key="image._id">
              <a :href="'#image/'+ image._id">
                <div class="image-card">
                  <img :src="image.image">
                  <div class="album-overlay">
                    <p class="album-illustrator"> {{ '繪師 ✦ ' + image.illustrator }} </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </b-tab-item>
        <!-- 評價 -->
        <b-tab-item label="評價" v-if="member.role === 1">
          <div class="review-container">
            <div class="review" v-for="order in orders" :key="order">
              <div class="review-card" v-if="order.star !== undefined || order.review !== undefined">
                <div class="order-headshot">
                  <img :src="order.user.headshot">
                </div>
                <div class="order-text">
                  <div class="order-name">
                    <h1>{{ order.product.name }}</h1>
                    <p class="order-nickname"><span class="tag">委託者</span>{{ order.user.nickname}}</p>
                  </div>
                  <b-rate v-model="order.star" :max="5" :disabled="true"></b-rate>
                  <div class="order-item"> {{ order.review }}</div>
                  <div class="order-item order-date"> {{ new Date(order.date).toLocaleString('zh-tw')}}</div>
                </div>
              </div>
            </div>
          </div>
        </b-tab-item>
      </b-tabs>
    </div>

    <!-- 相簿燈箱 -->
    <div class="album-lightbox" v-for="image in member.album" :key="image._id">
      <a :href="'#member/'+ member._id" class="lightbox" :id="'image/' + image._id">
        <img :src="image.image">
      </a>
    </div>

    <!-- 委託者衣櫃燈箱 -->
    <div class="album-lightbox" v-for="image in member.cabinet" :key="image._id">
      <a :href="'#member/'+ member._id" class="lightbox" :id="'image/' + image._id">
        <img :src="image.image">
      </a>
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
      member: '',
      products: [],
      orders: []
    }
  },
  async created () {
    try {
      const { data: member } = await this.api.get('/users/' + this.$route.params.id)
      this.member = member.result
      const { data: products } = await this.api.get('/products/user/' + this.$route.params.id)
      this.products = products.result
      const { data: orders } = await this.api.get('/orders/' + this.$route.params.id)
      this.orders = orders.result
    } catch (error) {
      this.$router.push('/')
    }
  }
}
</script>

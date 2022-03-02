<template>
  <div id="home">
    <section id="carousel">
      <b-carousel
        v-model="carousel"
        :animated="animated"
        :arrow="arrow"
        :has-drag="drag"
        :autoplay="autoPlay"
        :pause-hover="pauseHover"
        :pause-info="pauseInfo"
        :interval="interval"
        :repeat="repeat">
        <b-carousel-item>
          <img src="../assets/images/2022011601.jpg">
        </b-carousel-item>
        <b-carousel-item>
          <img src="../assets/images/2022011602.jpg">
        </b-carousel-item>
        <b-carousel-item>
          <img src="../assets/images/2022011603.jpg">
        </b-carousel-item>
      </b-carousel>
    </section>

    <section id="homeCommissions">
      <div class="container home-container">
        <div class="home-title">
          <h1>－最新委託－</h1>
          <h3>Latest Commissions</h3>
        </div>
        <div class="row">
          <div class="col" v-for="product in products" :key="product._id">
            <ProductCard :product="product"/>
          </div>
        </div>
      </div>
    </section>
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
      arrow: false,
      carousel: 0,
      animated: 'scroll',
      drag: true,
      autoPlay: true,
      pauseHover: true,
      pauseInfo: false,
      repeat: true,
      interval: 5000,
      products: []
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

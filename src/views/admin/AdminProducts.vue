<template>
  <div id="adminProducts">
    <h1 class="management-title">項目管理</h1>
    <div class="search">
      <b-field>
        <b-input v-model="keywords" placeholder="搜尋項目" type="search" icon="magnifying-glass"></b-input>
        <p class="control">
          <b-button type="is-success" label="搜尋" @click="search" />
        </p>
      </b-field>
    </div>
    <div class="product-container">
      <p v-if="products.length === 0" style="width: 100%; text-align: center;">沒有項目</p>
      <div class="col" v-for="(product,i) in products" :key="product._id" ref="card">
        <div class="management-product-card">
          <router-link :to='"/products/" + product._id ' >
            <div class="card-image">
              <img :src="product.images[0]">
            </div>
          </router-link>
          <b-button class="delete is-danger" @click="deleteProduct(i)">
            <b-icon pack="fas" icon="xmark"></b-icon>
          </b-button>
          <div class="card-body">
            <div class="card-title">
              <router-link :to='"/products/" + product._id ' >
                <h3>{{ product.name }}</h3>
              </router-link>
            </div>
            <router-link :to='"/member/" + product.illustrator._id ' >
              <div class="illustrator-name">
                <div class="illustrator-headshot">
                  <img :src="product.illustrator.headshot">
                </div>
                <p>{{ product.illustrator.nickname }}</p>
              </div>
            </router-link>
            <div class="tags">
              <b-tag rounded v-for="tag in product.tags" :key="tag.index">{{ '#' + tag }}</b-tag>
            </div>
            <p class="card-price">{{ 'NT$' + product.price + '+' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      submitting: false,
      keywords: '',
      products: []
    }
  },
  methods: {
    async deleteProduct (index) {
      try {
        await this.api.delete('/products/' + this.products[index]._id, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.products.splice(index, 1)
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
        const { data } = await this.api.get('/products/all?' + search, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
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
      const { data } = await this.api.get('/products/all', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.products = data.result.reverse()
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得商品失敗'
      })
    }
  }
}
</script>

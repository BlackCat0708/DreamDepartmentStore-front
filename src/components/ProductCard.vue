<template>
  <div class="product-card">
    <router-link :to='"/products/" + product._id ' >
      <div class="card-image">
        <img :src="product.images[0]">
      </div>
    </router-link>
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
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      require: true
    }
  }
}
</script>

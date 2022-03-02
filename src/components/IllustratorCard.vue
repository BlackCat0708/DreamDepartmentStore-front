<template>
  <div class="illustrator-card">
    <router-link :to='"/member/" + illustrator._id ' >
      <div class="card-image">
        <img v-if=" illustrator.album.length >0 " :src="illustrator.album[0].image">
        <img v-if=" illustrator.album.length === 0 " :src="illustrator.headshot">
      </div>
    </router-link>
    <div class="card-body">
      <div class="card-title">
        <router-link :to='"/member/" + illustrator._id ' >
          <div class="illustrator-headshot">
            <img :src="illustrator.headshot">
          </div>
          <h3>{{ illustrator.nickname }}</h3>
        </router-link>
      </div>
      <div class="star">
        <b-rate v-model="rate" :max="5" :custom-text='"(" + 2 + ")"' :disabled="true"></b-rate>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rate: 4
    }
  },
  props: {
    illustrator: {
      type: Object,
      require: true
    }
  }
}
</script>

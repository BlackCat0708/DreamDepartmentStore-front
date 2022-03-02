<template>
  <div id="adminOrders">
    <h1 class="management-title">交易管理</h1>
    <div class="order-container">
      <b-table :data="false ? [] : orders" :striped = "true" :hoverable = "true" ref='table'>

        <b-table-column label="委託者" v-slot="props" width="200">
          <router-link class="link" :to='"/member/" + props.row.user._id ' >
            <div class="user-headshot">
              <img :src="props.row.user.headshot">
            </div>
            <span>{{ props.row.user.nickname }}</span>
          </router-link>
        </b-table-column>

        <b-table-column label="創作者" v-slot="props" width="200">
          <router-link class="link" :to='"/member/" + props.row.illustrator._id ' >
            <div class="user-headshot">
              <img :src="props.row.illustrator.headshot">
            </div>
            <span>{{ props.row.illustrator.nickname }}</span>
          </router-link>
        </b-table-column>

        <b-table-column label="委託項目" v-slot="props">
          <router-link class="link" :to='"/products/" + props.row.product._id ' >
            <span>{{ props.row.product.name }}</span>
          </router-link>
        </b-table-column>

        <b-table-column label="委託單內容" width="150" v-slot="props">
          <b-button class="edit" @click="open(props.index)">
            <b-icon pack="fas" icon="envelope"></b-icon>
          </b-button>
        </b-table-column>

        <b-table-column label="狀態" v-slot="props" width="180">
          <span v-if="props.row.cancel === true">創作者取消</span>
          <span v-if="props.row.finish === true">委託完成</span>
          <span v-if="props.row.finish === false && props.row.accept === true">委託進行中</span>
          <span v-if="props.row.finish === false && props.row.accept === false && props.row.cancel === false">待創作者回應中</span>
        </b-table-column>

        <template #empty>
          <div class="has-text-centered">沒有委託紀錄</div>
        </template>
      </b-table>
    </div>

    <!-- openModal -->
    <b-modal v-model="openModal" width="700px" scroll="keep">
      <div class="normal-form">
        <div class="modal-red">
          <h1>委託單內容</h1>
        </div>
        <div class="modal-white">
          <div class="modal-items">
            <div class="modal-item">
              <h3>✦ 需求描述</h3>
              <p>{{ modal.description }}</p>
            </div>
            <div class="modal-item">
              <h3>✦ 參考圖</h3>
              <div class="modal-images" v-for="image in modal.images" :key="image">
                <img :src="image">
              </div>
            </div>
            <div class="modal-item">
              <h3>✦ 參考資料來源</h3>
              <p>{{ modal.source }}</p>
            </div>
            <div class="modal-item">
              <h3>✦ 委託時間</h3>
              <p>{{ new Date(modal.date).toLocaleString('zh-tw') }}</p>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      openModal: false,
      orders: [],
      modal: {
        description: '',
        images: [],
        source: '',
        date: ''
      }
    }
  },
  methods: {
    open (index) {
      this.modal = { ...this.orders[index] }
      this.openModal = true
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/orders/all', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.orders = data.result
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得交易紀錄失敗'
      })
    }
  }
}
</script>

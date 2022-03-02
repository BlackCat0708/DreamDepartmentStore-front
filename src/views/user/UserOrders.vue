<template>
  <div id="userorder" >
    <h1 class="management-title">等待回應中</h1>
    <div class="order-container">
      <b-table :data="false ? [] : orders" :striped = "true" :hoverable = "true">

        <b-table-column label="創作者" v-slot="props" width="250">
          <router-link class="link" :to='"/member/" + props.row.illustrator._id ' >
            <div class="user-headshot">
              <img :src="props.row.illustrator.headshot">
            </div>
            <span>{{ props.row.illustrator.nickname }}</span>
          </router-link>
        </b-table-column>

        <b-table-column label="委託項目" v-slot="props" width="300">
          <router-link class="link" :to='"/products/" + props.row.product._id ' >
            <span>{{ props.row.product.name }}</span>
          </router-link>
        </b-table-column>

        <b-table-column label="委託時間" width="250" v-slot="props">
          <span>{{ new Date(props.row.date).toLocaleString('zh-tw') }}</span>
        </b-table-column>

        <b-table-column label="委託單內容" v-slot="props">
          <b-button class="edit" @click="openContent(props.index)">
            <b-icon pack="fas" icon="envelope"></b-icon>
          </b-button>
        </b-table-column>

        <template #empty>
          <div class="has-text-centered">沒有委託紀錄</div>
        </template>
      </b-table>
    </div>

    <h1 class="management-title">正在進行中</h1>
    <div class="order-container">
      <b-table :data="false ? [] : accept" :striped = "true" :hoverable = "true">

        <b-table-column label="創作者" v-slot="props" width="250">
          <router-link class="link" :to='"/member/" + props.row.illustrator._id ' >
            <div class="user-headshot">
              <img :src="props.row.illustrator.headshot">
            </div>
            <span>{{ props.row.illustrator.nickname }}</span>
          </router-link>
        </b-table-column>

        <b-table-column label="委託項目" v-slot="props" width="300">
          <router-link class="link" :to='"/products/" + props.row.product._id ' >
            <span>{{ props.row.product.name }}</span>
          </router-link>
        </b-table-column>

        <b-table-column label="委託時間" width="250" v-slot="props">
          <span>{{ new Date(props.row.date).toLocaleString('zh-tw') }}</span>
        </b-table-column>

        <b-table-column label="委託單內容" v-slot="props">
          <b-button class="edit" @click="openAccept(props.index)">
            <b-icon pack="fas" icon="envelope"></b-icon>
          </b-button>
        </b-table-column>

        <b-table-column label="匯款方式" v-slot="props">
          <b-button class="edit blue" @click="openPayment(props.index)">
            <b-icon pack="fas" icon="envelope"></b-icon>
          </b-button>
        </b-table-column>

        <template #empty>
          <div class="has-text-centered">沒有委託紀錄</div>
        </template>
      </b-table>
    </div>

    <h1 class="management-title">完成的委託</h1>
    <div class="order-container">
      <b-table :data="false ? [] : finished" :striped = "true" :hoverable = "true" ref='table'>

        <b-table-column label="創作者" v-slot="props" width="250">
          <router-link class="link" :to='"/member/" + props.row.illustrator._id ' >
            <div class="user-headshot">
              <img :src="props.row.illustrator.headshot">
            </div>
            <span>{{ props.row.illustrator.nickname }}</span>
          </router-link>
        </b-table-column>

        <b-table-column label="委託項目" v-slot="props" width="300">
          <router-link class="link" :to='"/products/" + props.row.product._id ' >
            <span>{{ props.row.product.name }}</span>
          </router-link>
        </b-table-column>

        <b-table-column label="委託時間" width="250" v-slot="props">
          <span>{{ new Date(props.row.date).toLocaleString('zh-tw') }}</span>
        </b-table-column>

        <b-table-column label="委託單內容" v-slot="props">
          <b-button class="edit" @click="openFinish(props.index)">
            <b-icon pack="fas" icon="envelope"></b-icon>
          </b-button>
        </b-table-column>

        <b-table-column label="評價/評論" v-slot="props">
          <b-button class="is-success" v-if="props.row.star === undefined && props.row.review === undefined" @click="create(props.index)">新增</b-button>
          <b-button class="edit blue" v-if="props.row.star !== undefined && props.row.review !== undefined" @click="openReview(props.index)">
            <b-icon pack="fas" icon="envelope"></b-icon>
          </b-button>
        </b-table-column>

        <template #empty>
          <div class="has-text-centered">沒有委託紀錄</div>
        </template>
      </b-table>
    </div>

    <h1 class="management-title">被取消的委託</h1>
    <div class="order-container">
      <b-table :data="false ? [] : cancel" :striped = "true" :hoverable = "true">

        <b-table-column label="創作者" v-slot="props" width="250">
          <router-link class="link" :to='"/member/" + props.row.illustrator._id ' >
            <div class="user-headshot">
              <img :src="props.row.illustrator.headshot">
            </div>
            <span>{{ props.row.illustrator.nickname }}</span>
          </router-link>
        </b-table-column>

        <b-table-column label="委託項目" v-slot="props" width="300">
          <router-link class="link" :to='"/products/" + props.row.product._id ' >
            <span>{{ props.row.product.name }}</span>
          </router-link>
        </b-table-column>

        <b-table-column label="委託時間" width="250" v-slot="props">
          <span>{{ new Date(props.row.date).toLocaleString('zh-tw') }}</span>
        </b-table-column>

        <b-table-column label="委託單內容" v-slot="props">
          <b-button class="edit" @click="openCancel(props.index)">
            <b-icon pack="fas" icon="envelope"></b-icon>
          </b-button>
        </b-table-column>

        <b-table-column label="取消原因" v-slot="props">
          <span>{{ props.row.reason }}</span>
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
          </div>
        </div>
      </div>
    </b-modal>

    <!-- paymentModal -->
    <b-modal v-model="openPaymentModal" width="700px" scroll="keep">
      <div class="normal-form">
        <div class="modal-red">
          <h1>匯款方式</h1>
        </div>
        <div class="modal-white">
          <div class="modal-items">
            <div class="modal-item">
              <p>{{ payment }}</p>
            </div>
          </div>
        </div>
      </div>
    </b-modal>

    <!-- openReviewModal -->
    <b-modal v-model="openReviewModal" width="700px" scroll="keep">
      <div class="normal-form">
        <div class="modal-red">
          <h1>評價/評論</h1>
        </div>
        <div class="modal-white">
          <div class="modal-items">
            <div class="modal-item">
              <h3>✦ 評價</h3>
              <b-rate v-model="form1.star" :max="5" :disabled="true"></b-rate>
            </div>
            <div class="modal-item">
              <h3>✦ 評論</h3>
              <p>{{ form1.review }}</p>
            </div>
          </div>
        </div>
      </div>
    </b-modal>

    <!-- reviewModal -->
    <b-modal v-model="reviewModal" width="700px" scroll="keep" @close="resetReviewModal">
      <div class="normal-form">
        <div class="modal-red">
          <h1>新增評價和評論</h1>
        </div>
        <div class="modal-white">
          <form class="form-group" @submit.prevent="submitReviewModal">
            <b-field label="✦ 評價">
              <b-rate v-model="form.star" :max="5"></b-rate>
            </b-field>
            <b-field label="✦ 評論">
              <b-input placeholder="請輸入評論" v-model="form.review" type="textarea"></b-input>
            </b-field>
            <div class="buttons">
              <b-button class="is-dark" @click="resetReviewModal" :disabled="modalSubmitting">取消</b-button>
              <input type="submit" value="送出" class="button is-success submit" :disabled="modalSubmitting">
            </div>
          </form>
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
      openPaymentModal: false,
      openReviewModal: false,
      reviewModal: false,
      modalSubmitting: false,
      orders: [],
      accept: [],
      cancel: [],
      finished: [],
      modal: {
        description: '',
        images: [],
        source: ''
      },
      payment: '',
      form: {
        star: '',
        review: '',
        _id: '',
        index: -1
      },
      form1: {
        star: '',
        review: ''
      }
    }
  },
  methods: {
    async submitReviewModal (event) {
      event.preventDefault()
      if (this.form.star.length === 0 && this.form.star.review === 0) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '請輸入評價/評論'
        })
        return
      }
      this.modalSubmitting = true
      try {
        const { data } = await this.api.patch('/orders/review/' + this.form._id, {
          star: this.form.star, review: this.form.review
        },
        {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.finished[this.form.index] = data.result
        this.$refs.table.resetMultiSorting()
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '新增成功'
        })
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '送出失敗'
        })
      }
      this.modalSubmitting = false
      this.reviewModal = false
    },
    openContent (index) {
      this.modal = { ...this.orders[index] }
      this.openModal = true
    },
    openAccept (index) {
      this.modal = { ...this.accept[index] }
      this.openModal = true
    },
    openPayment (index) {
      this.payment = this.accept[index].payment
      this.openPaymentModal = true
    },
    openFinish (index) {
      this.modal = { ...this.finished[index] }
      this.openModal = true
    },
    openCancel (index) {
      this.modal = { ...this.cancel[index] }
      this.openModal = true
    },
    openReview (index) {
      this.form1 = { ...this.finished[index] }
      this.openReviewModal = true
    },
    create (index) {
      this.form._id = this.finished[index]._id
      this.form.index = index
      this.reviewModal = true
    },
    resetReviewModal (event) {
      if (this.modalSubmitting) {
        event.preventDefault()
        return
      }
      this.form = {
        star: '',
        review: '',
        _id: '',
        index: -1
      }
      this.reviewModal = false
    }
  },
  async created () {
    if (this.user.token.length === 0) return
    try {
      const { data: orders } = await this.api.get('/orders/me', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.orders = orders.result
      const { data: accept } = await this.api.get('/orders/me/accept', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.accept = accept.result
      const { data: cancel } = await this.api.get('/orders/me/cancel', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.cancel = cancel.result
      const { data: finished } = await this.api.get('/orders/me/finished', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.finished = finished.result
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得資料失敗'
      })
    }
  }
}
</script>

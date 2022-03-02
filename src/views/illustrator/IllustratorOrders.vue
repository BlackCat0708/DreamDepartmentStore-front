<template>
  <div id="illustratorOrders">
    <h1 class="management-title">委託邀請</h1>
    <div class="order-container">
      <b-table :data="false ? [] : orders" :striped = "true" :hoverable = "true">

        <b-table-column label="委託者" v-slot="props" width="200">
          <router-link class="link" :to='"/member/" + props.row.user._id ' >
            <div class="user-headshot">
              <img :src="props.row.user.headshot">
            </div>
            <span>{{ props.row.user.nickname }}</span>
          </router-link>
        </b-table-column>

        <b-table-column label="委託項目" v-slot="props" width="250">
          <router-link class="link" :to='"/products/" + props.row.product._id ' >
            <span>{{ props.row.product.name }}</span>
          </router-link>
        </b-table-column>

        <b-table-column label="委託單內容" width="150" v-slot="props">
          <b-button class="edit" @click="openContent(props.index)">
            <b-icon pack="fas" icon="envelope"></b-icon>
          </b-button>
        </b-table-column>

        <b-table-column label="時間" width="250" v-slot="props">
          <span>{{ new Date(props.row.date).toLocaleString('zh-tw') }}</span>
        </b-table-column>

        <b-table-column label="動作" v-slot="props">
          <div class="button-group">
            <b-button class="is-success" @click="accept(props.index)">接受</b-button>
            <b-button class="is-danger" @click="reject(props.index)">拒絕</b-button>
          </div>
        </b-table-column>

        <template #empty>
          <div class="has-text-centered">沒有委託紀錄</div>
        </template>
      </b-table>
    </div>

    <h1 class="management-title">進行中的委託</h1>
    <div class="order-container">
      <b-table :data="false ? [] : doing" :striped = "true" :hoverable = "true">

        <b-table-column label="委託者" v-slot="props" width="200">
          <router-link class="link" :to='"/member/" + props.row.user._id ' >
            <div class="user-headshot">
              <img :src="props.row.user.headshot">
            </div>
            <span>{{ props.row.user.nickname }}</span>
          </router-link>
        </b-table-column>

        <b-table-column label="委託項目" v-slot="props" width="250">
          <router-link class="link" :to='"/products/" + props.row.product._id ' >
            <span>{{ props.row.product.name }}</span>
          </router-link>
        </b-table-column>

        <b-table-column label="委託單內容" width="150" v-slot="props">
          <b-button class="edit" @click="openDoing(props.index)">
            <b-icon pack="fas" icon="envelope"></b-icon>
          </b-button>
        </b-table-column>

        <b-table-column label="時間" width="250" v-slot="props">
          <span>{{ new Date(props.row.date).toLocaleString('zh-tw') }}</span>
        </b-table-column>

        <b-table-column label="動作" v-slot="props">
          <div class="button-group">
            <b-button class="is-success" @click="finish(props.index)">完成</b-button>
          </div>
        </b-table-column>

        <template #empty>
          <div class="has-text-centered">沒有委託紀錄</div>
        </template>
      </b-table>
    </div>

    <h1 class="management-title">完成的委託</h1>
    <div class="order-container">
      <b-table :data="false ? [] : finished" :striped = "true" :hoverable = "true">

        <b-table-column label="委託者" v-slot="props" width="200">
          <router-link class="link" :to='"/member/" + props.row.user._id ' >
            <div class="user-headshot">
              <img :src="props.row.user.headshot">
            </div>
            <span>{{ props.row.user.nickname }}</span>
          </router-link>
        </b-table-column>

        <b-table-column label="委託項目" v-slot="props" width="250">
          <router-link class="link" :to='"/products/" + props.row.product._id ' >
            <span>{{ props.row.product.name }}</span>
          </router-link>
        </b-table-column>

        <b-table-column label="委託單內容" width="150" v-slot="props">
          <b-button class="edit" @click="openFinish(props.index)">
            <b-icon pack="fas" icon="envelope"></b-icon>
          </b-button>
        </b-table-column>

        <b-table-column label="收到的評論" width="250" v-slot="props">
          <span v-if="props.row.review === undefined ">尚未有評論</span>
          <span v-if="props.row.review !== undefined ">{{ props.row.review }}</span>
        </b-table-column>

        <b-table-column label="收到的評價" v-slot="props">
          <span v-if="props.row.star === undefined ">尚未有評價</span>
          <b-rate v-model="props.row.star" :max="5" :disabled="true" v-if="props.row.star !== undefined"></b-rate>
        </b-table-column>

        <template #empty>
          <div class="has-text-centered">沒有委託紀錄</div>
        </template>
      </b-table>
    </div>

    <h1 class="management-title">拒絕的委託</h1>
    <div class="order-container">
      <b-table :data="false ? [] : cancel" :striped = "true" :hoverable = "true">

        <b-table-column label="委託者" v-slot="props" width="200">
          <router-link class="link" :to='"/member/" + props.row.user._id ' >
            <div class="user-headshot">
              <img :src="props.row.user.headshot">
            </div>
            <span>{{ props.row.user.nickname }}</span>
          </router-link>
        </b-table-column>

        <b-table-column label="委託項目" v-slot="props" width="250">
          <router-link class="link" :to='"/products/" + props.row.product._id ' >
            <span>{{ props.row.product.name }}</span>
          </router-link>
        </b-table-column>

        <b-table-column label="委託單內容" width="150" v-slot="props">
          <b-button class="edit" @click="openCancel(props.index)">
            <b-icon pack="fas" icon="envelope"></b-icon>
          </b-button>
        </b-table-column>

        <b-table-column label="時間" width="250" v-slot="props">
          <span>{{ new Date(props.row.date).toLocaleString('zh-tw') }}</span>
        </b-table-column>

        <b-table-column label="拒絕原因" v-slot="props">
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

    <!-- acceptModal -->
    <b-modal v-model="acceptModal" width="700px" scroll="keep" @close="resetAcceptModal">
      <div class="normal-form">
        <div class="modal-red">
          <h1>接受委託</h1>
        </div>
        <div class="modal-white">
          <form class="form-group" @submit.prevent="submitAcceptModal">
            <b-field label="✦ 匯款方式／資訊">
              <b-input placeholder="請輸入匯款方式／資訊" v-model="form1.payment" type="textarea"></b-input>
            </b-field>
            <div class="buttons">
              <b-button class="is-dark" @click="resetAcceptModal" :disabled="modalSubmitting">取消</b-button>
              <input type="submit" value="送出" class="button is-success submit" :disabled="modalSubmitting">
            </div>
          </form>
        </div>
      </div>
    </b-modal>

    <!-- rejectModal -->
    <b-modal v-model="rejectModal" width="700px" scroll="keep" @close="resetRejectModal">
      <div class="normal-form">
        <div class="modal-red">
          <h1>拒絕委託</h1>
        </div>
        <div class="modal-white">
          <form class="form-group" @submit.prevent="submitRejectModal">
            <b-field label="✦ 拒絕原因">
              <b-input placeholder="請輸入拒絕的原因" v-model="form2.reason" type="textarea"></b-input>
            </b-field>
            <div class="buttons">
              <b-button class="is-dark" @click="resetRejectModal" :disabled="modalSubmitting">取消</b-button>
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
      orders: [],
      doing: [],
      cancel: [],
      finished: [],
      openModal: false,
      acceptModal: false,
      rejectModal: false,
      modalSubmitting: false,
      form1: {
        _id: '',
        payment: '',
        index: -1
      },
      form2: {
        _id: '',
        reason: ''
      },
      modal: {
        description: '',
        images: [],
        source: ''
      }
    }
  },
  methods: {
    openContent (index) {
      this.modal = { ...this.orders[index] }
      this.openModal = true
    },
    openDoing (index) {
      this.modal = { ...this.doing[index] }
      this.openModal = true
    },
    openFinish (index) {
      this.modal = { ...this.finished[index] }
      this.openModal = true
    },
    openCancel (index) {
      this.modal = { ...this.cancel[index] }
      this.openModal = true
    },
    async submitAcceptModal (event) {
      event.preventDefault()
      if (this.form1.payment.length === 0) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '請輸入匯款方式／資訊'
        })
        return
      }
      this.modalSubmitting = true
      try {
        const { data } = await this.api.patch('/orders/accept/' + this.form1._id, {
          payment: this.form1.payment
        },
        {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.orders.splice(this.form1.index, 1)
        this.doing.push(data.result)
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '已接受委託'
        })
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '送出失敗'
        })
      }
      this.modalSubmitting = false
      this.acceptModal = false
    },
    async submitRejectModal (event) {
      event.preventDefault()
      this.modalSubmitting = true
      try {
        const { data } = await this.api.patch('/orders/cancel/' + this.form2._id, {
          reason: this.form2.reason
        },
        {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.orders.splice(this.form2.index, 1)
        this.cancel.push(data.result)
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '成功拒絕委託'
        })
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '送出失敗'
        })
      }
      this.modalSubmitting = false
      this.rejectModal = false
    },
    async finish (index) {
      try {
        const { data } = await this.api.patch('/orders/finish/' + this.doing[index]._id, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.doing.splice(index, 1)
        this.finished.push(data.result)
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '已完成委託'
        })
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '操作失敗'
        })
      }
    },
    accept (index) {
      this.form1._id = this.orders[index]._id
      this.form1.index = index
      this.acceptModal = true
    },
    reject (index) {
      this.form2._id = this.orders[index]._id
      this.form2.index = index
      this.rejectModal = true
    },
    resetAcceptModal (event) {
      if (this.modalSubmitting) {
        event.preventDefault()
        return
      }
      this.form1 = {
        _id: '',
        payment: ''
      }
      this.acceptModal = false
    },
    resetRejectModal (event) {
      if (this.modalSubmitting) {
        event.preventDefault()
        return
      }
      this.form2 = {
        _id: '',
        reason: ''
      }
      this.rejectModal = false
    }
  },
  async created () {
    try {
      const { data: orders } = await this.api.get('/orders/illustrator', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.orders = orders.result
      const { data: doing } = await this.api.get('/orders/illustrator/doing', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.doing = doing.result
      const { data: cancel } = await this.api.get('/orders/illustrator/cancel', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.cancel = cancel.result
      const { data: finished } = await this.api.get('/orders/illustrator/finished', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.finished = finished.result
    } catch (error) {
      this.$router.push('/')
    }
  }
}
</script>

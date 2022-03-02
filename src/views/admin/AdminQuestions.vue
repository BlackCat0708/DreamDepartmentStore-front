<template>
  <div id="adminQuestions">
    <h1 class="management-title">問題回報</h1>
    <div class="admin-container">
      <b-table :data="false ? [] : questions" :striped = "true" :hoverable = "true" ref='table'>

        <b-table-column label="問題" v-slot="props" width="300">
          <span class="my-website">{{ props.row.question }}</span>
        </b-table-column>

        <b-table-column label="回報人名稱" v-slot="props">
          <span class="my-website">{{ props.row.nickname }}</span>
        </b-table-column>

        <b-table-column label="回報人帳號" v-slot="props">
          <span class="my-website">{{ props.row.account }}</span>
        </b-table-column>

        <b-table-column label="時間" width="300" v-slot="props">
          <span class="my-website">{{ new Date(props.row.date).toLocaleString('zh-tw') }}</span>
        </b-table-column>

        <b-table-column label="內容" width="70" v-slot="props">
          <b-button class="edit" @click="openQuestion(props.index)">
            <b-icon pack="fas" icon="envelope"></b-icon>
          </b-button>
        </b-table-column>

        <template #empty>
          <div class="has-text-centered">沒有問題回報</div>
        </template>
      </b-table>
    </div>

    <b-modal v-model="openModal" width="700px" scroll="keep">
      <div class="normal-form">
        <div class="modal-red">
          <h1>問題回報內容</h1>
        </div>
        <div class="modal-white">
          <div class="modal-items">
            <div class="modal-item">
              <h3>✦ 問題</h3>
              <p>{{ modal.question }}</p>
            </div>
            <div class="modal-item">
              <h3>✦ 問題描述</h3>
              <p>{{ modal.content }}</p>
            </div>
            <div class="modal-item">
              <h3>✦ 附件</h3>
              <div class="modal-images" v-for="image in modal.images" :key="image">
                <img :src="image">
              </div>
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
      questions: [],
      modal: {
        question: '',
        content: '',
        images: []
      }
    }
  },
  methods: {
    openQuestion (index) {
      this.modal = { ...this.questions[index] }
      this.openModal = true
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/questions', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.questions = data.result.reverse()
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得問題回報失敗'
      })
    }
  }
}
</script>

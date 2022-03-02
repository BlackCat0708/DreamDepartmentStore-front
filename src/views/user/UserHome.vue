<template>
  <div id="userhome">
    <h1 class="management-title">個人頁面設定</h1>
    <div class="user-container">
      <p class="cover-now">✦ 目前封面</p>
      <img class="cover-picture" :src="coverpictute">
      <form class="form" @submit.prevent="submit">
        <b-field label="✦ 封面設定" label-for="illustrator-headshot">
          <b-upload id="illustrator-headshot" v-model="form.image" drag-drop expanded>
            <section class="section">
              <div class="content has-text-centered">
                <p>
                  <b-icon icon="upload" size="is-large"></b-icon>
                </p>
                <p>
                  點選或拖曳上傳圖片<br>
                </p>
              </div>
            </section>
          </b-upload>
        </b-field>
        <span v-if="form.image" class="tag is-primary">{{ form.image.name }}</span>
        <b-field label="✦ 繪師" label-for="illustrator-name">
          <b-input v-model="form.illustrator" id="illustrator-name" placeholder="請輸入繪師名稱" maxlength="10"></b-input>
        </b-field>
        <input type="submit" value="儲存設定" class="button is-success submit" :disabled="submitting">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      submitting: false,
      form: {
        image: null,
        illustrator: ''
      },
      coverpictute: null
    }
  },
  methods: {
    async submit (event) {
      event.preventDefault()
      this.submitting = true
      const fd = new FormData()
      for (const key in this.form) {
        if (key !== '_id') {
          fd.append(key, this.form[key])
        }
      }

      const { data } = await this.api.patch('users/cover', fd, {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.form.image = null
      this.coverpictute = data.result.coverpicture
      this.form.illustrator = data.result.coverIllustrator
      this.submitting = false
    }
  },
  async created () {
    if (this.user.token.length === 0) return
    try {
      const { data } = await this.api.get('/users/me', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.coverpictute = data.result.coverpicture
      this.form.illustrator = data.result.coverIllustrator
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

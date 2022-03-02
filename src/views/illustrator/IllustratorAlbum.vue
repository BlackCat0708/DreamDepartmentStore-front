<template>
  <div id="illustratoralbum">
    <div class="title-plus">
      <h1 class="management-title">相簿管理</h1>
      <b-button class="is-success" @click="openModal = true">新增</b-button>
    </div>
    <div class="album-container">
      <p v-if="album.length === 0" style="width: 100%; text-align: center;">請新增作品</p>
      <div class="col" v-for="(image, i) in album" :key="image._id">
        <div class="image-card">
          <b-button class="delete is-danger" @click="deleteImage(i)">
            <b-icon pack="fas" icon="xmark"></b-icon>
          </b-button>
          <img :src="image.image">
        </div>
      </div>
    </div>
    <!-- modal -->
      <b-modal v-model="openModal" width="700px" scroll="keep" @close="resetModal">
        <div class="normal-form">
          <div class="modal-red">
            <h1>新增作品</h1>
          </div>
          <div class="modal-white">
            <form class="form-group" @submit.prevent="submitModal">
              <b-field label-for="work">
                <b-upload id="work" v-model="form.image" drag-drop expanded>
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
              <div class="buttons">
                <b-button class="is-dark" @click="resetModal" :disabled="modalSubmitting">取消</b-button>
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
      album: [],
      openModal: false,
      modalSubmitting: false,
      form: {
        image: null
      }
    }
  },
  methods: {
    async submitModal (event) {
      if (this.user.token.length === 0) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '請先登入'
        })
        this.$router.push('/')
        return
      }
      event.preventDefault()
      if (this.form.image.length === 0) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '請上傳圖片檔案'
        })
        return
      }
      this.modalSubmitting = true
      const fd = new FormData()
      for (const key in this.form) {
        fd.append(key, this.form[key])
      }

      try {
        const { data } = await this.api.post('/users/album', fd, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.album.push(data.result)
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '新增作品成功'
        })
        this.form = {
          image: null
        }
        this.openModal = false
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '上傳失敗'
        })
      }
      this.modalSubmitting = false
    },
    resetModal (event) {
      if (this.modalSubmitting) {
        event.preventDefault()
        return
      }
      this.form = {
        image: null
      }
      this.openModal = false
    },
    async deleteImage (index) {
      try {
        await this.api.delete('users/album/' + this.album[index]._id, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.album.splice(index, 1)
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
      this.album = data.result.album
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

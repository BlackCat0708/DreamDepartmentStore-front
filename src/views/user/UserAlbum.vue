<template>
  <div id="useralbum">
    <div class="title-plus">
      <h1 class="management-title">相簿管理</h1>
    </div>
    <b-tabs>
      <b-tab-item label="相簿">
        <b-button class="is-success album-button" @click="openAlbumModal = true">新增</b-button>
        <div class="album-container">
          <p v-if="album.length === 0" style="width: 100%; text-align: center;">請新增作品</p>
          <div class="col" v-for="(image, i) in album" :key="image._id" ref="card">
            <div class="image-card">
              <b-button class="edit" @click="editAlbum(i)">
                <b-icon pack="fas" icon="pen"></b-icon>
              </b-button>
              <b-button class="delete is-danger" @click="deleteAlbum(i)">
                <b-icon pack="fas" icon="xmark"></b-icon>
              </b-button>
              <img :src="image.image">
              <div class="album-overlay">
                <p class="album-illustrator"> {{ '繪師 ✦ ' + image.illustrator }} </p>
              </div>
            </div>
          </div>
        </div>
      </b-tab-item>
      <b-tab-item label="衣櫃">
        <b-button class="is-success album-button" @click="openCabinetModal = true">新增</b-button>
        <div class="album-container">
          <p v-if="cabinet.length === 0" style="width: 100%; text-align: center;">請新增作品</p>
          <div class="col" v-for="(image, i) in cabinet" :key="image._id">
            <div class="image-card">
              <b-button class="edit" @click="editCabinet(i)">
                <b-icon pack="fas" icon="pen"></b-icon>
              </b-button>
              <b-button class="delete is-danger" @click="deleteCabinet(i)">
                <b-icon pack="fas" icon="xmark"></b-icon>
              </b-button>
              <img :src="image.image">
              <div class="album-overlay">
                <p class="album-illustrator"> {{ '繪師 ✦ ' + image.illustrator }} </p>
              </div>
            </div>
          </div>
        </div>
      </b-tab-item>
    </b-tabs>
    <!-- albumModal -->
    <b-modal v-model="openAlbumModal" width="700px" scroll="keep" @close="resetModal">
      <div class="normal-form">
        <div class="modal-red">
          <h1 v-if="!form._id.length > 0">新增相簿圖片</h1>
          <h1 v-if="form._id.length > 0">編輯相簿圖片</h1>
        </div>
        <div class="modal-white">
          <form class="form-group" @submit.prevent="submitAlbum">
            <b-field label="✦ 圖片" label-for="image">
              <b-upload id="image" v-model="form.image" drag-drop expanded>
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
            <b-field label="✦ 繪師" label-for="character-introduction">
              <b-input v-model="form.illustrator" id="character-introduction" placeholder="請輸入繪師名稱"></b-input>
            </b-field>
            <div class="buttons">
              <b-button class="is-dark" @click="resetModal" :disabled="modalSubmitting">取消</b-button>
              <input type="submit" value="送出" class="button is-success submit" :disabled="modalSubmitting">
            </div>
          </form>
        </div>
      </div>
    </b-modal>
    <!-- cabinetModal -->
    <b-modal v-model="openCabinetModal" width="700px" scroll="keep" @close="resetModal">
      <div class="normal-form">
        <div class="modal-red">
          <h1 v-if="!form._id.length > 0">新增衣櫃圖片</h1>
          <h1 v-if="form._id.length > 0">編輯衣櫃圖片</h1>
        </div>
        <div class="modal-white">
          <form class="form-group" @submit.prevent="submitCabinet">
            <b-field label="✦ 圖片" label-for="image">
              <b-upload id="image" v-model="form.image" drag-drop expanded>
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
            <b-field label="✦ 繪師" label-for="character-introduction">
              <b-input v-model="form.illustrator" id="character-introduction" placeholder="請輸入繪師名稱"></b-input>
            </b-field>
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
      cabinet: [],
      openAlbumModal: false,
      openCabinetModal: false,
      modalSubmitting: false,
      form: {
        image: null,
        illustrator: '',
        _id: '',
        index: -1
      }
    }
  },
  methods: {
    async submitAlbum (event) {
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
      this.modalSubmitting = true

      try {
        if (this.form._id.length === 0) {
          const fd = new FormData()
          for (const key in this.form) {
            if (key !== '_id') {
              fd.append(key, this.form[key])
            }
          }

          if (this.form.image.length === 0) {
            this.$swal({
              icon: 'error',
              title: '錯誤',
              text: '請上傳圖片檔案'
            })
            return
          }
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
        } else {
          const fd = new FormData()
          for (const key in this.form) {
            fd.append(key, this.form[key])
          }
          const { data } = await this.api.patch('/users/album', fd, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.album[this.form.index] = { ...this.form, image: data.result.album[this.form.index].image }
          this.$swal({
            icon: 'success',
            title: '成功',
            text: '更新成功'
          })
        }
        this.form = {
          image: null,
          illustrator: '',
          _id: '',
          index: -1
        }
        this.openAlbumModal = false
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '上傳失敗'
        })
      }
      this.modalSubmitting = false
    },
    async submitCabinet (event) {
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
      this.modalSubmitting = true

      try {
        if (this.form._id.length === 0) {
          const fd = new FormData()
          for (const key in this.form) {
            if (key !== '_id') {
              fd.append(key, this.form[key])
            }
          }

          if (this.form.image.length === 0) {
            this.$swal({
              icon: 'error',
              title: '錯誤',
              text: '請上傳圖片檔案'
            })
            return
          }
          const { data } = await this.api.post('/users/cabinet', fd, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.cabinet.push(data.result)
          this.$swal({
            icon: 'success',
            title: '成功',
            text: '新增作品成功'
          })
        } else {
          const fd = new FormData()
          for (const key in this.form) {
            fd.append(key, this.form[key])
          }
          const { data } = await this.api.patch('/users/cabinet', fd, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.cabinet[this.form.index] = { ...this.form, image: data.result.cabinet[this.form.index].image }
          this.$swal({
            icon: 'success',
            title: '成功',
            text: '更新成功'
          })
        }
        this.form = {
          image: null,
          illustrator: '',
          _id: '',
          index: -1
        }
        this.openCabinetModal = false
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '上傳失敗'
        })
      }
      this.modalSubmitting = false
    },
    editAlbum (index) {
      this.form = { ...this.album[index], image: null, index }
      this.openAlbumModal = true
    },
    editCabinet (index) {
      this.form = { ...this.cabinet[index], image: null, index }
      this.openCabinetModal = true
    },
    resetModal (event) {
      if (this.modalSubmitting) {
        event.preventDefault()
        return
      }
      this.form = {
        image: null,
        illustrator: '',
        _id: '',
        index: -1
      }
      this.openAlbumModal = false
      this.openCabinetModal = false
    },
    async deleteAlbum (index) {
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
    },
    async deleteCabinet (index) {
      try {
        await this.api.delete('users/cabinet/' + this.cabinet[index]._id, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.cabinet.splice(index, 1)
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
      this.cabinet = data.result.cabinet
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

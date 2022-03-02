<template>
  <div id="illustratormyinfo" >
    <h1 class="management-title">基本資料</h1>
      <div class="myinfo-container">
        <form class="form"  @submit.prevent="submit">
          <b-field label="✦ 暱稱" label-for="illustrator-nickname" message="最多可輸入 10 個字">
            <b-input v-model="form.nickname" id="illustrator-nickname" placeholder="請輸入暱稱" maxlength="10"></b-input>
          </b-field>
          <b-field label="✦ 大頭貼設定" label-for="illustrator-headshot">
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
          <b-field label="✦ 自我介紹" label-for="illustrator-selfIntroduction">
            <b-input v-model="form.selfIntroduction" id="illustrator-selfIntroduction" type="textarea"></b-input>
          </b-field>
          <input type="submit" value="儲存設定" class="button is-success submit" :disabled="submitting">
        </form>
        <div class="title-plus">
          <h1 class="management-title">社群媒體</h1>
          <b-button class="is-success" @click="openModal = true">新增</b-button>
        </div>
        <b-table :data="false ? [] : websites" :striped = "true" :hoverable = "true" ref='table'>

          <b-table-column v-slot="props" width="200">
            <div class="website-category">
              <b-icon pack="fas" icon="house-user" v-if='props.row.category === "個人網站"'></b-icon>
              <img class="svg" src="../../assets/svg/facebook-square-brands.svg" v-if='props.row.category === "Facebook"'>
              <img class="svg" src="../../assets/svg/plurk.svg" v-if='props.row.category === "Plurk"'>
              <img class="svg" src="../../assets/svg/twitter-brands.svg" v-if='props.row.category === "Twitter"'>
              <img class="svg" src="../../assets/svg/pixiv.svg" v-if='props.row.category === "pixiv"'>
              <b-icon pack="fas" icon="envelope" v-if='props.row.category === "email"'></b-icon>
              <b-icon pack="fas" icon="link" v-if='props.row.category === "其他"'></b-icon>
              <span class="website-name">{{ props.row.category }}</span>
            </div>
          </b-table-column>

          <b-table-column v-slot="props">
            <span class="my-website">{{ props.row.website }}</span>
          </b-table-column>

          <b-table-column width="100" v-slot="props">
            <div class="td-buttons">
              <b-button class="edit" @click="editWebsite(props.index)">
                <b-icon pack="fas" icon="pen"></b-icon>
              </b-button>
              <b-button class="delete is-danger"  @click="deleteWebsite(props.index)">
                <b-icon pack="fas" icon="xmark"></b-icon>
              </b-button>
            </div>
          </b-table-column>

          <template #empty>
            <div class="has-text-centered">請新增社群媒體</div>
          </template>
        </b-table>
      </div>
      <!-- modal -->
      <b-modal v-model="openModal" width="700px" scroll="keep" @close="resetModal">
        <div class="normal-form">
          <div class="modal-red">
            <h1>新增社群媒體</h1>
          </div>
          <div class="modal-white">
            <form class="form-group" @submit.prevent="submitModal">
              <b-field>
                <b-select placeholder="請選擇" v-model="modal.category">
                  <option value="" disabled>請選擇</option>
                  <option value="個人網站">個人網站</option>
                  <option value="pixiv">pixiv</option>
                  <option value="Plurk">Plurk</option>
                  <option value="Twitter">Twitter</option>
                  <option value="Facebook">Facebook</option>
                  <option value="email">email</option>
                  <option value="其他">其他</option>
                </b-select>
              </b-field>
              <b-input placeholder="請輸入網址" v-model="modal.website"></b-input>
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
      openModal: false,
      submitting: false,
      modalSubmitting: false,
      form: {
        nickname: '',
        image: null,
        selfIntroduction: ''
      },
      modal: {
        category: '',
        website: '',
        _id: '',
        index: -1
      },
      websites: []
    }
  },
  methods: {
    async submit (event) {
      event.preventDefault()
      if (this.form.nickname.length === 0) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '請輸入暱稱'
        })
        return
      }
      this.submitting = true
      const fd = new FormData()
      for (const key in this.form) {
        if (key !== '_id') {
          fd.append(key, this.form[key])
        }
      }

      this.$store.dispatch('user/editInfo', fd)
      this.form = { ...this.form, image: null }
      this.submitting = false
    },
    resetModal (event) {
      if (this.modalSubmitting) {
        event.preventDefault()
        return
      }
      this.modal = {
        category: '',
        website: '',
        _id: '',
        index: -1
      }
      this.openModal = false
    },
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
      if (this.modal.category.length === 0 || this.modal.website.length === 0) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '缺少必填欄位'
        })
        return
      }
      this.modalSubmitting = true
      try {
        if (this.modal.index < 0) {
          const { data } = await this.api.post('/users/websites', {
            category: this.modal.category, website: this.modal.website
          },
          {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.websites.push(data.result)
          this.$swal({
            icon: 'success',
            title: '成功',
            text: '成功新增社群媒體'
          })
        } else {
          await this.api.patch('/users/websites', {
            _id: this.modal._id, category: this.modal.category, website: this.modal.website
          },
          {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.websites[this.modal.index] = { ...this.modal }
          this.$refs.table.resetMultiSorting()
          this.$swal({
            icon: 'success',
            title: '成功',
            text: '更新成功'
          })
        }
        this.modal = {
          category: '',
          website: '',
          index: -1
        }
        this.openModal = false
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '失敗'
        })
      }

      this.modalSubmitting = false
    },
    editWebsite (index) {
      this.modal = { ...this.websites[index], index }
      this.openModal = true
    },
    async deleteWebsite (index) {
      try {
        await this.api.delete('/users/websites/' + this.websites[index]._id, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.websites.splice(index, 1)
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
      this.form.nickname = data.result.nickname
      this.form.image = null
      this.form.selfIntroduction = data.result.selfIntroduction
      this.websites = data.result.websites
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

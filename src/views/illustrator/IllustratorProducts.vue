<template>
  <div id="illustratorproducts">
    <div class="title-plus">
      <h1 class="management-title">委託項目</h1>
      <b-button class="is-success" @click="openModal = true">新增</b-button>
    </div>
    <div class="product-container">
      <p v-if="products.length === 0" style="width: 100%; text-align: center;">請新增項目</p>
      <div class="col" v-for="(product,i) in products" :key="product._id" ref="card">
        <div class="management-product-card">
          <router-link :to='"/products/" + product._id ' >
            <div class="card-image">
              <img :src="product.images[0]">
            </div>
          </router-link>
          <b-button class="delete is-danger" @click="deleteProduct(i)">
            <b-icon pack="fas" icon="xmark"></b-icon>
          </b-button>
          <div class="card-body">
            <div class="card-title">
              <b-button class="edit" @click="editProduct(i)">
                <b-icon pack="fas" icon="pen"></b-icon>
              </b-button>
              <router-link :to='"/products/" + product._id ' >
                <h3>{{ product.name }}</h3>
              </router-link>
            </div>
            <router-link :to='"/member/" + product.illustrator ' >
              <div class="illustrator-name">
                <div class="illustrator-headshot">
                  <img :src="user.headshot">
                </div>
                <p>{{ user.nickname }}</p>
              </div>
            </router-link>
            <div class="tags">
              <b-tag rounded v-for="tag in product.tags" :key="tag.index">{{ '#' + tag }}</b-tag>
            </div>
            <p class="card-price">{{ 'NT$' + product.price + '+' }}</p>
          </div>
        </div>
      </div>
    </div>
    <b-modal v-model="openModal" width="700px" scroll="keep" @close="resetForm">
      <div class="normal-form">
        <div class="modal-red">
          <h1 v-if="!form._id.length > 0">新增委託項目</h1>
          <h1 v-if="form._id.length > 0">編輯委託項目</h1>
        </div>
        <div class="modal-white">
          <form class="form-group" @submit.prevent="submitModal">
            <b-field label="✦ 項目名稱" label-for="product-name" :type="productType.name" message="※必填欄位，最多可輸入 20 個字">
              <b-input id="product-name" v-model="form.name"  placeholder="請輸入名稱" maxlength="20"></b-input>
            </b-field>
            <b-field label="✦ 項目價格" label-for="product-price" :type="productType.price" message="※必填欄位，請輸入基本價，不能有「＋」或「～」">
              <b-input id="product-price" v-model="form.price" placeholder="請輸入基本價格"></b-input>
            </b-field>
            <b-field label="✦ 範例圖" label-for="product-images" :type="productType.images" :message="productMessage.images">
              <b-upload id="product-images" v-model="form.images" multiple drag-drop expanded>
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
            <div class="tags">
              <span v-for="(image, index) in form.images" :key="index" class="tag is-primary" >{{image.name}}
                <button class="delete is-small" type="button" @click="deleteImage(index)"></button>
              </span>
            </div>
            <b-field label="✦ 標籤" label-for="product-tags" :type="productType.tags" message="最多可放 5 個標籤，每個標籤最多 5 個字">
              <b-taginput id="product-tags" maxlength="5" maxtags="5" v-model="form.tags" placeholder="請輸入標籤"></b-taginput>
            </b-field>
            <b-field label="✦ 尺寸" label-for="product-size" :type="productType.size" message="例：800 × 800，300dpi">
              <b-input id="product-size" v-model="form.size" placeholder="請輸入尺寸"></b-input>
            </b-field>
            <b-field label="✦ 形式" label-for="product-mode" :type="productType.mode" message="例：正比半身單人＋簡單背景">
              <b-input id="product-mode" v-model="form.mode" placeholder="請輸入形式" type="textarea"></b-input>
            </b-field>
            <b-field label="✦ 預計交稿" label-for="product-deadline" :type="productType.deadline" message="例：2個禮拜內">
              <b-input id="product-deadline" v-model="form.deadline" placeholder="請輸入天數或期限"></b-input>
            </b-field>
            <b-field label="✦ 授權範圍" message="授權範圍可複選">
              <div class="block">
                <b-checkbox v-model="form.authorize" native-value="個人收藏使用">個人收藏使用</b-checkbox>
                <b-checkbox v-model="form.authorize" native-value="可縮放裁切">可縮放裁切</b-checkbox>
                <b-checkbox v-model="form.authorize" native-value="可二次加工">可二次加工</b-checkbox>
                <b-checkbox v-model="form.authorize" native-value="可註明出處後發布">可註明出處後發布</b-checkbox>
                <b-checkbox v-model="form.authorize" native-value="可不註明出處發布">可不註明出處發布</b-checkbox>
                <b-checkbox v-model="form.authorize" native-value="可平面印刷">可平面印刷</b-checkbox>
                <b-checkbox v-model="form.authorize" native-value="可製作成立體製品(徽章/立牌/吊飾)">可製作成立體製品(徽章/立牌/吊飾)</b-checkbox>
              </div>
            </b-field>
            <b-field label="✦ 委託流程" label-for="product-process" :type="productType.process" message="例：接受委託邀請 → 草稿（純線稿）→ 草稿過目 → 付訂金或匯全款 → 完稿過目 → 完成交稿">
              <b-input id="product-process" v-model="form.process" placeholder="請輸入流程" maxlength="200" type="textarea"></b-input>
            </b-field>
            <b-field label="✦ 修改次數" label-for="product-modification" :type="productType.modification" message="例：草稿3次，完稿1次">
              <b-input id="product-modification" v-model="form.modification" placeholder="請輸入修改次數" type="textarea"></b-input>
            </b-field>
            <b-field label="✦ 付款方式" label-for="product-payment" :type="productType.payment" message="※必填欄位，例：匯款（郵局）">
              <b-input id="product-payment" v-model="form.payment" placeholder="請選擇付款方式" type="textarea"></b-input>
            </b-field>
            <b-field label="✦ 注意事項描述" label-for="product-notice">
              <b-input id="product-notice" v-model="form.notice" type="textarea"></b-input>
            </b-field>
            <b-field label="✦ 是否上架">
              <div class="block">
                <b-radio v-model="form.sell" name="sell" native-value="true">上架</b-radio>
                <b-radio v-model="form.sell" name="sell" native-value="false">下架</b-radio>
              </div>
            </b-field>
            <div class="buttons">
              <b-button class="is-dark" @click="resetForm" :disabled="modalSubmitting">取消</b-button>
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
      products: [],
      openModal: false,
      modalSubmitting: false,
      form: {
        name: '',
        price: '',
        images: [],
        tags: [],
        size: '',
        mode: '',
        deadline: '',
        authorize: [],
        process: '',
        modification: '',
        payment: '',
        notice: '',
        sell: false,
        _id: '',
        index: -1
      }
    }
  },
  computed: {
    productType () {
      return {
        name: this.form.name.length === 0 ? null : this.form.name.length > 0 && this.form.name.length <= 20 ? 'is-success' : 'is-danger',
        price: this.form.price.length === 0 ? null : 'is-success',
        images: this.form.images.length === 0 ? null : this.form.images.length >= 0 && this.form.images.length <= 5 ? 'is-success' : 'is-danger',
        tags: this.form.tags.length === 0 ? null : this.form.tags.length > 0 && this.form.tags.length <= 5 ? 'is-success' : 'is-danger',
        size: this.form.size.length === 0 ? null : 'is-success',
        mode: this.form.mode.length === 0 ? null : 'is-success',
        deadline: this.form.deadline.length === 0 ? null : 'is-success',
        process: this.form.process.length === 0 ? null : 'is-success',
        modification: this.form.modification.length === 0 ? null : 'is-success',
        payment: this.form.payment.length === 0 ? null : 'is-success'
      }
    },
    productMessage () {
      return {
        images: this.form.images.length > 5 ? '超過上傳上限張數' : this.form._id.length > 0 ? '編輯如需要更改範例圖，請重新上傳所有圖檔' : '※必填欄位，最多可上傳 5 張圖片，每張大小限制為 1MB'
      }
    }
  },
  methods: {
    deleteImage (index) {
      this.form.images.splice(index, 1)
    },
    async submitModal (event) {
      event.preventDefault()
      if (this.form.name.length === 0 || this.form.price.length === 0 || this.form.payment.length === 0) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '缺少必填欄位'
        })
        return
      } else if (this.form.images.length > 5) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '請減少範例圖張數'
        })
        return
      } else if (isNaN(this.form.price)) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '價格只能填數字，不能有符號'
        })
        return
      }

      this.modalSubmitting = true
      const fd = new FormData()
      for (const key in this.form) {
        if (key !== '_id') {
          if (['tags', 'images', 'authorize'].includes(key)) {
            for (const value of this.form[key]) {
              fd.append(key, value)
            }
          } else {
            fd.append(key, this.form[key])
          }
        }
      }

      try {
        if (this.form._id.length === 0) {
          if (this.form.images.length === 0) {
            this.$swal({
              icon: 'error',
              title: '錯誤',
              text: '缺少必填欄位'
            })
            return
          }
          const { data } = await this.api.post('/products', fd, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.products.push(data.result)
        } else {
          const { data } = await this.api.patch('/products/' + this.form._id, fd, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.products[this.form.index] = { ...this.form, images: data.result.images }
          this.$swal({
            icon: 'success',
            title: '成功',
            text: '資料更新成功'
          })
          // 告訴 vue 的 card 要更新
          // this.$refs.card.refresh()
        }
        this.openModal = false
        this.form = {
          name: '',
          price: '',
          images: [],
          tags: [],
          size: '',
          mode: '',
          deadline: '',
          authorize: [],
          process: '',
          modification: '',
          payment: '',
          notice: '',
          sell: false,
          _id: ''
        }
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
      this.modalSubmitting = false
    },
    resetForm (event) {
      if (this.modalSubmitting) {
        event.preventDefault()
        return
      }
      this.form = {
        name: '',
        price: '',
        images: [],
        tags: [],
        size: '',
        mode: '',
        deadline: '',
        authorize: [],
        process: '',
        modification: '',
        payment: '',
        notice: '',
        sell: false,
        _id: ''
      }
      this.openModal = false
    },
    editProduct (index) {
      this.form = { ...this.products[index], images: [], index }
      this.openModal = true
    },
    async deleteProduct (index) {
      try {
        await this.api.delete('/products/' + this.products[index]._id, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.products.splice(index, 1)
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
    try {
      const { data } = await this.api.get('/products/me', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.products = data.result
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得委託項目失敗'
      })
    }
  }
}
</script>

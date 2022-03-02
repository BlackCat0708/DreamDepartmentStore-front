<template>
  <div id="product">
    <div class="overlay" v-if="sell===false">
      <h1>委託項目已下架</h1>
    </div>
    <div class="container">
      <div class="row">
        <!-- 範例圖 -->
        <div class="example-img">
          <b-carousel :autoplay="false" indicator-custom :indicator-inside="false" :overlay="gallery" @click="switchGallery(true)">
            <b-carousel-item v-for="(image, i) in images" :key="i">
              <a class="image">
                <img :src="image">
              </a>
            </b-carousel-item>
            <span v-if="gallery" @click="switchGallery(false)" class="modal-close is-large"/>
            <template #indicators="props">
              <figure class="al image" :draggable="false">
                <img :draggable="false" :src="images[props.i]" :title="props.i">
              </figure>
            </template>
          </b-carousel>
        </div>
        <div class="product-info">
          <!-- 主要資訊 -->
          <div class="product-main">
            <div class="product-title">
              <h1> {{ name }}</h1>
              <router-link :to='"/member/" + illustrator._id ' >
                <div class="illustrator-name">
                  <div class="illustrator-headshot">
                    <img :src="illustrator.headshot">
                  </div>
                  <p>{{ illustrator.nickname }}</p>
                </div>
              </router-link>
            </div>
            <div class="product-tags">
              <b-tag rounded v-for="tag in tags" :key="tag.index">{{ '#' + tag }}</b-tag>
            </div>
            <div class="main-bottom">
              <h2 class="price">{{ 'NT$' + price + '+' }}</h2>
              <b-button class="is-danger" @click="openModal = true">我要委託</b-button>
            </div>
            <hr>
          </div>
          <!-- 次要資訊 -->
          <div class="product-secondary">
            <div class="product-item">
              <div class="product-item-title">
                <span>尺寸</span>
                </div>
              <p class="product-text">{{ size }}</p>
            </div>
            <div class="product-item">
              <div class="product-item-title">
                <span>形式</span>
                </div>
              <p class="product-text">{{ mode }}</p>
            </div>
            <div class="product-item">
              <div class="product-item-title">
                <span>預計交期</span>
                </div>
              <p class="product-text">{{ deadline }}</p>
            </div>
            <div class="product-item">
              <div class="product-item-title">
                <span>授權範圍</span>
                </div>
              <span class="product-text" v-for="text in authorize" :key="text.index">{{ text + ' / ' }}</span>
            </div>
            <div class="product-item">
              <div class="product-item-title">
                <span>委託流程</span>
                </div>
              <p class="product-text">{{ process }}</p>
            </div>
            <div class="product-item">
              <div class="product-item-title">
                <span>修改次數</span>
                </div>
              <p class="product-text">{{ modification }}</p>
            </div>
            <div class="product-item">
              <div class="product-item-title">
                <span>付款方式</span>
                </div>
              <p class="product-text">{{ payment }}</p>
            </div>
            <div class="product-item">
              <div class="product-item-title">
                <span>注意事項</span>
                </div>
              <p class="product-text">{{ notice }}</p>
            </div>
          </div>
        </div>
      </div>

      <b-modal v-model="openModal" width="700px" scroll="keep" @close="resetForm">
          <div class="normal-form">
            <div class="modal-red">
              <h1>委託申請單</h1>
            </div>
            <div class="modal-white">
              <form class="form-group" @submit.prevent="submitModal">
                <b-field label="✦ 需求描述" label-for="description" message="※必填欄位" :type="type.description">
                  <b-input id="description" v-model="form.description" placeholder="請輸入需求描述" type="textarea"></b-input>
                </b-field>
                <b-field label="✦ 參考圖" label-for="images" :type="type.images" :message="message.images">
                  <b-upload id="images" v-model="form.images" multiple drag-drop expanded>
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
                <b-field label="✦ 參考資料來源" label-for="source">
                  <b-input id="source" v-model="form.source" placeholder="請輸入參考資料來源" type="textarea"></b-input>
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      gallery: false,
      openModal: false,
      modalSubmitting: false,
      illustrator: {
        nickname: '',
        headshot: '',
        _id: ''
      },
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
      form: {
        description: '',
        source: '',
        images: [],
        product: '',
        illustrator: ''
      }
    }
  },
  computed: {
    type () {
      return {
        description: this.form.description.length === 0 ? null : 'is-success',
        images: this.form.images.length === 0 ? null : this.form.images.length >= 0 && this.form.images.length <= 5 ? 'is-success' : 'is-danger'
      }
    },
    message () {
      return {
        images: this.form.images.length > 5 ? '超過上傳上限張數' : '最多可上傳 5 張圖片，每張大小限制為 1MB'
      }
    }
  },
  methods: {
    switchGallery (value) {
      this.gallery = value
      if (value) {
        return document.documentElement.classList.add('is-clipped')
      } else {
        return document.documentElement.classList.remove('is-clipped')
      }
    },
    deleteImage (index) {
      this.form.images.splice(index, 1)
    },
    async submitModal (event) {
      if (this.user.token.length === 0) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '請先登入'
        })
        return
      }

      if (this.user.role !== 0) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '身分是委託者才能委託'
        })
        return
      }

      event.preventDefault()
      if (this.form.description.length === 0) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '缺少必填欄位'
        })
        return
      }

      this.form.product = this.$route.params.id
      this.form.illustrator = this.illustrator._id

      this.modalSubmitting = true
      const fd = new FormData()
      for (const key in this.form) {
        if (['images'].includes(key)) {
          for (const value of this.form[key]) {
            fd.append(key, value)
          }
        } else {
          fd.append(key, this.form[key])
        }
      }

      try {
        await this.api.post('/orders', fd, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.openModal = false
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '送出成功'
        })
        this.form = {
          description: '',
          source: '',
          images: []
        }
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '送出失敗'
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
        description: '',
        source: '',
        images: []
      }
      this.openModal = false
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/products/' + this.$route.params.id)
      this.illustrator.nickname = data.result.illustrator.nickname
      this.illustrator.headshot = data.result.illustrator.headshot
      this.illustrator._id = data.result.illustrator._id
      this.name = data.result.name
      this.price = data.result.price
      this.images = data.result.images
      this.tags = data.result.tags
      this.size = data.result.size
      this.mode = data.result.mode
      this.deadline = data.result.deadline
      this.authorize = data.result.authorize
      this.process = data.result.process
      this.modification = data.result.modification
      this.payment = data.result.payment
      this.notice = data.result.notice
      this.sell = data.result.sell
    } catch (error) {
      this.$router.push('/')
    }
  }
}
</script>

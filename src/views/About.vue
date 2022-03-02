<template>
  <div id="about">
    <div class="container">
      <img src="../assets/images/2022011602.jpg">
      <div class="about">
        <div class="about-title">
          <h1>－關於夢百貨－</h1>
          <h3>About Dream Department Store</h3>
        </div>
        <div class="about-row">
          <div class="about-col">
            <div class="circle">
              <img src="../assets/svg/female-solid.svg">
            </div>
            <p>為夢女提供一個委託管道，可以挑選自己喜歡的畫風或創作者</p>
          </div>
          <div class="about-col">
            <div class="circle">
              <img class="brush" src="../assets/svg/paint-brush-solid.svg">
            </div>
            <p>創作者可以在這個平台接委託，並且擁有可以展示作品的地方</p>
          </div>
          <div class="about-col">
            <div class="circle">
              <img class="dollar" src="../assets/svg/search-dollar-solid.svg">
            </div>
            <p>讓想委託的夢女或想接夢向委託的創作者，可以參考大概的價位</p>
          </div>
        </div>
      </div>

      <div class="about-user">
        <div class="about-title">
          <h3 class="pink">委託者篇</h3>
          <h1>－要如何約稿呢－</h1>
          <h3>How to commission？</h3>
        </div>
        <div class="teaching">
          <div class="row">
            <div class="col">
              <img src="../assets/images/0001.jpg">
            </div>
            <div class="col">
              <div class="circle">
                <p>01</p>
              </div>
              <h1>找到喜歡的委託項目，按下「我要委託」！</h1>
              <p>您可以在 <router-link to="/commissionsList">委託列表</router-link> 透過條件搜尋找到你喜歡的委託項目，詳閱內容說明沒有問題就按下「我要委託」按鈕吧！</p>
              <hr>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <img src="../assets/images/0002.jpg">
            </div>
            <div class="col">
              <div class="circle">
                <p>02</p>
              </div>
              <h1>填寫委託申請單，按下「送出」！</h1>
              <p>填寫委託申請單的要領就是要簡潔、明瞭！把您的需求清楚地表達給創作者吧！</p>
              <hr>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <img src="../assets/images/0002.jpg">
            </div>
            <div class="col">
              <div class="circle">
                <p>03</p>
              </div>
              <h1>收到確認了，期待完成圖吧！</h1>
              <p>這時候就算是完成一半了！之後不要忘記要透過創作者提供的付款資訊匯款給創作者喔！</p>
              <hr>
            </div>
          </div>
        </div>
      </div>

      <div class="about-illustrator">
        <div class="about-title">
          <h3 class="pink">創作者篇</h3>
          <h1>－要如何接稿呢－</h1>
          <h3>How to use？</h3>
        </div>
        <div class="teaching">
          <div class="row">
            <div class="col">
              <img src="../assets/images/0101.jpg">
            </div>
            <div class="col">
              <div class="circle">
                <p>01</p>
              </div>
              <h1>到後台的委託項目按下「新增」！</h1>
              <p>您可以在後台隨時新增、編輯或刪除委託項目</p>
              <hr>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <img src="../assets/images/0102.jpg">
            </div>
            <div class="col">
              <div class="circle">
                <p>02</p>
              </div>
              <h1>填寫委託項目表單，按下「送出」！</h1>
              <p>刊登委託項目要有的基本資料、圖片、描述、付款方式等，填寫完成後就能夠進行預覽並刊登！</p>
              <hr>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <img src="../assets/images/0102.jpg">
            </div>
            <div class="col">
              <div class="circle">
                <p>03</p>
              </div>
              <h1>收到委託了，來確認需求單吧！</h1>
              <p>刊登委託後如果收到委託需求就會在「會員中心」顯示， 也能夠在「交易紀錄」頁面進行確認</p>
              <hr>
            </div>
          </div>
        </div>
      </div>

      <div class="qa">
        <div class="about-title">
          <h1>－常見問題－</h1>
          <h3>FAQ</h3>
        </div>
        <b-collapse class="card" animation="slide" v-for="(collapse, index) of collapses" :key="index" :open="isOpen == index" @open="isOpen = index">
          <template #trigger="props">
            <div class="card-header" role="button">
              <p class="card-header-title">{{ collapse.title }}</p>
              <a class="card-header-icon">
                <b-icon :icon="props.open ?  'caret-up' : 'caret-down'"></b-icon>
              </a>
            </div>
          </template>
            <div class="card-content">
              <div class="content">{{ collapse.text }}</div>
            </div>
        </b-collapse>
      </div>

      <div class="contact">
        <div class="about-title">
          <h1>－服務台－</h1>
          <h3>Contact Us</h3>
          <p>請將遇到的問題、想諮詢的內容，或想檢舉的使用者或項目，填寫在下方的表單中並送出，這邊會盡快為您服務！</p>
        </div>
        <form class="form" @submit.prevent="submit">
            <b-field label="✦ 暱稱" label-for="nickname" message="最多可輸入 10 個字">
              <b-input v-model="form.nickname" id="nickname" placeholder="請輸入暱稱" maxlength="10"></b-input>
            </b-field>
            <b-field label="✦ 帳號" label-for="account">
              <b-input v-model="form.account" id="account" placeholder="請輸入帳號"></b-input>
            </b-field>
            <b-field label="✦ 遇到的問題" label-for="question">
              <b-input v-model="form.question" id="question" placeholder="請輸入遇到的問題"></b-input>
            </b-field>
            <b-field label="✦ 描述" label-for="content">
              <b-input v-model="form.content" id="content" type="textarea" placeholder="請輸入問題的詳細描述"></b-input>
            </b-field>
            <b-field label="✦ 附件" label-for="images" :type="productType.images" :message="productMessage.images">
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
            <input type="submit" value="送出" class="button is-success submit" :disabled="submitting">
          </form>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isOpen: 0,
      submitting: false,
      collapses: [
        {
          title: '✦ 我是創作者，但我也想委託他人可以嗎？',
          text: '不好意思，本網站委託者和創作者的使用身分能使用的功能是不一樣的，所以您只能再註冊一個新的委託者帳號分開使用'
        },
        {
          title: '✦ 點擊了網站上一些按鈕，但是沒有反應，這是正常的嗎？',
          text: '本網站為個人作品，有些功能還未完成，因此可能會造成使用上的不方便，還請見諒！目前未完成的功能有：站內信、通知、收藏，請使用者先不要使用！'
        },
        {
          title: '✦ 在使用者後台想新增、編輯、刪除項目，但網頁一直沒有回應怎麼辦？',
          text: '請先確定填寫的文字和上傳的圖片沒有超過限制，或重新整理網頁。如上述的方法都試過了，還是無法解決，請使用下方服務台，或來信至 dreamdepartmentstore2022@gmail.com ，描述您遇到的情況，或把彈出的錯誤訊息截圖下來，這邊會盡快處理！'
        },
        {
          title: '✦ 想上傳更高畫質的圖片可以嗎？為什麼限制在1MB？',
          text: '因為本網站為個人作品，使用免費的資料庫，每個月有圖片的上傳限制，為了能讓更多使用者使用，因此不開放上傳1MB以上的圖片'
        },
        {
          title: '✦ 發現有使用者上傳暴力、裸露、色情的圖片，或有抄襲、盜圖、轉載他人創作等剽竊他人創意之行為等違規爭議時，該如何反應？',
          text: '請使用下方服務台，或來信至 dreamdepartmentstore2022@gmail.com ，簡單描述檢舉項目違反之事項，這邊會盡快處理！'
        }
      ],
      form: {
        nickname: '',
        account: '',
        question: '',
        content: '',
        images: []
      }
    }
  },
  computed: {
    productType () {
      return {
        images: this.form.images.length === 0 ? null : this.form.images.length >= 0 && this.form.images.length <= 5 ? 'is-success' : 'is-danger'
      }
    },
    productMessage () {
      return {
        images: this.form.images.length > 5 ? '超過上傳上限張數' : '最多可上傳 5 張圖片，每張大小限制為 1MB'
      }
    }
  },
  methods: {
    deleteImage (index) {
      this.form.images.splice(index, 1)
    },
    async submit (event) {
      event.preventDefault()
      if (this.form.images.length > 5) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '請減少附件圖片張數'
        })
        return
      }

      this.submitting = true
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
        await this.api.post('/questions', fd, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '發送成功'
        })
        this.form = {
          nickname: '',
          account: '',
          question: '',
          content: '',
          images: []
        }
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '發送失敗'
        })
      }
      this.submitting = false
    }
  }
}
</script>

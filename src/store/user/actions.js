import { api } from '@/plugins/axios.js'
import swal from 'sweetalert2'
import router from '@/router'

export const login = async ({ commit }, form) => {
  try {
    const { data } = await api.post('/users/login', form)
    // 這邊的 'login' 是 mutations 裡的 login
    commit('login', data.result)
    swal.fire({
      imageUrl: 'https://res.cloudinary.com/duplahipf/image/upload/v1644452906/%E5%A4%A2%E7%99%BE%E8%B2%A8logo_mxa6fd.png',
      imageWidth: 400,
      text: '歡迎光臨，夢百貨！'
    })
  } catch (error) {
    swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.response.data.message
    })
  }
}

export const logout = async ({ commit, state }) => {
  try {
    await api.delete('/users/logout', {
      headers: {
        authorization: 'Bearer ' + state.token
      }
    })
    commit('logout')
    router.push('/')
  } catch (error) {
    swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.response.data.message
    })
  }
}

export const getUserInfo = async ({ commit, state }) => {
  if (state.token.length === 0) return
  try {
    const { data } = await api.get('/users/me', {
      headers: {
        authorization: 'Bearer ' + state.token
      }
    })
    commit('getUserInfo', data.result)
  } catch (error) {
    commit('logout')
  }
}

export const editInfo = async ({ commit, state }, data) => {
  if (state.token.length === 0) {
    swal.fire({
      icon: 'error',
      title: '錯誤',
      text: '請先登入'
    })
    router.push('/login')
    return
  }

  try {
    const { data: resData } = await api.patch('/users/myinfo', data, {
      headers: {
        authorization: 'Bearer ' + state.token
      }
    })
    swal.fire({
      icon: 'success',
      title: '成功',
      text: '資料更新成功'
    })
    commit('editInfo', resData.result)
  } catch (error) {
    swal.fire({
      icon: 'error',
      title: '錯誤',
      text: error.response.resData.message
    })
  }
}

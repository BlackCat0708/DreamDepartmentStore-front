// state = user module 的 state
// this.state = vuex root state
// this.state.module名 = 其他 module 的 state
export const login = (state, data) => {
  state.token = data.token
  state.account = data.account
  state.role = data.role
  state.nickname = data.nickname
  state.headshot = data.headshot
  state._id = data._id
}

export const logout = (state, data) => {
  state.token = ''
  state.account = ''
  state.role = 0
  state.nickname = ''
  state.headshot = ''
}

export const getUserInfo = (state, data) => {
  state.account = data.account
  state.role = data.role
  state.nickname = data.nickname
  state.headshot = data.headshot
  state._id = data._id
}

export const extend = (state, data) => {
  state.token = data
}

export const editInfo = (state, data) => {
  state.nickname = data.nickname
  state.headshot = data.headshot
}

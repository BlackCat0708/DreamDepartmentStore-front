export const user = (state) => {
  return {
    isLogin: state.token.length > 0,
    isUser: state.role === 0,
    isIllustrator: state.role === 1,
    isAdmin: state.role === 2,
    ...state
  }
}

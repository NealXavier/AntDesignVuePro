// 用户user , 管理员 admin , 游客 guest
const currentAuth = ["admin"]
// const currentAuth = ["user"]

export {currentAuth}

export function getCurrentAuthority(){
  return currentAuth
}

export function check(authority){
  const current = getCurrentAuthority()
  return current.some(item=>authority.includes(item))  
}

export function isLogin(){
  const current = getCurretnAuthority()
  return current && current[0] !== 'guest'
}
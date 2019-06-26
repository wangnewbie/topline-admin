const USER_KEY = 'user_info'
export function getUser () {
  return JSON.parse(window.localStorage.getItem(USER_KEY))
}
export function setUser (data) {
  return window.localStorage.setItem(USER_KEY, JSON.stringify(data))
}
export function removeUser () {
  return window.localStorage.removeItem(USER_KEY)
}

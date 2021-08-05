import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    // url: '/api/login/loginIn',
    url: '/MongoLogApi/Login',
    method: 'post',
    params: data
    // baseURL: apiUrl
  })
}

// 获取用户信息
export function getInfo(token) {
  return request({
    // url: '/api/login/getUserInfo',
    url: '/MongoLogApi/getUserInfo',
    method: 'post',
    params: { token }
  })
}

// 退出
export function logout() {
  return request({
    // url: '/api/login/loginOut',
    url: '/MongoLogApi/loginOut',
    method: 'post'
  })
}

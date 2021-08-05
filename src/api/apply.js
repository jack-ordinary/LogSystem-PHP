import request from '@/utils/request'
import apiUri from '@/apiUri.js'

// show Apply lisy Data
export function showApplyList(data) {
  return request({
    url: '/api/v1/applyList',
    method: 'post',
    params: data
    // baseURL: apiUri
  })
}

// Destory Apply Data
export function destory(aid) {
  return request({
    url: '/api/v1/delApplyData',
    method: 'post',
    params: { aid }
    // baseURL: apiUri
  })
}


import request from '@/utils/request'
import apiUri from '@/apiUri.js'

export function getToken() {
  return request({
    url: '/api/v1/photoUploadSingle', // 假地址 自行替换
    method: 'get',
    baseURL: apiUri
  })
}

// 上传图片到服务器
export function addFile(file) {
  return request({
    url: '/api/v1/photoUploadSingle',
    method: 'post',
    params: { file },
    baseURL: apiUri
  })
}

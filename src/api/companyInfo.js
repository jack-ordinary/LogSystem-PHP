import request from '@/utils/request'
import apiUri from '@/apiUri.js'

// 添加/更新企业信息
export function storeCompanyInfo(queue) {
  return request({
    url: '/api/v1/companyStore',
    method: 'post',
    params: queue,
    baseURL: apiUri
  })
}

// 显示企业信息
export function showCompanyInfo() {
  return request({
    url: '/api/v1/showCompanyInfo',
    method: 'post',
    params: '',
    baseURL: apiUri
  })
}

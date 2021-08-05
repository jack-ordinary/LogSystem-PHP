import request from '@/utils/request'
import apiUri from '@/apiUri.js'

// 添加图片分类
export function addImageCategory(name) {
  return request({
    url: '/api/v1/addImageCategory',
    method: 'post',
    params: { name },
    baseURL: apiUri
  })
}

// 显示图片分类列表
export function showImageCategory(queue) {
  return request({
    url: '/api/v1/showImageCategory',
    method: 'post',
    params: queue,
    baseURL: apiUri
  })
}

// 轮播图片添加
export function addBannerImage(cid, title, img_url) {
  return request({
    url: '/api/v1/addBannerImage',
    method: 'post',
    params: { cid, title, img_url },
    baseURL: apiUri
  })
}

// 显示所有分类或者对应分类下的图片列表
export function showImageBanner(queue) {
  return request({
    url: '/api/v1/showImageBanner',
    method: 'post',
    params: queue,
    baseURL: apiUri
  })
}

// 图片删除
export function delImageBanner(iid) {
  return request({
    url: '/api/v1/delImageBanner',
    method: 'post',
    params: { iid },
    baseURL: apiUri
  })
}

// 图片详情
export function detailImage(iid) {
  return request({
    url: '/api/v1/detailImageBanner',
    method: 'post',
    params: { iid },
    baseURL: apiUri
  })
}

// 图片编辑
export function editImageBanner(id, cid, title, img_url) {
  return request({
    url: '/api/v1/editImageBanner',
    method: 'post',
    params: { id, cid, title, img_url },
    baseURL: apiUri
  })
}

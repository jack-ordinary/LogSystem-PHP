import request from '@/utils/request'
import apiUri from '@/apiUri.js'

// 添加分类
export function addCates(name) {
  return request({
    url: '/api/v1/categoryStore',
    method: 'post',
    params: { name },
    baseURL: apiUri
  })
}

// 分类列表
export function showCates(query) {
  return request({
    url: '/api/v1/showCates',
    method: 'post',
    params: query,
    baseURL: apiUri
  })
}

// 发布文章
export function articlePublish(query) {
  return request({
    url: '/api/v1/articleStore',
    method: 'post',
    params: query,
    baseURL: apiUri
  })
}

// 文章列表
export function fetchList(query) {
  return request({
    url: '/api/v1/articleList',
    method: 'post',
    params: query,
    baseURL: apiUri
  })
}

// 删除文章
export function deleteArticle(aid) {
  return request({
    url: '/api/v1/articleDestory',
    method: 'post',
    params: { aid },
    baseURL: apiUri
  })
}

// 文章详情
export function fetchArticle(aid) {
  return request({
    url: '/api/v1/articleDetails',
    method: 'post',
    params: { aid },
    baseURL: apiUri
  })
}

// 更新文章
export function updateArticle(data) {
  return request({
    url: '/api/v1/articleUpdate',
    method: 'post',
    data,
    baseURL: apiUri
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}


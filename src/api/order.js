import request from '@/utils/request'

// 获取渠道商历史所有订单数量
export function GetAllOrderAmount(data) {
  return request({
    // url: '/api/OrderReport/GetAllOrderAmount',
    url: '/MongoLogApi/getUserInfo',
    method: 'post',
    params: data
  })
}

// 获取渠道商当日订单数量
export function GetOrderAmountToday(data) {
  return request({
    url: '/api/OrderReport/GetOrderAmountToday',
    method: 'post',
    params: data
  })
}

// 获取渠道商当周订单数量
export function GetOrderAmountWeek(data) {
  return request({
    url: '/api/OrderReport/GetOrderAmountWeek',
    method: 'post',
    params: data
  })
}

// 获取渠道商当月订单数量
export function GetOrderAmountMonth(data) {
  return request({
    // url: '/api/OrderReport/GetAllOrderAmount',
    url: '/MongoLogApi/GetAllOrderAmount',
    method: 'post',
    data
  })
}

// 获取渠道商当日订单数据报告
export function GetOrderDataReport(data) {
  return request({
    url: '/MongoLogApi/GetOrderDataReport',
    method: 'post',
    data
  })
}

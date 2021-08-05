import request from '@/utils/request'

// 获取渠道商历史所有订单数量
export function ShowMongoLog(data) {
  return request({
    url: '/MongoLogApi/ShowMongoLog',
    method: 'post',
    data
  })
}

// 获取渠道商以及其城市分类列表
export function GetChannelCityCategory(data) {
  return request({
    url: '/MongoLogApi/GetChannelCityCategory',
    method: 'post',
    data
  })
}

// 获取Api条件的搜索列表
export function ShowApiTypeList(data) {
  return request({
    url: '/MongoLogApi/ShowApiTypeList',
    method: 'post',
    data
  })
}

import request from '@/utils/request'

// Insert dictionary category
export function InsertCategory(data) {
  return request({
    url: '/MongoLogApi/InsertCategory',
    method: 'post',
    data
  })
}

// SHow dictionary Data
export function GetDictionaryData(data) {
  return request({
    url: '/MongoLogApi/GetDictionaryData',
    method: 'post',
    data
  })
}

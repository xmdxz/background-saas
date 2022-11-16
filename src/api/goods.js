import request from "@/utils/request";

export function getAll(param) {
  return request({
    url: '/goods/page',
    method: 'get',
    params: {
      ...param
    }
  })
}


export function deleteGoods(id) {
  return request({
    url: '/goods/delete',
    method: 'get',
    params: {
      id: id
    }
  })
}

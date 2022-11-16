import request from "@/utils/request";

export function getAll(param) {
  return request({
    url: '/dynamic/page',
    method: 'get',
    params: {
      keywords: param.keywords,
      current: param.current,
      size: param.size
    }
  })
}



export function deleteDynamic(id) {
  return request({
    url: '/dynamic/delete',
    method: 'get',
    params: {
      id: id
    }
  })
}


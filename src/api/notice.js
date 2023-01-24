import request from "@/utils/request";

export function findNotice(data) {
  return request({
    url: '/back/feedback/page',
    method: 'get',
    params: {
      current: data.current,
      size: data.size
    }
  })
}

export function addNotice(data) {
  return request({
    url: '/notice/add',
    method: 'post',
    data
  })
}

export function deleteNotice(id) {
  return request({
    url: '/notice/delete',
    method: 'get',
    params: {
      id: id
    }
  })
}


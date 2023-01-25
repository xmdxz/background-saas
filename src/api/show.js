import request from '@/utils/request'

export function getShowList(data) {
  return request({
    url: '/show/getShowList',
    method: 'get',
    params: {
      current: data.current,
      size: data.size,
      showName: data.showName,
      city: data.city,
      type: data.type
    }
  })
}

export function addShow(data) {
  return request({
    url: '/show/addShow',
    method: 'post',
    data
  })
}

export function getShowById(id) {
  return request({
    url: '/show/getShowDetail',
    method: 'get',
    params: {
      id: id
    }
  })
}

export function deleteShow(id) {
  return request({
    url: '/show/deleteShow',
    method: 'get',
    params: {
      id: id
    }
  })
}

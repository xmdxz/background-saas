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

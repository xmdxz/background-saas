import request from "@/utils/request";

export function getSwiperList() {
  return request({
    url: '/swiper/getSwiperListForManage',
    method: 'get'
  })
}

export function addSwiper(data) {
  return request({
    url: '/swiper/addSwiper',
    method: 'post',
    data
  })
}

export function deleteSwiper(id) {
  return request({
    url: '/swiper/deleteSwiper',
    method: 'get',
    params: {
      id: id
    }
  })
}

export function updateStatus(data) {
  return request({
    url: '/swiper/updateStatus',
    method: 'get',
    params: {
      id: data.id,
      status: data.status
    }
  })
}

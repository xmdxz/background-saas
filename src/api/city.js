import request from "@/utils/request";

export function getCityList() {
  return request({
    url: '/city/getCity',
    method: 'get'
  })
}

export function getCityListByPage(data) {
  return request({
    url: '/city/getCityForManage',
    method: 'get',
    params: {
      cityName: data.cityName,
      current: data.current,
      size: data.size
    }
  })
}

export function addCity(data) {
  return request({
    url: '/city/addCity',
    method: 'post',
    data
  })
}

export function deleteCity(id) {
  return request({
    url: '/city/deleteCity',
    method: 'get',
    params: {
      id: id
    }
  })
}

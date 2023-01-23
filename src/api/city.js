import request from "@/utils/request";

export function getCityList() {
  return request({
    url: '/city/getCity',
    method: 'get'
  })
}

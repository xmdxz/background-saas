import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/back/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: {token}
  })
}

export function getPageUser(data) {
  return request({
    url: '/back/user/page',
    method: 'get',
    params: {
      ...data
    }
  })
}

export function deleteUser(id) {
  return request({
    url: '/back/user/deleteUser',
    method: 'get',
    params: {id}
  })
}


export function addUser(data) {
  return request({
    url: '/back/user/add',
    method: 'post',
    data
  })
}


export function listImage(data) {
  return request({
    url: '/back/index/images',
    method: 'get'
  })
}

export function addImage(data) {
  return request({
    url: '/back/index/add',
    method: 'get',
    params: {
      image: data
    }
  })
}

export function deleteIndex(data) {
  return request({
    url: '/back/index/delete',
    method: 'get',
    params: {
      id: data
    }
  })
}

export function deleteCoupon(data) {
  return request({
    url: '/back/coupon/delete',
    method: 'get',
    params: {
      id: data
    }
  })
}

export function addCoupon(data) {
  return request({
    url: '/back/coupon/add',
    method: 'post',
    data
  })
}

export function pageCoupon(data) {
  return request({
    url: '/back/coupon/page',
    method: 'post',
    data
  })
}

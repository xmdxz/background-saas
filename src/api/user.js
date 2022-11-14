import request from '@/utils/request'
import da from "element-ui/src/locale/lang/da";

export function login(data) {
  return request({
    url: '/login/back',
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

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function getPageUser(data) {
  return request({
    url: '/user/page',
    method: 'get',
    params: {
      ...data
    }
  })
}

export function deleteUser(id) {
  return request({
    url: '/user/deleteUser',
    method: 'get',
    params: {id}
  })
}

export function resetPassword(id) {
  return request({
    url: '/gmy/user/resetPassword',
    method: 'get',
    params: {id}
  })
}

export function addUser(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}


export function listImage(data) {
  return request({
    url: '/index/images',
    method: 'get'
  })
}

export function addImage(data) {
  return request({
    url: '/index/add',
    method: 'get',
    params: {
      image: data
    }
  })
}

export function deleteIndex(data) {
  return request({
    url: '/index/delete',
    method: 'get',
    params: {
      id: data
    }
  })
}

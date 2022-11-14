import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/gmy/user/login',
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

export function getAllSuperUser(data) {
  return request({
    url: '/gmy/user/getAll',
    method: 'post',
    data
  })
}

export function deleteUser(id) {
  return request({
    url: '/gmy/user/delete',
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
    url: '/gmy/user/add',
    method: 'post',
    data
  })
}

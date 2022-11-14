import request from "@/utils/request";

export function getAll(param) {
  return request({
    url: '/goods/page',
    method: 'get',
    params: {
      ...param
    }
  })
}

export function addTeacher(data) {
  return request({
    url: '/gmy/teacher/add',
    method: 'post',
    data
  })
}

export function getTeacherById(id) {
  return request({
    url: '/gmy/teacher/getTeacherById',
    method: 'get',
    params: {
      id: id
    }
  })
}

export function deleteGoods(id) {
  return request({
    url: '/goods/delete',
    method: 'get',
    params: {
      id: id
    }
  })
}

export function getAllTeacher() {
  return request({
    url: '/gmy/teacher/getAllTeacher',
    method: 'get'
  })
}

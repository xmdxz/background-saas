import request from "@/utils/request";

export function getAll(param) {
  return request({
    url: '/gmy/teacher/findTeacherUser',
    method: 'get',
    params: {
      teacherName: param.teacherName,
      current: param.current,
      size: param.size
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

export function deleteTeacherById(id) {
  return request({
    url: '/gmy/teacher/delete',
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

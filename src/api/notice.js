import request from "@/utils/request";

export function findNotice(data) {
  return request({
    url: '/gmy/notice/findAllNotice',
    method: 'get',
    params: {
      title: data.title,
      current: data.current,
      size: data.size
    }
  })
}

export function addNotice(data) {
  return request({
    url: '/gmy/notice/addNotice',
    method: 'post',
    data
  })
}

export function deleteNotice(id) {
  return request({
    url: '/gmy/notice/delete',
    method: 'get',
    params: {
      id: id
    }
  })
}

export function getCourse(id) {
  return request({
    url: '/gmy/course/getCourseById',
    method: 'get',
    params: {
      id: id
    }
  })
}

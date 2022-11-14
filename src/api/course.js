import request from "@/utils/request";

export function findCourse(data) {
  return request({
    url: '/gmy/course/findCourse',
    method: 'get',
    params: {
      courseNameOrTeacher: data.courseNameOrTeacher,
      current: data.current,
      size: data.size
    }
  })
}

export function addCourse(data) {
  return request({
    url: '/gmy/course/addCourse',
    method: 'post',
    data
  })
}

export function deleteCourse(id) {
  return request({
    url: '/gmy/course/delete',
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

export function findCourseVipUser(id) {
  return request({
    url: '/gmy/course/findCourseVipUser',
    method: 'get',
    params: {
      id: id
    }
  })
}

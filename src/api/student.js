import request from "@/utils/request";

export function getAll(param) {
  return request({
    url: '/dynamic/page',
    method: 'get',
    params: {
      keywords: param.keywords,
      current: param.current,
      size: param.size
    }
  })
}

export function add(data) {
  return request({
    url: '/gmy/vipUser/add',
    method: 'post',
    data
  })
}

export function getVipUserById(id) {
  return request({
    url: '/gmy/vipUser/getVipUserById',
    method: 'get',
    params: {
      id: id
    }
  })
}

export function deleteDynamic(id) {
  return request({
    url: '/dynamic/delete',
    method: 'get',
    params: {
      id: id
    }
  })
}

export function updateStudentById(data) {
  return request({
    url: '/gmy/vipUser/updateVipTime',
    method: 'post',
    data
  })
}


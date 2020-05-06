import {request} from './req'

export function getTitleByDTO(titleDTO,page){
  return request({
    url:'/title/getTitleByDTO',
    method:'post',
    data:{
      titleDTO,page
    }
  })
}

export function updateTitleData(titleDTO){
  return request({
    url:'/title/updateTitleData',
    method:'post',
    data:{
      titleDTO
    }
  })
}
export function delectTitle(titleId){
  return request({
    url:'/title/delectTitle',
    params:{
      titleId
    }
  })
}
export function getTitleList(userId,page){
  return request({
    url:'/title/getTitleList',
    method:'post',
    data:{
      userId,page
    }
  })
}
export function selectTitle(userId,titleId){
  return request({
    url:'/title/selectTitle',
    params:{
      userId,titleId
    }
  })
}
export function cancelTitle(userId,titleId){
  return request({
    url:'/title/cancelTitle',
    params:{
      userId,titleId
    }
  })
}
export function getStudentTitle(userId){
  return request({
    url:'/title/getStudentTitle',
    params:{
      userId
    }
  })
}

export function confirmStudentTitle(titleId){
  return request({
    url:'/title/confirmStudentTitle',
    params:{
      titleId
    }
  })
}

export function cancelStudentTitle(titleId){
  return request({
    url:'/title/cancelStudentTitle',
    params:{
      titleId
    }
  })
}

export function getTeacherTitle(userId,page){
  return request({
    url:'/title/getTeacherTitle',
    method:'post',
    data:{
      userId,page
    }
  })
}
import {request} from './req'

export function uploadUser(url){
  return request({
    url:'/uploadOrDownload/uploadUser',
    method:'get',
    params:{
      url
    }
  })
}
export function uploadTitle(url){
  return request({
    url:'/uploadOrDownload/uploadTitle',
    method:'get',
    params:{
      url
    }
  })
}

export function uploadStudentFile(titleId,studentFileEnum,url){
  return request({
    url:'/uploadOrDownload/uploadStudentFile',
    method:'get',
    params:{
      titleId,studentFileEnum,url
    }
  })
}
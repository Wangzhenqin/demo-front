import {request} from './req'

export function getDirectory(userType){
  return request({
    url:'/user/getDirectory',
    params:{
      userType
    }
  })
}
export function enter(userId,code){
  return request({
    url:'/user/enter',
    params:{
      userId,code
    }
  })
}
export function getFaculty(){
  return request({
    url:'/title/getFaculty',
    params:{
    }
  })
}
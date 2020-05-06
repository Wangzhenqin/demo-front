import {request} from './req'

export function selectUser(userId,userType,facultyId,name,page){
  return request({
    url:'/user/selectUser',
    method:'post',
    data:{
      userId,userType,facultyId,name,page
    }
  })
}

export function updateUserData(userDTO){
  return request({
    url:'/user/updateUserData',
    method:'post',
    data:{
      userDTO
    }
  })
}
export function delectUser(userId){
  return request({
    url:'/user/delectUser',
    params:{
      userId
    }
  })
}
export function judgeComeInModule(userId,JudgeEnum){
  return request({
    url:'/user/judgeComeInModule',
    params:{
      userId,JudgeEnum
    }
  })
}
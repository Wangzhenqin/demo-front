import {request} from './req'

export function getimeList(pageNum,pageSize){
  return request({
    url:'/time/getimeList',
    params:{
      pageNum,pageSize
    }
  })
}

export function updateTime(userId,event,startTime,endTime){
  return request({
    url:'/time/updateTime',
    params:{
      userId,event,startTime,endTime
    }
  })
}
import Mock from 'mockjs'

import homeApi from './mockServerData/home'
import userApi from './mockServerData/user'
import permissionApi from './mockServerData/permission'
import mallApi from './mockServerData/mall'
Mock.mock('/api/home/getData', homeApi.getStatisticalData)
// Mock.mock('/api/user/getUser', userApi.getUserList)


//Mock.mock(/api\/user\/getUser/, 'get', userApi.getUserList)
// 权限相关
Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)

//获取user信息
Mock.mock(/user\/add/, 'post', userApi.createUser)
Mock.mock(/user\/edit/, 'post', userApi.updateUser)
Mock.mock(/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/user\/del/, 'get', userApi.deleteUser)
Mock.mock(/mall\/getMall/ , 'get' , mallApi.getMallList)


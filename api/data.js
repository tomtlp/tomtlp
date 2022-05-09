import axios from './axios'

// export const getMenu = () => {
//   return axios.request({
//     url: 'menu',
//     method: 'get'
//   })
// }
export const getData=()=>{
  return axios.request({
    url: '/home/getData',
    method:'get'
  })
}

export const getHome = () => {
  return axios.request({
    url: '/home/getData',
    method: 'get'
  })
}

export const getUser = (params) => {
  return axios.request({
    url: '/user/getUser',
    method: 'get',
    params
  })
}
export const getMall= (params) => {
  return axios.request({
    url: '/mall/getMall',
    method: 'get',
    data:params
  })
}
export const getMenu = (params) => {
  return axios.request({
    url: '/permission/getMenu',
    method: 'post',
    data: params
  })
}

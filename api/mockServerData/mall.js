import Mock from 'mockjs'
function param2Obj (url) {
    const search = url.split('?')[1]
    if (!search) {
      return {}
    }
    return JSON.parse(
      '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
    )
  }
let List = []
const count = 100
for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      name: Mock.Random.cname(),
      price: Mock.Random.float(10, 10000),
      weight: Mock.Random.integer(0, 100),
      createTime: Mock.Random.time(),
      detail:Mock.Random.string(10),
    })
  )
}
export default {
    /**
     * 获取列表
     * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
     * @param name, page, limit
     * @return {{code: number, count: number, data: *[]}}
     */
    getMallList: config => {
      const { name, page = 1, limit = 20 } = param2Obj(config.url)
      console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit)
      const mockList = List.filter(user => {
        if (name && user.name.indexOf(name) === -1 && user.addr.indexOf(name) === -1) return false
        return true
      })
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        count: mockList.length,
        list: pageList
      }
    },
}
// function param2Obj (url) {
//     const search = url.split('?')[1]
//     if (!search) {
//       return {}
//     }
//     return JSON.parse(
//       '{"' +
//       decodeURIComponent(search)
//         .replace(/"/g, '\\"')
//         .replace(/&/g, '","')
//         .replace(/=/g, '":"') +
//       '"}'
//     )
//   }
// export default {
//     List
//     // getMallList: config => {
//     //     const { name, page = 1, limit = 20 } = param2Obj(config.url)
//     //     console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit)
//     //     const mockList = List.filter(user => {
//     //       if (name && user.name.indexOf(name) === -1 && user.addr.indexOf(name) === -1) return false
//     //       return true
//     //     })
//     //     const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
//     //     return {
//     //       code: 20000,
//     //       count: mockList.length,
//     //       list: pageList
//     //     }
//     //   },
// }
// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    // 先取出集合记录总数
    const countResult = await db.collection('order').count()
    const total = countResult.total
    if (event.len == total) {
      return "wu"
    }
    // const tasks = []
    const a = await db.collection('order').orderBy('update_time', 'desc').skip(event.len).limit(event.number).get()
    // console.log(a.data)
    return a.data




  } catch (error) {
    console.log(error)
  }

}
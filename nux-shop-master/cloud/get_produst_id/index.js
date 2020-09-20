// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {

  try {

  const a = await db.collection('product').field({
    _openid: true,
    product_name: true,
    product_img: true,
  }).get({
    success: function(res) {
      console.log(res)
      return res
    },
    fail:function(err){
      console.log(err)
      return err
    }
  })
  console.log(a.data)
  return a.data

} catch (error) {
    console.log(error)
}
}
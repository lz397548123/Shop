// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  db.collection('order').doc(event._id).update({
    data: {
      update_time:new Date(),
      order_status:"已发货"
    },
    success: function(res) {
      return res
    },
    fail:function(err){
      return err
    }
  })
}
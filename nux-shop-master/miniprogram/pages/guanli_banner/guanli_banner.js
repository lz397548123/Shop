// pages/guanli_banner/guanli_banner.js
import {
  IndexModel
} from "../../models/IndexModel.js"
// import { fail } from "assert"
let indexModel = new IndexModel()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [], //商品的id
    banners: [], //轮播图
    photo: '', //照片的临时地址
    linshi: {} //存放临时的商品id数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取商品的id
    wx.cloud.callFunction({
      name: "get_produst_id",
      data: {

      },
      success: (res) => {
        console.log(res.result)
        this.setData({
          list: res.result
        })
      },
      fail: (err) => {
        console.log(err)
      }
    })
    this.shuju()
  },

  // 获取轮播图的数据
  shuju: function () {
    indexModel.getBanner(res => {
      this.setData({
        banners: res.result.data.data
      })
      console.log("获取轮播图数据", this.data.banners)
    })
  },
  // // 
  // photo: function () {
  
  //   wx.chooseImage({
  //     count: 1,
  //     success(res) {
  //       console.log(res)
  //       // tempFilePath可以作为img标签的src属性显示图片
  //       that.setData({
  //         photo: res.tempFilePaths
  //       })
  //     },
  //   })

  // },
 //上传图片 点击选择照片
 photo() {
  let that = this;
  let timestamp = (new Date()).valueOf();
  wx.chooseImage({
   success: chooseResult => {
    wx.showLoading({
     title: '上传中。。。',
    })
    // 将图片上传至云存储空间
    wx.cloud.uploadFile({
     // 指定上传到的云路径
     cloudPath: timestamp + '.png',
     // 指定要上传的文件的小程序临时文件路径
     filePath: chooseResult.tempFilePaths[0],
     // 成功回调
     success: res => {
      console.log('上传成功', res)
      wx.hideLoading()
      wx.showToast({
       title: '上传图片成功',
      })
      if (res.fileID) {
       that.setData({
        photo: res.fileID,
        // zhaopian: '图片如下',
        // imgUrl: res.fileID
       })
      }
      console.log(that.data.photo)
     },
    })
   },
  })
 },

  // 点击 跳转到选择商品id的界面
  product1: function (e) {
    // const product = JSON.stringify(this.data.list)
    const that = this
    wx.navigateTo({
      url: '/pages/guanli_bannerid/guanli_bannerid',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function (data) {
          console.log("选择商品页面传来的数据;", data.data)
          that.setData({
            linshi: {
              name: data.data.product_name,
              product_id: data.data._id,
              // _id: data.data._id.substring(0,26),
              image: that.data.photo
            }
          })
          console.log("合成的选手：", that.data.linshi)

        },
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          data: that.data.list
        })
      }
    })
  },

  //点击确定
  addbutton: function () {
    db.collection("banner").add({
      data: {
        image: this.data.linshi.image,
        name: this.data.linshi.name,
        product_id: this.data.linshi.product_id,
        show:true,
        create_time:new Date(),
        update_time:new Date()
      }
    }).then(res => {
      this.setData({
        banners: this.data.banners.concat(this.data.linshi),
        linshi: {},
        photo: "",
      })
    })
    .catch(err=>{
      console.log(err)
    })
  },

// 点击删除
  shanchu:function(e){
    const that = this
    wx.showModal({
      title: '提示',
      content: '确定删除吗？',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.cloud.callFunction({
            name: "guanli_shanchu_pro",
            data: {
              doc:"banner",
              id: e.currentTarget.dataset.shanchu._id
            },
            success(res1) {
              console.log("删除成功！",res1)
              wx.showToast({
                title: "删除成功！",
              })
              that.onLoad()
            },
            fail(err) {
              console.log("删除失败！",err)
              wx.showToast({
                title: "删除失败！",
              })            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
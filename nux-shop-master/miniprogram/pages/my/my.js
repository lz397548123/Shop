// pages/my/my.js
import {
  OrderModel
} from '../../models/OrdelModel.js'
let orderModel = new OrderModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    defaultImg: '../../images/my/header.png',
    orders: []
  },

    // 初始化
    _init: function () {
      console.log("my获取数据")
      wx.getSetting({
        success:(res)=> {
          if (res.authSetting['scope.userInfo']) {
            // 获取订单信息
            orderModel.getOrderList(res => {
              this.setData({
                orders: res.result.data.data
              })
              console.log(this.data.orders)
            })
  
            // 获取用户信息  
            wx.getUserInfo({
              success: (res) =>{
               this.setData({
                userInfo:res.userInfo
               })
               console.log("获取用户信息：",res)
              },
              fail:(err)=>{
                console.log("获取用户信息失败：",err)
              }
            })
          }
        },
        fail:(err)=>{
          console.log("获取订单信息失败：",err)
        }


      })
    },
    // 订单页面
    details: function (event) {
      // console.log(event.currentTarget.dataset.details)
      const order1 = JSON.stringify(event.currentTarget.dataset.details)
      wx.navigateTo({
        url: '/pages/order_details/order_details?order2=' + order1
      })
    },
  
    // 用户信息获取
    getuserinfo:function(event){
     console.log("获取用户信息"),
        // 获取用户信息  
        wx.getUserInfo({
          success: (res) =>{
           this.setData({
            userInfo:res.userInfo
           })
           console.log("获取用户信息：",res)
          },
          fail:(err)=>{
            console.log("获取用户信息失败：",err)
          }
        })

      console.log(event.detail.userInfo)
      this.setData({
        userInfo:event.detail.userInfo
      })
    },


// 点击复制
  copy:function(){
    wx.setClipboardData({
      data: 'xiaomt666',
      success (res) {
        wx.getClipboardData({
          success (res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  // 点击打电话
  phono:function(){
    wx.makePhoneCall({
      phoneNumber: '134000000' //仅为示例，并非真实的电话号码
    })
  },

  // 点击进入管理员界面
  guanli:function(){
    wx.navigateTo({
      url: "/pages/guanli/guanli",
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  
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
    this._init();
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

  },


})
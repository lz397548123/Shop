// pages/guanli/guanli.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
//
  add:function(){
wx.navigateTo({
  url: '/pages/guanli_add_product/guanli_add_product',
})
  },
  product:function(){
    wx.navigateTo({
      url: '/pages/guanli_list/guanli_list',
    })
  },
  order_list:function(){
    wx.navigateTo({
      url: '/pages/guanli_orderlist/guanli_orderlist',
    })
  },
  banner:function(){
    wx.navigateTo({
      url: '/pages/guanli_banner/guanli_banner',
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
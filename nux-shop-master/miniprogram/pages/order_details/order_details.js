// pages/order_details/order_details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {},
    backgroundcolor: '#1aad19',
    order_status: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      order: JSON.parse(options.order2)
    })
    this.data.order_status = this.data.order.order_status
    console.log(this.data.order)
    if (this.data.order_status === "已收货") {
      this.setData({
        backgroundcolor: '#b6eeb6'
      })
    }
  },

  // 确认收货
  fahuo: function () {
    const id = this.data.order._id
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: 'shouhuo',
      data: {
        id: id
      },
      success: (res) => {
        this.setData({
          backgroundcolor: "#b6eeb6",
          order_status: "已收货"
        })
        wx.showToast({
          title: '收货成功！',
        })
        wx.hideLoading({});
      },
      fail: (err) => {
        wx.hideLoading({})
        console.log(err)
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
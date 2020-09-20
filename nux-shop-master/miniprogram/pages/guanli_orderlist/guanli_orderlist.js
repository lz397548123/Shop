// pages/my/my.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    // 数据的总条数
    totalNum: -1,

  },
  // 获取信息
  getDataList: function () {
    let len = this.data.list.length
    console.log("调用获取信息的函数,没有获取数据前数组的长度", len)
    wx.cloud.callFunction({
      name: 'guanli_order',
      data: {
        len: len,
        number: 7 //每次取得数量
      },
      success: (res) => {
        console.log(res.result)
        if (res.result === "wu") {
          wx.showToast({
            title: '人家已经到底啦！',
            icon: "none",
          })
        } else {
          this.setData({
            list: this.data.list.concat(res.result)
          })
        }
      },
      fail: (err) => {
        console.log(err)
      }
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
    // this._init();
    this.getDataList();
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    // 查询数据库中此用户的数据
    this.setData({
      list: []
    })
    this.onShow()
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("下拉加载更多")
    this.getDataList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
 
  // 订单页面
  details: function (event) {

  // console.log(event.currentTarget.dataset.details)
  const order1 = JSON.stringify(event.currentTarget.dataset.details)
  wx.navigateTo({
    url: '/pages/guanli_order/guanli_order?order2=' + order1
  })
  },

  tell:function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phono 
    })
// console.log(e.currentTarget.dataset.phono)
  }

})
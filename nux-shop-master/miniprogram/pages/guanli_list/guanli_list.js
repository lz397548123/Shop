// pages/guanli_list/guanli_list.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    // 数据的总条数
    totalNum : -1,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
// 首先获取数据的总条数
setTimeout(() => {
  db.collection('product').count()
    .then(res => {
      console.log("数据的总条数", res)
      this.setData({
        totalNum: res.total
      })
    })
})

  },
// 数据加载的函数
getDataList(){
  
    let len = this.data.list.length
    
    console.log("调用获取信息的函数")
    console.log("获取数据目前数组的长度",len)
    if (this.data.totalNum == len){
      wx.showToast({
        title: '人家已经到底啦！',
      })
      return
         }
         else{
       wx.showLoading({
         title: '加载中',
            })
        console.log("list",len)
       db.collection('product').skip(len).limit(7).get()  //从第len条数
    .then(res => {
      console.log("获取成功",res)
      this.setData({
        list:this.data.list.concat(res.data)
      })
      wx.hideLoading()
    })
    .catch(err => {
      console.log("获取失败",err)
      wx.hideLoading()
      // wx.showToast({
      //   title: '加载失败',
      // })
    })
  }
},


  // 下拉刷新
 onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
      // 查询数据库中此用户的数据
    this.setData({
      totalNum:-1,
      list:[]
    })
   this.onLoad()
    this.onShow()
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
   
  },


    // 上拉加载更多
    onReachBottom () { 
      console.log("上拉加载更多")
      this.getDataList()
    },

  // 跳转到详情页
  goon:function(e){
console.log(e.currentTarget.dataset.product)

var shopInfo = JSON.stringify(e.currentTarget.dataset.product);
wx.navigateTo({
  url: '/pages/guanli_details/details?order=' + shopInfo,
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
    this.getDataList()
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
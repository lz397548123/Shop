// pages/index/index.js
const db = wx.cloud.database()
import { IndexModel } from "../../models/IndexModel.js"
// import { fail } from "assert"
let indexModel = new IndexModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //自动轮播
    interval: 3000, // 自动切换时间间隔
    duration: 1000, // 滑动动画时长
    circular: true,//是否采用衔接滑动 
    themes: [
      // { theme_icon: 'images/theme@1.png', theme_name: '新品糖果', theme_type: 1 },
      // { theme_icon: 'images/theme@2.png', theme_name: '精品果干', theme_type: 2 },
      // { theme_icon: 'images/theme@3.png', theme_name: '美味坚果', theme_type: 3 },
      // { theme_icon: 'images/theme@4.png', theme_name: '优质推荐', theme_type: 4 },
    ],
    banners: [],
    products: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._init()
  },

  themeNavigation: function (event) {
    let theme_type = indexModel.getDataSet(event, "themetype")
    wx.navigateTo({
      url: '../theme/theme?theme_type=' + theme_type,
    })
  },

  
  _init: function () {
    //轮播图
    indexModel.getBanner(res => {
      this.setData({
        banners: res.result.data.data
      })
      console.log("获取轮播图数据",this.data.banners)
    })
    
    // 主题
    indexModel.getTheme(res => {
      this.setData({
        themes: res.result.data.data
      })
      console.log("获取主题数据",res.result.data.data)
    })
    // 最新商品
    indexModel.getProductNew(res => {
      this.setData({
        products: res.result.data.data
      })
      console.log("获取最新商品数据",res.result.data.data)
    })
  },

  // 跳转商品详情
  productDetails: function (event) {
    this._navProductDetail(event.detail.productId)
    // console.log("商品id",event.detail.productId)
  },
  productBanner: function (event) {
    let product_id = indexModel.getDataSet(event, "productid")
    this._navProductDetail(product_id)
  },

  // 跳转详情
  _navProductDetail: function (product_id) {
    wx.navigateTo({
      url: '/pages/product/product?product_id=' + product_id,
    })
  },

//下拉刷新
onRefresh(){
  //在当前页面显示导航条加载动画
  wx.showNavigationBarLoading(); 
  //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
  wx.showLoading({
    title: '刷新中...',
  })
  this.getData();
},

//网络请求，获取数据
async getData(){
  await this._init()
  //  //隐藏loading 提示框
   await wx.hideLoading();
   //隐藏导航条加载动画
    wx.hideNavigationBarLoading();
   //停止下拉刷新
    wx.stopPullDownRefresh();

},

/**
* 页面相关事件处理函数--监听用户下拉动作
*/
onPullDownRefresh: function () {
  //调用刷新时将执行的方法
this.onRefresh();
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},


  
})
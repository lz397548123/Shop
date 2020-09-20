const app = getApp()
const db = wx.cloud.database(); //初始化数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _id: "",
    createTime: new Date(),
    name: '',
    price: 0, //价格，（被划掉的价格）
    sell_price: 0, //卖价格（展示的价格）
    status: 0, //状态
    stock: 0, //库存量
    theme: 0, //主题
    type: 0, //分类
    img: "", //商品图片
    description: [], //商品描述
    new: true, //是否上主页爆款
    banner: [], //商品轮播图
    isChecked1: false,
    imgbox: [], //选择图片
    fileIDs: [], //上传云存储后的返回值
    imgbox1: [], //选择图片
    fileIDs1: [], //上传云存储后的返回值
  },
  name: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  price: function (e) {
    this.setData({
      price: parseInt(e.detail.value)
    })
  },
  sell_price: function (e) {
    this.setData({
      sell_price: parseInt(e.detail.value)
    })
  },
  status: function (e) {
    this.setData({
      status: parseInt(e.detail.value)
    })
  },
  stock: function (e) {
    this.setData({
      stock: parseInt(e.detail.value)
    })
  },
  theme: function (e) {
    this.setData({
      theme: parseInt(e.detail.value)
    })
  },
  type: function (e) {
    this.setData({
      type: parseInt(e.detail.value)
    })
  },




  // 商品照片
  img: function () {
    //JS文件   上传图片函数
    var that = this
    //让用户选择或拍摄一张照片
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        //选择完成会先返回一个临时地址保存备用
        const tempFilePaths = res.tempFilePaths
        //将照片上传至云端需要刚才存储的临时地址
        wx.cloud.uploadFile({
          cloudPath: 'test.jpg',
          filePath: tempFilePaths[0],
          success(res) {
            //上传成功后会返回永久地址
            that.setData({
              img: res.fileID
            })
          }
        })
      }
    })
  },
  // 是否上爆款
  switch1Change: function (e) {
    this.setData({
      new: e.detail.value
    })
  },


  // 上传照片
  // 删除照片 &&
  imgDelete1: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgbox = this.data.imgbox;
    imgbox.splice(index, 1)
    that.setData({
      imgbox: imgbox
    });
  },
  // 选择图片 &&&
  addPic1: function (e) {
    var imgbox = this.data.imgbox;
    console.log(imgbox)
    var that = this;
    var n = 5;
    if (5 > imgbox.length > 0) {
      n = 5 - imgbox.length;
    } else if (imgbox.length == 5) {
      n = 1;
    }
    wx.chooseImage({
      count: n, // 默认9，设置图片张数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

        if (imgbox.length == 0) {
          imgbox = tempFilePaths
        } else if (5 > imgbox.length) {
          imgbox = imgbox.concat(tempFilePaths);
        }
        that.setData({
          imgbox: imgbox
        });
      }
    })
  },

  //图片
  imgbox: function (e) {
    this.setData({
      imgbox: e.detail.value
    })
  },


  //发布按钮
  fb: function (e) {
    if (!this.data.imgbox.length) {
      wx.showToast({
        icon: 'none',
        title: '图片类容为空'
      });
    } else {
      //上传图片到云存储
      wx.showLoading({
        title: '上传中',
      })
      let promiseArr = [];
      for (let i = 0; i < this.data.imgbox.length; i++) {
        promiseArr.push(new Promise((reslove, reject) => {
          let item = this.data.imgbox[i];
          let suffix = /\.\w+$/.exec(item)[0]; //正则表达式返回文件的扩展名
          wx.cloud.uploadFile({
            cloudPath: new Date().getTime() + suffix, // 上传至云端的路径
            filePath: item, // 小程序临时文件路径
            success: res => {
              this.setData({
                fileIDs: this.data.fileIDs.concat(res.fileID)
              });
              console.log(res.fileID) //输出上传后图片的返回地址
              reslove();
              wx.hideLoading();
              wx.showToast({
                title: "上传成功",
              })
            },
            fail: err => {
              wx.hideLoading();
              console.log(err)
              // wx.showToast({
              //   title: "上传失败",
              // })
            }
          })
        }));
      }
      Promise.all(promiseArr).then(res => { //等数组都做完后做then方法
        console.log("图片上传完成后再执行")
        this.data.banner = this.data.fileIDs
        console.log(this.data.banner)
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var order = JSON.parse(options.order)
    console.log(order)

    this.setData({
      name: order.product_name,
      price: order.product_price,
      sell_price: order.product_sell_price,
      status: order.product_status,
      stock: order.product_stock,
      theme: order.product_theme,
      type: order.category_type,
      img: order.product_img,
      description: order.product_description,
      new: order.product_new,
      _id: order._id,
      banner: order.product_banner,
      imgbox: order.product_banner,
      imgbox1: order.product_description,
      createTime: order.createTime,
    })
  },

  // 删除商品按钮
  shanchu: function () {
    const that = this
    wx.showModal({
      title: '提示',
      content: '确定删除此商品吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.cloud.callFunction({
            name: "guanli_shanchu_pro",
            data: {
              doc:"product",
              id: that.data._id
            },
            success(res1) {
              console.log("删除成功！",res1)
              wx.showToast({
                title: "删除成功！",
              })
              wx.navigateBack()
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

  // 上传商品详情照片
  // 删除照片 &&
  imgDelete11: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgbox = this.data.imgbox1;
    imgbox.splice(index, 1)
    that.setData({
      imgbox1: imgbox
    });
  },
  // 选择图片 &&&
  addPic11: function (e) {
    var imgbox = this.data.imgbox1;
    console.log(imgbox)
    var that = this;
    var n = 5;
    if (5 > imgbox.length > 0) {
      n = 5 - imgbox.length;
    } else if (imgbox.length == 5) {
      n = 1;
    }
    wx.chooseImage({
      count: n, // 默认9，设置图片张数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths

        if (imgbox.length == 0) {
          imgbox = tempFilePaths
        } else if (5 > imgbox.length) {
          imgbox = imgbox.concat(tempFilePaths);
        }
        that.setData({
          imgbox1: imgbox
        });
      }
    })
  },

  //图片
  imgbox1: function (e) {
    this.setData({
      imgbox1: e.detail.value
    })
  },


  //发布按钮
  fb1: function (e) {
    if (!this.data.imgbox1.length) {
      wx.showToast({
        icon: 'none',
        title: '图片类容为空'
      });
    } else {
      //上传图片到云存储
      wx.showLoading({
        title: '上传中',
      })
      let promiseArr = [];
      for (let i = 0; i < this.data.imgbox1.length; i++) {
        promiseArr.push(new Promise((reslove, reject) => {
          let item = this.data.imgbox1[i];
          let suffix = /\.\w+$/.exec(item)[0]; //正则表达式返回文件的扩展名
          wx.cloud.uploadFile({
            cloudPath: new Date().getTime() + suffix, // 上传至云端的路径
            filePath: item, // 小程序临时文件路径
            success: res => {
              this.setData({
                fileIDs1: this.data.fileIDs1.concat(res.fileID)
              });
              console.log(res.fileID) //输出上传后图片的返回地址
              reslove();
              wx.hideLoading();
              wx.showToast({
                title: "上传成功",
              })
            },
            fail: err => {
              wx.hideLoading();
              console.log(err)
              wx.showToast({
                title: "上传失败",
              })
            }
          })
        }));
      }
      Promise.all(promiseArr).then(res => { //等数组都做完后做then方法
        console.log("图片上传完成后再执行")
        this.data.description = this.data.fileIDs1
        console.log(this.data.description)
      })
    }
  },
  // 最终的确定按钮
  queding: function () {

    const that = this
    const db = wx.cloud.database()
    wx.showModal({
      title: '提示',
      content: '请确保信息都填写完整',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showLoading({
            title: '加载中......',
          })

          db.collection("product").doc(that.data._id).set({
              data: {
                product_name: that.data.name,
                product_price: that.data.price,
                product_sell_price: that.data.sell_price,
                product_status: that.data.status,
                product_stock: that.data.stock,
                product_theme: that.data.theme,
                product_img: that.data.img,
                category_type: that.data.type,
                product_description: that.data.description,
                product_new: that.data.new,
                product_banner: that.data.banner,
                updatetime: new Date(),
                createTime: that.createTime
              }
            })
            .then(res => {
              wx.hideLoading()
              console.log(res)
            })
            .catch(err => {
              wx.hideLoading()
              console.log(err)
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
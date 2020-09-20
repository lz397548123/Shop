const model = require('../models/BaseModel.js')
const { PRODUCT ,PRODUCT_CATEGORY } = require('../config/tableConfig.js')
const { PRODUCTFIELD } = require('../fields/productField.js')
const { PRODUCT_CATEGORY_FIELD } = require('../fields/productCategoryField.js')
const { PRODUCTTHEMEFIELD } = require('../fields/productThemeField.js')
/**
 * 获取商品
 * @param options 条件
 * @param page    
 * @param size
 * @return 
 * PRODUCT是表名
 * PRODUCTFIELD ：指定返回结果中记录需返回的字段
 */

const getProduct = (options , page = 0, size = 10 , order = {} ) => {
  options.product_status = 0
  order.name = 'creat_time'
  order.orderBy= 'asc'
  //、、、、、、表名、返回结果中记录需返回的字段、条件、页数、长度、次序 
  return model.query(PRODUCT, PRODUCTFIELD, options, page,size,order)
}

/**
 * 获取单个商品
 * @param product_id 条件
 * @return 
 */
const getProductById = (product_id) => {
  return model.findById(PRODUCT, PRODUCTFIELD, product_id)
}
// 根据是不是最新获取商品
const getnewProduct = (product_theme) => {
  let options = {product_new:true}
  return  model.query(PRODUCT, PRODUCTFIELD, options)
}

/**
 * 获取商品分类
 * @return 
 */
const getCategoryMenu = () =>{
  return model.query(PRODUCT_CATEGORY,PRODUCT_CATEGORY_FIELD)
}

/**
 * 根据商品分类获取商品
 * @param {*} options 
 */
const getCategoryProduct = (options) => {
  options.product_status = 0 
  return model.query(PRODUCT, PRODUCTFIELD, options)

}

// 获取主题列表商品
const getThemeProduct = (product_theme) => {
  let options = {product_theme:product_theme}
  return  model.query(PRODUCT, PRODUCTFIELD, options)
}




module.exports = {
  getProduct,
  getProductById,
  getCategoryMenu,
  getCategoryProduct,
  getThemeProduct,
  getnewProduct
}
// 公共BaseModel，相同的方法不同的业务层调用，很多返回条件不是必须传的，这里我们就默认给出一个初始值，使得代码更容易会扩展，实现代码如下:
// 下面的对数据库的操作封装，大家对于部分不了解的操作指令记得查看下官方文档
const cloud = require('wx-server-sdk');
cloud.init({
//  env: 'yunkaifa-xuexi-1',
env:"haixian-2gzp69d6d77af666",
 // traceUser : 是否在将用户访问记录到用户管理中，在控制台中可见
 traceUser: true,
});
// 环境
// cloud.init({ env: process.env.Env })
const db = cloud.database();


/**
 * 查询处理 
 * @param  {object} model       集合名称
 * @param  {String} id          查询id
 * @return  {object|null}       查找结果
 */
const findById = (model, fields = {} , id ) => {
  try {
    return db.collection(model)
      .doc(id)
      .field(fields) 
      .get()
  } catch (e) {
    console.error(e)
  }
}


/**
 * 查询处理 带多条件的
 * @param  {object} model         集合名称
 * @param  {Object} [options={}]    查询条件
 * @param  {Number} [page]        开始记录数
 * @param  {Number} [size]        每页显示的记录数
 * @return  {object|null}         查找结果
 */
const query = (model, fields = {}, options = {}, page = 0, size = 10, order = { name: '_id', orderBy:'asc'} ) => {
  try {
    return db.collection(model)
    .where(options)
    .field(fields) 
    .skip(page)
    .limit(size)
    .orderBy(order.name, order.orderBy)
    .get()

  } catch (e) {
    console.error(e)
  }
}



/**
 * 新增处理
 * @param  {object} model  集合名称
 * @param  {object} params 参数
 * @return {object| null}  操作结果
 */
const add = (model, params) => {
  try {
    return db.collection(model).add({
      data: params
    });
  } catch (e) {
    console.error(e);
  }
}

/**
 * 编辑处理
 * @param  {object} model      集合名称
 * @param  {object} params     参数
 * @return {object|null}       操作结果
 */
const update = (model, params) => {
  // let id = params._id
  // delete params._id
  try {
    return db.collection(model).doc(params._id)
    .update({
      data: params
    })

  } catch (e) {
    console.error(e);
  }
}

/**
 * 删除结果
 * @param  {object} model      集合名称
 * @param  {String} id         参数
 * @return {object|null}       操作结果
 */
const remove = (model, id) => {
  try {
    return  db.collection(model).doc(id).remove()
  } catch (e) {
    console.error(e)
  }
}



module.exports = {
  query,
  findById,
  add,
  update,
  remove
}
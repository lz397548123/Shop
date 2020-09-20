  /**
   * 成功调用
   * @param {*} ctx
   * @retuen 
   */
  const success = ctx => {
    return {
      code: 0,
      message: 'success',
      data: ctx.data
    }
  }

  /**
   * 调用失败 
   * @param {*} ctx
   * @param {*} msg
   * @retuen 
   */
  const error = (ctx,msg) => {
//   在这里我们自定义一个返回的工具类。
// 在云函数 index 中新建文件 utils/ReturnUtil.js
    return {
      code: 400,
      message: msg,
      data: ctx.data
    }
  }

  module.exports={
    success,
    error
  }
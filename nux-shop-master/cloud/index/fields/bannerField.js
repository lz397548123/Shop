// banner 指定返回结果中记录需返回的字段。
// 在实际的开发中，大家尽量不要吧所有的数据返回给前台，很多时候我们需要几个字段返回了几十个这样是非常不友好的，还有我们什么都返回别人很容易就知道我们的后台实现，避免不必要的破坏。
// 在官方文档中过滤字段采用 filed 方法，如下：
module.exports = {
  // banner field
  BANNERFIELD: {
    name: true,
    description: true,
    image: true,
    product_id:true
  }
}
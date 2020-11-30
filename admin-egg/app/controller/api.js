'use strict';

const Controller = require('egg').Controller;
const axios = require("../../utils/axios")

class HomeController extends Controller {
  // 直接走查询接口
  /*
  * 此处转发有三种方式
  *
  * 方式1 使用Promise包裹原生nodejs的HTTP请求实现
  *
  * 方式2 使用axios发送请求
  *
  * 方式3 使用egg封装好的  ctx.curl 实现
  *
  * 这里我选用了比较熟悉的 axios 发送请求
  * */
  async index() {
    const {ctx} = this;
    // const data  = await this.service.list.list();
    // console.log(data)
    // ctx.body = data
    await axios({
      params: ctx.query,
      method: "get"
    }).then(res => {
      ctx.body = res.data;
    })
  }
}





module.exports = HomeController;

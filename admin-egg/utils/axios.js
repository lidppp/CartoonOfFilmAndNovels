// http_server.js
const axios = require("axios")
const service = axios.create({
    baseURL: "http://47.114.147.221/", // api的base_url  process.env.BASE_API,,注意局域网访问时，不能使用localhost
    timeout: 20 * 1000 // 请求超时时间
})

module.exports = service

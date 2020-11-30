module.exports = class Service extends require('egg').Service{
    async list() {
        const url = 'http://47.114.147.221/?ysname=一拳';
        // use build-in http client to GET hacker-news api
        const { data } = await this.ctx.curl(url, { dataType: 'json' });
        // 可以通过 config 对象访问 config/config.default.js 里的数据

        return data;
    }
}

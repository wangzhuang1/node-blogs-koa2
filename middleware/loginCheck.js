/**
 * @file: loginCheck
 * @author: WangZhuang
 * @date: 2022/4/20 20:44:17
 */
const {ErrorModel} = require('../model/resModel');

module.exports = async (ctx, next) => {
    if (ctx.session.username) {
        await next();
        return
    }
    ctx.body = new ErrorModel('未登录')
}

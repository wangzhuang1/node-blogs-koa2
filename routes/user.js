/**
 * @file: blog
 * @author: WangZhuang
 * @date: 2022/4/20 22:23:25
 */
const router = require('koa-router')();
router.prefix('/api/user');
const login = require('../controller/user');
const {SuccessModel, ErrorModel} = require('../model/resModel');

router.post('/login', async (ctx, next) => {
    const {username, password} = ctx.request.body;
    const data = await login(username, password);

    if (data.username) {
        // 设置session
        ctx.session.username = data.username;
        ctx.session.realname = data.realname;

        ctx.body = new SuccessModel()
    } else {
        ctx.body = new ErrorModel('登录失败')
    }
})

// test redis
router.get('/session-test', async (ctx, next) => {
    if (ctx.session.viewCount == null) {
        ctx.session.viewCount = 0;
    }
    ctx.session.viewCount++;
    ctx.body = {
        viewCount: ctx.session.viewCount
    }
})

module.exports = router

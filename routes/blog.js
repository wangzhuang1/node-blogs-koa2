/**
 * @file: blog
 * @author: WangZhuang
 * @date: 2022/4/20 22:23:25
 */
const router = require('koa-router')();
const {getList, getDetail, newBlog, updateBlog, delBlog} = require('../controller/blog');
const {SuccessModel, ErrorModel} = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');
router.prefix('/api/blog');

// get blog list
router.get('/list', async (ctx, next) => {
    let author = ctx.query.author || '';
    const keyword = ctx.query.keywprd || '';
    const isadmin = ctx.query.isadmin;
    console.log('isadmin', isadmin);

    if (isadmin) {
        // 管理员界面
        if (ctx.session.username == null) {
            // 未登录
            ctx.body = new ErrorModel('未登录')
            return;
        }
        // 强制查询自己的博客
        author = ctx.session.username;
    }
    const listData = getList(author, keyword);
    ctx.body = new SuccessModel(listData)
})

// get blog detail
router.get('/detail', async (ctx, next) => {
    const data = await getDetail(ctx.query.id);
    ctx.body = new SuccessModel(data);
});

// new blog
router.post('/new', loginCheck, async (ctx, next) => {
    const body = ctx.request.body
    body.author = ctx.session.username;
    const data = await newBlog(body);
    ctx.body = new SuccessModel(data);
});

// update blog
router.post('/update', loginCheck, async (ctx, next) => {
    const val = await updateBlog(ctx.query.id, ctx.body);

    if (val) {
        ctx.body = new SuccessModel()
    } else {
        ctx.body = new ErrorModel('更新失败')
    }

    return result.then(val => {

    })
});

// delete blog
router.post('/del', loginCheck, async (ctx, next) => {
    const author = ctx.session.username;
    const val = await delBlog(ctx.query.id, author);

    if (val) {
        ctx.body = new SuccessModel()
    } else {
        ctx.body = new ErrorModel('删除失败')
    }
});

module.exports = router

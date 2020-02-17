const router = require('koa-router')()
const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
    const { username, password } = ctx.request.body;
    // console.log('ctx-session===', ctx.session)

    const data = await login(username, password);
    if (data.username) {
        // 设置 session
        ctx.session.username = data.username;
        ctx.session.realname = data.realname;

        ctx.body = new SuccessModel()
        return 
    }
    ctx.body = new ErrorModel("登录失败");

    // return result.then(data => {
    //     if (data.username) {
    //         // 设置 session
    //         req.session.username = data.username;
    //         req.session.realname = data.realname;
  
    //         res.json(
    //             new SuccessModel()
    //         )
    //     }
    //     res.json(
    //         new ErrorModel("登录失败")
    //     )
    // })
})

router.get('/session-test', async function (ctx, next) {
    console.log('ctx-session===', ctx.session)
    if (ctx.session.viewCount == null) {
        ctx.session.viewCount = 0;
    }
    // viewCount 值以 session 标识值形式存储在 redis 中,可以通过 redis-cli 的get查询,session 标识值固定,但viewCount可变
    // 验证了 session 是可以存储 viewCount 变量的, 后面就可以根据这个特性实现登录功能，对其 username, password 获取验证并放入session中
    ctx.session.viewCount++

    ctx.body = {
        errno: 0,
        viewCount: ctx.session.viewCount
    }
})
module.exports = router

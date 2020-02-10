const http = require('http');
const slice = Array.prototype.slice

class LikeExpress {
    constructor() {
        // 存放中间件的列表
        this.routes = {
            all: [],    // app.use(...)
            get: [],    // app.get(...)
            post: []    // app.post(...)
        }
    }

    register(path) {
        const info = {}
        if (typeof path == 'string') {  // 判断第一个参数是否含路由
            info.path = path;
            // 包含路由则从第二个参数开始，转换为数组，存入 stack
            info.stack = slice.call(arguments, 1);   // 数组
        } else {
            info.path = '/';   // 默认为根路由
            // 从第一个参数开始，转换为数组，存入 stack
            info.stack = slice.call(arguments, 0);
        }
        return info
    }    

    use() {
        const info = this.register.apply(this, arguments); // 把 use 函数全部参数都传入 register 函数然后执行
        this.routes.all.push(info);    // 存放中间件数组
    }

    get() {
        const info = this.register.apply(this, arguments); // 把 use 函数全部参数都传入 register 函数然后执行
        this.routes.get.push(info);    // 存放中间件数组
    }

    post() {
        const info = this.register.apply(this, arguments); // 把 use 函数全部参数都传入 register 函数然后执行
        this.routes.post.push(info);    // 存放中间件数组
    }

    match(method, url) {
        let stack = [];
        if (url === '/favicon.ico') {
            return stack;
        }

        // 获取 routes 信息
        let curRoutes = [];
        curRoutes = curRoutes.concat(this.routes.all); //将通过 use 注册的全部信息获取并放到curRoutes里
        curRoutes = curRoutes.concat(this.routes[method]); //将通过 get,post 注册的全部信息获取并放到curRoutes里

        curRoutes.forEach(routeInfo => {
            // 判断当前 url 是否符合当前路径或者根路径 
            if (url.indexOf(routeInfo.path) === 0) {
                // 假如url === '/api/get-cookie' 且 routeInfo.path === '/' 也是成立
                // 假如url === '/api/get-cookie' 且 routeInfo.path === '/api' 也是成立
                // 假如url === '/api/get-cookie' 且 routeInfo.path === '/api/get-cookie' 也是成立
                // 假如url === '/api/get-cookie' 且 routeInfo.path === 'file' 不成立
                stack = stack.concat(routeInfo.stack);  
            }
        })
        return stack
    }

    // 核心的 next 机制
    handle(req, res, stack) {
        const next = () => {
            // 拿到第一个匹配的中间件
            const middleware = stack.shift();
            if (middleware) {
                // 执行中间件函数(next)
                middleware(req, res, next);
            }
        }
        next();
    }

    callback() {
        return (req, res) => {
            res.json = (data) => {
                res.setHeader('Content-Type', 'application/json');
                res.end(
                    JSON.stringify(data)
                )
            }
            const url = req.url;
            const method = req.method.toLowerCase();

            const resultList = this.match(method, url)
            this.handle(req, res, resultList);

        }
    }

    listen(...args) {
        const server = http.createServer(this.callback());
        server.listen(...args);
    }
}

// 工厂函数
module.exports = () => {
    return new LikeExpress()
}
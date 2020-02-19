PM2是node进程管理工具，可以利用它来简化很多node应用管理的繁琐任务，如性能监控、自动重启、负载均衡等，而且使用非常简单。

**PM2的核心价值**

- 进程守护，系统崩溃自动重启
- 启动多进程，充分利用CPU和内存
- 自带日志记录功能

安装：`npm install pm2 -g`

**命令**

```sh
pm2 start <AppName>/<id>    # 启动pm2 ---此处appName是文件名
pm2 list <AppName>/<id>		# 列出启动的信息
pm2 restart <AppName>/<id>	# 重启
pm2 stop <AppName>/<id>		# 停止 
pm2 delete <AppName>/<id>   # 删除
pm2 info <AppName>/<id>		# pm2 的信息
pm2 log <AppName>/<id>		# 查看日志
pm2 monit <AppName>/<id>    # 监控 
pm2 stop all	# 停止全部
```

**进程守护**

- node app.js 和 nodemon app.js ，进程崩溃则不能访问
- pm2 遇到进程崩溃，则会自动重启

pm2 list 可以查看重启次数（报错后）

举个简单例子，完整配置说明请参考[官方文档](http://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/)。

`pm2.conf.json`

```js
{
    "apps": {
        "name": "pm2-test-server",  // 应用名称
        "script": "app.js",         // 实际启动脚本
        "cwd": "./",  // 当前工作路径
        "watch": [
            "./"
        ],
        "ignore_watch": [  // 从监控目录中排除
            "node_modules",
            "logs"
        ],
        "instances": 4,     // 开4个进程
        "error_file": "logs/err.log",  // 错误日志路径
        "out_file": "logs/out.log",    // 普通日志路径
        "log_date_format": "YYY-MM-DD HH:mm:ss",  // 日期时间
        "env": {
            "NODE_ENV": "production"  // 环境参数，当前指定为生产环境
        }
    }
}
```

> 注意！上线的时候 json 文件是不可以写注释的，所以需把 // 后面去掉

可以参考[这篇文章](https://www.cnblogs.com/chyingp/p/pm2-documentation.html)

**多进程和 redis**

操作系统会限制单个进程的最大可用内存为1.6GB 

- 内存： 无法充分利用机器全部内存
- CPU：无法充分利用多核 CPU 的优势

- 多进程之间，内存数据无法共享
- 多进程可以通过访问同一个 redis , 来实现数据共享

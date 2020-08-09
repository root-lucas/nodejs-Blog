## 这是一个 node.js 写博客项目

**同一个项目功能通过三种不同的实现方式**

1. 通过 node.js 原生(非框架)实现：根目录就是
2. 通过 express 框架实现：存放在 blog-express 文件夹
3. 通过 koa2 框架实现：存放在 blog-koa2 文件夹

**!!：** html-test 文件夹是简单实现的前端页面, 通过

> cd 相应文件夹，根据下面安装依赖运行。

## Usage

为了使整个项目运行需要下面四个操作。

> 保证本地的 redis(用于用户登陆)、mysql(用户数据) 数据库服务已经启动了

```bash
######### 1.开启后端服务

# 选择某框架实现的项目
cd blog-koa2
# 安装依赖
yarn add
# 运行
npm run dev   # http://localhost:8000/api/blog/list

######### 2.开启前端服务

cd html-test    # 进入文件夹
http-server -p 8001  # http://192.168.222.1:8081/index.html

######### 3. 开启数据库
# 如果安装并配置本地环境则终端直接执行
# 开启 redis 数据库
redis-cli    # 默认 6379 端口

# 开启 mysql 数据库
net start mysql  # 默认 3306 端口

######### 4.前后端对接联调

1. 下载并解压 nginx
2. cd nginx/conf
3. nginx.conf 编辑该文件后保存

# 运行 nginx, 直接在 nginx 根目录下执行
nginx.exe
# 停止nginx（新建终端） nginx -s stop

打开页面 http://localhost:8080/login.html
```

**nginx.conf 文件配置**

```bash

#user  nobody;
worker_processes 1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       8080;
        server_name  localhost;

		location / {
			 proxy_pass http://localhost:8001; # http-server -p 前端端口
		}

		location /api/ {
			 proxy_pass http://localhost:8000;	# yarn run dev 后端端口
			 proxy_set_header Host $host;
		}
    }
}
```

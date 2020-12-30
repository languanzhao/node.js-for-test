//1、引入http模块
var http = require('http')
var url = require('url')

//2、创建http服务
var server = http.createServer(function (req, res) {
    //架设路由
    // if(req.url == '/index'){
    //     res.write('index')
    //     res.end()
    // }else if(req.url == '/login'){
    //     res.write('login')
    //     res.end()
    // }

    //解析GET请求，获取参数
    var urlObj = url.parse(req.url,true)
    console.log(urlObj)
})

//3、监听端口号
server.listen(8888,function(){
    console.log('start server')
})


var http = require('http');
var path = require('path');
var fs = require('fs');
var url = require('url');

//路由
var routes = {
    '/api/info/get': function (req, res) {
        var name = req.query.name;
        var age = req.query.age;
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.end('/api/info/get名字是：' + name + ' 年龄是：' + age);
    },
    '/api/info/post': function (req, res) {
        var obj = {};
        req.msg.split('&').forEach(function (item, i) {
            obj[item.split('=')[0]] = item.split('=')[1];
        });
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.end('/api/info/post名字是:' + obj.name + ' , 年龄是:' + obj.age);
    }
}

//服务
var server = http.createServer(function (req, res) {

    var pathObj = url.parse(req.url, true);

    //新添处理路由的代码
    var handleFn = routes[pathObj.pathname];
    if (handleFn) {
        req.query = pathObj.query;    //获取post提交方式数据

        var msg = '';
        req.on('data', function (chunk) {
            msg += chunk;		      //获取post提交方式数据
        }).on('end', function () {
            req.msg = msg;
            handleFn(req, res);
        });
    } else {
        var staticPath = path.join(__dirname, 'html');
        var filePath = path.join(staticPath, pathObj.pathname);
        fs.readFile(filePath, 'binary', function (err, fileContent) {
            if (err) {
                res.writeHead(404, "Not Found");
                res.end('<h1>404 Not Found!</h1>')
            } else {
                res.writeHead(200, 'ok');
                res.write(fileContent, 'binary');
                res.end();
            }
        });
    }
});

server.listen(8080);
console.log('服务器已打开, 可以运行 http://localhost:8080/index1.html');
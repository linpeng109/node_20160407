//引入express组件
var express = require("express");
var app = express();

//引入安全组件 basicauth-middleware  https://www.npmjs.com/package/basicauth-middleware
var basicauth = require("basicauth-middleware")

//引入数据库组件
var mongoose = require("mongoose")

//建立数据库连接组件
mongoose.connect("mongodb://root:admin@ds021989.mlab.com:21989/mongodb_test_20160324")
var db = mongoose.connection;

//加入数据库监听
db.on('error', console.error.bind(console, '连接错误:'));
db.once('open', function () {
    console.log("The mongoodb has be open");
});

//数据模型
var UserSchema = new mongoose.Schema({
    userName: String,
    passWord: String
})

//实体类（对应数据表）
var User = mongoose.model('userBase', UserSchema)


//过滤器
app.use(function (req, res, next) {
    var headers = req.headers;
    console.log(JSON.stringify(headers))
    next();
})
//跟路径
app.get("/", function (req, res) {
    res.send("Hello world ！");
});

//安全验证
app.use(basicauth(function (username, password) {
    return (username === 'abcd' && password === 'abcd')
}))

//插入数据接口
app.get('/insert', function (req, res) {
    var random = Math.round(Math.random() * 10000);
    var abc = new User({
        userName: 'linpeng' + random,
        passWord: 'linpeng'
    })
    abc.save(function (err, abc) {
        if (err) {
            console.error(JSON.stringify(err))
        }
        res.send(JSON.stringify(abc))
    })
});

//查询接口
// http://www.nodeclass.com/api/mongoose.html#query_Query-sort
app.get('/findByList', function (req, res) {
    var pageSize = 10;
    var pageNum = 1;
    var query = User.find({})
    //分页
    query.limit(pageSize)
    query.skip(pageNum * pageSize)
    //排序
    query.sort('userName -passWord');
    //条件
    //Mongoose 一些查询方法 - 亿光年 - 博客频道 - CSDN.NET  http://blog.csdn.net/tengzhaorong/article/details/16802109
    query.where('userName').gte('aa')
    query.exec(function (err, docs) {
        if (err) {
            console.error(JSON.stringify(err))
        }
        var result = JSON.stringify(docs);
        res.send(result)
    })
});


var server = app.listen(3000, function () {
    console.log(JSON.stringify(server.address()))
})


var express = require("express");
var app = express();

//引入数据库组件
var mongoose = require("mongoose")

//建立数据库连接
mongoose.connect("mongodb://root:admin@ds021989.mlab.com:21989/mongodb_test_20160324")
var db = mongoose.connection;

//加入数据库监听
db.on('error', console.error.bind(console, '连接错误:'));
db.once('open', function () {
    console.log("open");
});

//数据模型
var UserSchema = new mongoose.Schema({
    userName: String,
    passWord: String
})

//实体类（对应数据表）
var User = mongoose.model('userBase', UserSchema)

//跟路径
app.get("/", function (req, res) {
    res.send("Hello world ！");
});

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
app.get('/findByList', function (req, res) {
    var pageSize = 10;
    var pageNum = 1;

});


var server = app.listen(3000, function () {
    console.log(JSON.stringify(server.address()))
})


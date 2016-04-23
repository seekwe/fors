/*
    node移动到当前目录，运行命令：node file
*/

var fs = require('fs');
var fors = require('./fors');

var obj = fors(
    function start(next) {
        fs.readFile('./file/1.txt', 'utf-8', next);
        return false; //return false; 暂停执行下一个，等待触发next函数
    },
    function (next, err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            fs.readFile('./file/2.txt', 'utf-8', next);
        }
        return false; //return false; 暂停执行下一个，等待触发next函数
    },
    function (next, err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            fs.readFile('./file/3.txt', 'utf-8', next);
        }
        return false; //return false; 暂停执行下一个，等待触发next函数
    },
    function (next, err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            fs.readFile('./file/4.txt', 'utf-8', next);
        }
        return false; //return false; 暂停执行下一个，等待触发next函数
    },
    function (next, err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            fs.readFile('./file/5.txt', 'utf-8', next);
        }
        return false; //return false; 暂停执行下一个，等待触发next函数
    },
    function (next, err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            fs.readFile('./file/6.txt', 'utf-8', next);
        }
        return false; //return false; 暂停执行下一个，等待触发next函数
    },
    function (next, err, data) {
        if (err) {
            console.log(err); //6.txt文件是不存在的，到这里，应该是执行错误
        } else {
            console.log(data);
        }
    }
);

console.log(obj); //在控制台上看看会打印出来什么
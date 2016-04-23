/*
    node移动到当前目录，运行命令：node file
*/

var fs = require('fs');
var fors = require('./fors');

console.log('********异步执行**********');
var getFile = fors(
    function () {
        console.log('同步执行');
    },
    function getTxt1(next) {
        console.log('看看我先，还是return的方法先出来');
        fs.readFile('./file/1.txt', 'utf-8', next);
        return false; //暂停自动执行下一个方法，等待next方法触发，继续执行下一个方法
    },
    function getTxt2(next, err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('读取的内容是：' + data);
            fs.readFile('./file/2.txt', 'utf-8', next);
        }
        return false;
    },
    function getTxt3(next, err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('读取的内容是：' + data);
            fs.readFile('./file/3.txt', 'utf-8', next);
        }
        return false;
    },
    function getTxt4(next, err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('读取的内容是：' + data);
            fs.readFile('./file/4.txt', 'utf-8', next);
        }
        return false;
    },
    function (next, err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('读取的内容是：' + data);
            console.log('异步读取文件完成！');
        }
    }
);


getFile.getTxt2(function (err, data) {
    console.log('看看文本二的内容是：' + data);
}, null, '我是从外面进来的');
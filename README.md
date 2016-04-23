# fors
轻量级的js，代码不足百行，让异步如for循环般执行


欢迎start！
return false 说明手动调用下一个方法，第一个参数为下一个方法，其他是带过来的参数

nodejs读取文件例子：
<pre>
        node file
</pre>

简单举例子：
<pre>
/*
    node移动到当前目录，运行命令：node file
*/

var fs = require('fs');
var fors = require('./fors');

fors(
    function (next) {
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
</pre>

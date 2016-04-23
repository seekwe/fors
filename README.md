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
var fors = require('./fors');
var fs = require('fs');

console.log('********正常的同步执行**********');
fors(
    function (next) {
        console.log('顺序执行1');
    },
    function (next) {
        console.log('顺序执行2');
    },
    function (next) {
        console.log('顺序执行3');
    },
    function (next) {
        console.log('顺序执行4');
    }
);

console.log('********方法调用**********');
fors(
    function one(next) {
        console.log('顺序执行1');
    },
    function (next) {
        console.log('看下面，调用了end方法');
    },
    'end',
    function (next) {
        console.log('顺序执行2');
    },
    function (next) {
        console.log('顺序执行3');
    },
    function end(next) {
        console.log('顺序执行4');
    },
    'one', //重复调用one方法
    function (next) {
        console.log('看上面，调用了one方法');
    }
);

console.log('********异步执行**********');
var getFile = fors(
    function getTxt1(next) {
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
console.log('********返回的方法**********');
console.log(getFile); //看看控制台返回了什么？ PS：只要方法带有名称的，都会在同步执行结束后返回

console.log('********调用返回的方法执行**********');
getFile.getTxt2(function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log('1.txt文件的内容是：' + data);
    }
}, null, '我是返回之后的内容');

console.log('********和返回的方法混合使用**********');

fors(
    function () {
        console.log('下面的页可以这样搭配使用');
    },
    getFile.getTxt1,
    getFile.getTxt2,
    function (next, err, data) {
        console.log('2.txt的内容是：' + data);
    }
);
</pre>

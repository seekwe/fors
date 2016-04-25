# fors
<h2>轻量级的js，代码不足百行，让异步如for循环般执行</h2>

正式版本发布了，
1.支持方法重复调用
2.支持返回有名方法

自己来说说优点优势：
虽然目前线上有很多各种将异步转化成同步写法的模块，但我目前了解的并不多（PS：前端切图狗一枚，js自然是写得少），经常能听到咱们公司的java程序员抱怨js难写，各种异步，所以昨天突然奇想就写了fors.js。它真的是非常的轻量级，没有那么多复杂的功能概念和写法的要求，代码不到100行，可以轻易的copy到你的项目中去。
实现的原理就是使用for循环执行传入的参数，如果遇到 return false; 的时候就会停止同步执行执行return 有名字的方法（PS：对于概念的理解叫什么，我更熟悉如何使用，暂且叫有名字的方法），等待next的触发才会继续执行下一个方法，直到执行完成。整个过程，执行完了就完了，是不会重复又从某个方法又执行下来的。

支持在浏览器环境下和nodejs环境下使用。

在2016-04-23号下午七点之前的，请重新下载测试。

百度云演示视频下载：http://pan.baidu.com/s/1hrMjnzm <br>
演示视频在线观看地址：http://pan.baidu.com/share/link?shareid=683625544&uk=2469628767&fid=863221698786478

欢迎star！
return false 说明手动调用下一个方法，第一个参数为下一个方法，其他是带过来的参数

nodejs读取文件例子：
<pre>
        node test
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

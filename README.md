# fors
轻量级的js，代码不足百行，让异步如for循环般执行


欢迎start！
return false 说明手动调用下一个方法，第一个参数为下一个方法，其他是带过来的参数

<pre>
        fors(function (next) {
            console.log(1);
        }, function () {
            console.log(2);
        }, function (next) {
            console.log('------');
            setTimeout(function () {
                console.log(3);
                next('参数传递', '又一个参数');
            }, 2000);
            return false; //return false 说明手动调用下一个方法，第一个参数为下一个方法，其他是带过来的参数
        }, function (next, text, s) {

            console.log(next);
            console.log(text);
            console.log(s);
            console.log(4);

        }, function (next) {
            console.log(5);
        }, function (next) {
            console.log(6);
        }, function (next) {
            console.log(7);
        }, function (next) {
            console.log(8);
        });
</pre>

/*
    version: 1.0.0
    date: 2016-04-22
    author: 狼族小狈
    github：https://github.com/1340641314/fors
*/
!(function (fors) {
    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

        define(function () {
            return fors;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = fors;
    } else {
        window.fors = fors;
    }
})(function () {
    var list = arguments;
    var i = 0;
    var query = []; //临时保存参数

    fors();
    return (function () { //将有名字的方法，return出去
        var obj = {};
        for (var i = 0; i < list.length; i++) {
            if (/^.+$/.test(list[i].name)) {
                obj[list[i].name] = list[i];
            }
        }
        return obj;
    })();

    function fors() {
        for (i; i < list.length; i++) {
            if (cur(list[i]) === false) {
                break; //异步执行，等待手动执行下一个方法
            }
        }
    }

    function cur(fn) {
        var next = [function () {
            i++;
            query = Array.prototype.slice.call(arguments);
            fors();
        }];

        return fn.apply(this, next.concat(query), query);
    }
});
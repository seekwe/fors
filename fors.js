/*
    version: 1.1.0
    date: 2016-04-28
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
    'use strict';
    var params = Array.prototype.slice.call(arguments);

    var resMethod = (function (list) {
        var obj = {};
        for (var i = 0; i < list.length; i++) {
            if (/^.+$/.test(list[i].name)) {
                obj[list[i].name] = (function (fn) {
                    return function () {
                        return fn.apply(this, Array.prototype.slice.call(arguments)); //参数替换
                    };
                }).call(this, list[i]);
            }
        }
        return obj;
    }).call(this, params);

    function start(list) {
        var params = Array.prototype.slice.call(arguments).slice(1);
        for (var i = 0; i < list.length; i++) {
            var cur = (function (fn) {
                if (typeof fn === 'function') {
                    return fn;
                } else if (typeof fn === 'string') {
                    return resMethod[fn] || function () {};
                } else {
                    return function () {};
                }
            })(list[i]);
            var bool = cur.call(this, cur, list.slice(i + 1, list.length), params);
            if (bool === false) {
                return;
            }
        }
    };

    function cur(cb, list, params) {
        function next() {
            var listArr = [list];
            var params = Array.prototype.slice.call(arguments);
            return start.apply(this, listArr.concat(params));
        };
        return cb.apply(this, [next].concat(params));
    }

    if (params[0] !== false) {
        start.call(this, params);
    }
    resMethod.start = function () {
        start.call(this, params);
    };
    return resMethod;
});
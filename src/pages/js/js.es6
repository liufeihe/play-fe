import {getCountData, incrCountData} from '../../modules/data.es6'
import './js.scss'

let count = 0;
let count_fd = 0;

function jieliu(func, wait){
    let timeout;
    return function(){
        let args = arguments;
        let context = this;
        
        if(!timeout) {
            timeout = setTimeout(function(){
                timeout = null;
                func.apply(context, [...args])
            }, wait);
        }

    }
}

function jieliu2(func, wait){// execute first, then jieliu
    let timeout;
    return function(){
        let context = this;
        let args = arguments;

        if (!timeout) {
            func.apply(context, [...args]);
            timeout = setTimeout(function(){
                timeout = null;
            }, wait);
        }
    }
}

function addCount(){
    count += 1;
    $('#jieliu-txt').text(count);
}

function fangdou(func, wait){
    let timeout;
    return function(){
        let args = arguments;
        let context = this;
        if (timeout){
            clearTimeout(timeout);
        }
        timeout = setTimeout(function(){
            func.apply(context, [...args])
        }, wait);
    }
}
function fangdou2(func, wait){
    let timeout;
    return function(){
        let args = arguments;
        let context = this;
        if (timeout) {
            clearTimeout(timeout);
        }
        let callNow = !timeout;
        timeout = setTimeout(function(){
            timeout = null;
        }, wait);
        if (callNow) {
            func.apply(context, [...args]);
        }
    }
}

function addCount_fd(){
    count_fd += 1;
    $('#fangdou-txt').text(count_fd);
}


$(document).ready(function(){
    let bindClick = function(){
        $('button.module1-click').click(function(){
            incrCountData();
            setCountStr();
        });
        $('button.module2-click').click(function(){
            incrCountData();
            setCountStr();
        });

        let addCountAfterJieliu = jieliu(addCount, 1000);
        $('#jieliu').click(function(){
            // addCount();
            addCountAfterJieliu();
        });
        let addCountAfterJieliu2 = jieliu2(addCount, 1000);
        $('#jieliu2').click(function(){
            // addCount();
            addCountAfterJieliu2();
        });

        let addCoundAfterFangdou = fangdou(addCount_fd, 1000);
        $('#fangdou').click(function(){
            // addCount_fd();
            addCoundAfterFangdou();
        });
        let addCoundAfterFangdou2 = fangdou2(addCount_fd, 1000);
        $('#fangdou2').click(function(){
            // addCount_fd();
            addCoundAfterFangdou2();
        });
    },
    setCountStr = function(){
        $('span.count-str').text('count: '+getCountData());
    };

    bindClick();
    setCountStr();
});

Function.prototype.myCall = function(context){
    context = context || window;
    context.fn = this;
    let args = [...arguments].slice(1);
    let result = context.fn(...args);
    delete context.fn;
    return result;
}
Function.prototype.myApply = function(context){
    context = context || window;
    context.fn = this;
    let result;
    if (arguments[1]) {
        result = context.fn([...arguments].slice(1));
    } else {
        result = context.fn();
    }
    delete context.fn;
    return result;
}
Function.prototype.myBind = function(context){
    context = context || window;
    let _this = this;
    let args = [...arguments].slice(1);
    return function F(){
        if (this instanceof F) {
            return new _this(...args, ...arguments);
        } else {
            return _this.apply(context, args.concat(...arguments));
        }
    }
}

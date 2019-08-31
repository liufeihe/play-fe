import {getCountData, incrCountData} from '../../modules/data.es6'
import './js.scss'

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

function jieliu(func, wait){
    let timeout;
    return function(){
        let args = arguments;
        let context = this;
        
        let callnow = !timeout;
        if(!timeout) {
            timeout = setTimeout(function(){
                timeout = null;
                func.apply(context, [...args])
            }, wait);
        }

    }
}
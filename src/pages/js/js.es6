import {getCountData, incrCountData} from '../../modules/data.es6'


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
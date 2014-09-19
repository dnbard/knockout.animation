var utils = require('../utils');

module.exports = {
    init: function(element, valueAccessor){
        var payload = ko.toJS(valueAccessor()),
            value = typeof payload === 'object'? payload.value : payload;

        if (value){
            element.style.opacity = 1;
        } else {
            element.style.opacity = 0;
        }
    },
    update: function (element, valueAccessor) {
        var payload = ko.toJS(valueAccessor()),
            isObject = typeof payload === 'object',
            value = isObject? payload.value : payload;

        var isCurrentlyVisible = !(element.style.opacity === '0');
        if (value && !isCurrentlyVisible){
            element.style.display = '';
            utils.animateTo({
                element: element,
                css: 'opacity',
                value: 1,
                duration: isObject && payload.duration ? payload.duration : 0.25
            });
        }
        else if ((!value) && isCurrentlyVisible)
            utils.animateTo({
                element: element,
                css: 'opacity',
                value: 0,
                duration: isObject && payload.duration ? payload.duration : 0.25
            }, function(){
                element.style.display = 'none';
            });
    }
};

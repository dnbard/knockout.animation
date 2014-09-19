(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
    init: function(element, valueAccessor){
        var payload = ko.toJS(valueAccessor()),
            value = typeof payload === 'object'? payload.value : payload;

        if (value){
            element.style.display = '';
        } else {
            element.style.display = 'none';
        }
    },
    update: function(element, valueAccessor){
        var payload = ko.toJS(valueAccessor()),
            value = typeof payload === 'object'? payload.value : payload;

        if (value){
            element.style.display = '';
        } else {
            addClass(element, 'animated');
            addClass(element, 'spin');

            element.addEventListener('webkitAnimationEnd', function(){
                debugger;
            });

            //element.style.display = 'none';
        }
    }
}
},{}],2:[function(require,module,exports){
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
            animateTo({
                element: element,
                css: 'opacity',
                value: 1,
                duration: isObject && payload.duration ? payload.duration : 0.25
            });
        }
        else if ((!value) && isCurrentlyVisible)
            animateTo({
                element: element,
                css: 'opacity',
                value: 0,
                duration: isObject && payload.duration ? payload.duration : 0.25
            }, function(){
                element.style.display = 'none';
            });
    }
};
},{}],3:[function(require,module,exports){
function addClass(element, className){
    if (element.className.indexOf(className) === -1){
        element.className = element.className + ' ' + className;
    }
}

function removeClass(element, className){
    element.className = element.className.replace(className, '').trim();
}

function animateTo(data, cb){
    function callback(){
        if (typeof cb === 'function'){
            cb();
        }
    }

    function iterationHandler(){
        data.element.style[data.css] = parseFloat(data.element.style[data.css]) + iterationValue;
        if (Math.abs(parseFloat(data.element.style[data.css]) - data.value) > 0.01){
            setTimeout(iterationHandler, iterationLength);
        } else {
            callback();
        }
    }

    var currentValue = data.element.style[data.css] || 0,
        duration = data.duration || 0,
        iterationSteps = data.steps || 20,
        iterationLength = Math.floor(duration / iterationSteps * 1000),
        iterationValue = (data.value - currentValue) / iterationSteps;

    if (duration === 0){
        data.element.style[data.css] = data.value;
    } else {
        setTimeout(iterationHandler, iterationLength);
    }
}

ko.bindingHandlers.fadeVisible = require('./bindings/fadeVisible');
ko.bindingHandlers['animation.fade'] = require('./bindings/animation.fade');
},{"./bindings/animation.fade":1,"./bindings/fadeVisible":2}]},{},[3])

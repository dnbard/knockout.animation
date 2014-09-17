(function (factory) {
    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        factory(require("knockout"));
    } else if (typeof define === "function" && define["amd"]) {
        define(["knockout"], factory);
    } else {
        factory(ko);
    }
}(function (ko) {
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

    ko.bindingHandlers.fadeVisible = {
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
}));

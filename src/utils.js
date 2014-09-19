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

module.exports = {
    addClass: addClass,
    removeClass: removeClass,
    animateTo: animateTo
}

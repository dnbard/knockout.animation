function classManipulator(process){
    return function(element, className){
        var classes;

        if (typeof className !== 'string' || typeof element !== 'object'){
            throw new Error('Invalid argument');
        }

        if (className.indexOf(' ') !== -1){
            classes = className.split(' ');

            classes.forEach(function(className){
                process(element, className);
            });
        } else {
            process(element, className);
        }
    }
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

function addEventListener(element, events, handler){
    if (typeof handler !== 'function' || typeof element !== 'object' || typeof events !== 'string' || events.length === 0){
        throw new Error('Invalid argument');
    }

    var eventList = events.split(' ');
    eventList.forEach(function(event){
        element.addEventListener(event, handler);
    });
}

function removeEventListener(element, events, handler){
    if (typeof handler !== 'function' || typeof element !== 'object' || typeof events !== 'string' || events.length === 0){
        throw new Error('Invalid argument');
    }

    var eventList = events.split(' ');
    eventList.forEach(function(event){
        element.removeEventListener(event, handler);
    });
}

module.exports = {
    addClass: classManipulator(function(element, name){
        if (element.className.indexOf(name) === -1){
            element.className = element.className + ' ' + name;
        }
    }),
    removeClass: classManipulator(function(element, name){
        element.className = element.className.replace(name, '').trim();
    }),
    animateTo: animateTo,
    addEventListener: addEventListener,
    removeEventListener: removeEventListener
};

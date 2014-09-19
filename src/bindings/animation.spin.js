var utils = require('../utils'),
    config = require('../config');

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
        function spinInEndHandler(){
            utils.removeClass(element, 'animated spinIn');
            utils.removeEventListener(element, config.animationEvents, spinInEndHandler);
        }

        function spinOutEndHandler(){
            utils.removeClass(element, 'animated spinOut');
            utils.removeEventListener(element, config.animationEvents, spinOutEndHandler);
            element.style.display = 'none';
        }

        var payload = ko.toJS(valueAccessor()),
            value = typeof payload === 'object'? payload.value : payload;

        if (value){
            element.style.display = '';

            utils.addClass(element, 'animated spinIn');

            utils.addEventListener(element, config.animationEvents, spinInEndHandler);
        } else {
            utils.addClass(element, 'animated spinOut');
            utils.addEventListener(element, config.animationEvents, spinOutEndHandler);
        }
    }
}

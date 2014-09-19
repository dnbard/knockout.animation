var utils = require('../utils');

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

            utils.addClass(element, 'animated spinIn');

            element.addEventListener('webkitAnimationEnd', function(){
                utils.removeClass(element, 'animated spin');
            });
        } else {
            element.style.display = 'none';
        }
    }
}

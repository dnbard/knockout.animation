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
        } else {
            utils.addClass(element, 'animated');
            utils.addClass(element, 'spin');

            /*element.addEventListener('webkitAnimationEnd', function(){
                debugger;
            });*/

            //element.style.display = 'none';
        }
    }
}

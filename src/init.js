var PASSMAP = PASSMAP || (function(){
    var _args = {}; // private

    return {
        init : function(Args) {
            _args = Args;
        },
        getMap : function(i) {
            return _args[i];
        }
    };
}());
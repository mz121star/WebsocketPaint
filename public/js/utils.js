/**
 * Created by liudonghua on 14-5-15.
 */
// http://caolanmcmahon.com/posts/writing_for_node_and_the_browser/
// http://bbs.csdn.net/topics/390372241
(function(exports){

    function HashMap(hashMap){
        if(hashMap === undefined) {
            this.map = {};
        }
        else {
            this.map = hashMap.map;
        }
    }
    HashMap.prototype = {
        put : function(key , value){
            this.map[key] = value;
        },
        get : function(key){
            if(this.map.hasOwnProperty(key)){
                return this.map[key];
            }
            return null;
        },
        remove : function(key){
            if(this.map.hasOwnProperty(key)){
                return delete this.map[key];
            }
            return false;
        },
        removeAll : function(){
            this.map = {};
        },
        keySet : function(){
            var _keys = [];
            for(var i in this.map){
                _keys.push(i);
            }
            return _keys;
        }
    };
    HashMap.prototype.constructor = HashMap;

    exports.HashMap = HashMap;

})(typeof exports === 'undefined'? this['utils']={}: exports);
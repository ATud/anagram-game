(function init(){
    Array.prototype.contains = function(obj) {
        var i = this.length;
        while (i--) {
            if (this[i].indexOf(obj) > -1 ) {
                return true;
            }
        }
        return false;
    }
    
    dictionary = '';
    anagramGame = new AnagramGame();
    anagramGame.init();
})();
var setup = function(game) {
};

setup.prototype = {
    preload: function() {
        console.log("Setting up game...");
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.refresh();
        console.log("Game setup.");
        this.game.state.start('main');
    },
    
    create: function() {
        
    },
    
    update: function() {
        
    }
}
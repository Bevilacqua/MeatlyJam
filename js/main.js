var main = function(game) {
};

var object_computer;
var player;
var background;

main.prototype = {
    preload: function() {
        console.log("Main state :)");
        
        console.log("Loading assets...");
        this.game.load.spritesheet('meatly' , "res/meatly.png" , 128 , 128);
        this.game.load.image('white' , "res/white.png");
        console.log("Assets loaded.");
    },
    
    create: function() {
        background = this.game.add.sprite(0,0,'white');
        background.scale.setTo(31.5,18.75);
        
        player = this.game.add.sprite(100,100,'meatly');
        player.animations.add('idle', [16 , 17 , 19] , .3 , true);
        
        object_computer = this.game.add.sprite(0,0,'meatly');
        object_computer.animations.add('single' , [49]);
    },
    
    update: function() {
        player.animations.play('idle');
        
        object_computer.animations.play('single' , 1);
    }
}
var over = function(game) {
};

over.prototype = {
    
    preload: function() {
        console.log("Great work you finished your game on time!");
        console.log("Loading assets...");
        this.game.load.image('white' , "res/white.png");
        this.game.load.spritesheet('meatly' , "res/meatly.png" , 128 , 128);
        console.log("Assets loaded.");
    },
    
    create: function() {
        var background = this.game.add.sprite(0,0,'white');
        background.scale.setTo(31.5,18.75);
        
        var congratsText = this.game.add.text(this.game.width / 2 , 50 , "Congrats! You finished your game in time!" , {align:"center"});
        congratsText.anchor.set(.5);
        
        var negative = this.game.add.sprite(100 , this.game.height / 2 , 'meatly');
        negative.animations.add('negative' , [51,50,51,51,51] , 1 , true);
        negative.animations.play('negative' , 1);
        
        var positive = this.game.add.sprite(this.game.width - 228 , (this.game.height / 2) + 20, 'meatly');
        positive.animations.add('positive' , [52,52,52,53,52] , 1 , true);
        positive.animations.play('positive' , 1);
    },

    update: function() {
        
    }
}
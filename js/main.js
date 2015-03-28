var main = function(game) {
};

var object_computer , object_floor;
var body_computer;
var objects;
var player;
var background;

main.prototype = {
    preload: function() {
        console.log("Main state :)");
        
        console.log("Loading assets...");
        this.game.load.spritesheet('meatly' , "res/meatly.png" , 128 , 128);
        this.game.load.image('white' , "res/white.png");
        this.game.load.image('floor' , "res/floor.png");
        this.game.load.image('prog' , "res/progParticle.png");
        console.log("Assets loaded.");
    },
    
    create: function() {
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        background = this.game.add.sprite(0,0,'white');
        background.scale.setTo(31.5,18.75);
        
        player = this.game.add.sprite(0,0,'meatly');
        player.animations.add('idle', [16 , 17 , 19] , .3 , true);
        player.animations.add('left', [0 , 1 , 2 , 3 , 4 , 5 , 6 , 7] , 10 , true);
        player.animations.add('right', [15 , 14 , 13 , 12 , 11 , 10 , 9 , 8] , 10 , true);
        player.animations.add('code' , [17 , 21 , 17] , .6 , true)
        this.game.physics.arcade.enable(player);
        player.body.gravity.y = 300;
        player.body.setSize(30,128);
        player.body.offset = new Phaser.Point(50,0);
        player.body.collideWorldBounds = true;
        
        object_computer = this.game.add.sprite(this.game.width - 128 , this.game.height -128 , 'meatly');
        object_computer.animations.add('single' , [49]);
        object_computer.animations.play('single' , 1);
        this.game.physics.arcade.enable(object_computer);
        object_computer.body.setSize(80,128);
        object_computer.body.offset = new Phaser.Point(25 , 0);
        object_computer.body.immovable = true;

        
        
/*        
        object_floor = this.game.add.sprite(0, this.game.height - 160, 'floor');
        object_floor.scale.setTo(10,1);
        object_floor.enableBody = true;
*/ 
        
    },
    
    update: function() {
        this.game.debug.body(object_computer);
        this.game.debug.body(player);
        
        cursors = this.game.input.keyboard.createCursorKeys();
        
        if(cursors.left.isDown) {
            player.body.velocity.x = -150;
            player.animations.play('left');
        } else if(cursors.right.isDown) {
            player.body.velocity.x = 150;
            player.animations.play('right');
        } else {
            player.body.velocity.x = 0;
            player.animations.play('idle');
        }
        
         this.game.physics.arcade.collide(player , object_computer , function() { //Collison: Player -> computer  
            player.animations.play('code');
            console.log("hit");
        });
    }
}
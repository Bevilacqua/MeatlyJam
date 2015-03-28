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
        this.game.physics.arcade.enable(player);
        player.body.gravity.y = 300;
        player.body.setSize(128,128);
        player.body.collideWorldBounds = true;

        objects = this.game.add.group();
        
        object_computer = this.game.add.sprite(this.game.width - 128 , this.game.height -128 , 'meatly');
        object_computer.animations.add('single' , [49]);
        object_computer.animations.play('single' , 1);
        object_computer.enableBody = true;
        object_computer.body.setSize(128,128);
        this.game.physics.arcade.enable(object_computer);
        object_computer.body.collideWorldBounds = true;
        objects.add(object_computer);

        objects.immovable = true; //TODO: WHY DOESNT THIS WORK!!!!
        
/*        
        object_floor = this.game.add.sprite(0, this.game.height - 160, 'floor');
        object_floor.scale.setTo(10,1);
        object_floor.enableBody = true;
*/  
    },
    
    update: function() {
        this.game.physics.arcade.collide(player , object_computer);
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
    }
}
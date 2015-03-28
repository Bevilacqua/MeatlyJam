var main = function(game) {
};

var object_computer_code , object_floor , object_logo;
var body_computer;
var code_display;
var player;
var background;

var state_game;

var hoursLeft = 48;
var code_points = 0;
var art_points = 0;
var hoursLeft_text;
var log_text;
var log_string = "\n";

var left = false;

main.prototype = {
    preload: function() {
        console.log("Main state :)");
        state_game = this.game;
        console.log("Loading assets...");
        this.game.load.spritesheet('meatly' , "res/meatly.png" , 128 , 128);
        this.game.load.spritesheet('code' , "res/code.png" , 300 , 300);
        this.game.load.image('white' , "res/white.png");
        this.game.load.image('floor' , "res/floor.png");
        this.game.load.image('prog' , "res/progParticle.png");
        console.log("Assets loaded.");
    },
    
    create: function() {
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        background = this.game.add.sprite(0,0,'white');
        background.scale.setTo(31.5,18.75);
        
        player = this.game.add.sprite((this.game.width / 2) - 64,0,'meatly');
        player.animations.add('idle', [16 , 17 , 19] , .3 , true);
        player.animations.add('left', [0 , 1 , 2 , 3 , 4 , 5 , 6 , 7] , 10 , true);
        player.animations.add('right', [15 , 14 , 13 , 12 , 11 , 10 , 9 , 8] , 10 , true);
        player.animations.add('code' , [17 , 21 , 17] , .6 , true)
        this.game.physics.arcade.enable(player);
        player.body.gravity.y = 300;
        player.body.bounce.x = 25;
        player.body.setSize(30,128);
        player.body.offset = new Phaser.Point(50,0);
        player.body.collideWorldBounds = true;
        
        object_computer_code = this.game.add.sprite(this.game.width - 128 , this.game.height -128 , 'meatly');
        object_computer_code.animations.add('single' , [49]);
        object_computer_code.animations.play('single' , 1);
        this.game.physics.arcade.enable(object_computer_code);
        object_computer_code.body.setSize(80,128);
        object_computer_code.body.offset = new Phaser.Point(25 , 0);
        object_computer_code.body.immovable = true;
        
        this.game.add.text(object_computer_code.x + 25 , object_computer_code.y - 50 , "Code!" , {font:"20px Arial"});
        
        object_logo = this.game.add.sprite((this.game.width / 2) - 64 , 0 , 'meatly');
        object_logo.animations.add('single' , [61]);
        object_logo.animations.play('single' , 1);
        
        hoursLeft_text = this.game.add.text((this.game.width / 2) - (80) , 75 , "Hours left: " + hoursLeft);
        log_text = this.game.add.text((this.game.width / 2) - (80) , 90 , log_string , {font:"10px Arial"});
        
/*        
        object_floor = this.game.add.sprite(0, this.game.height - 160, 'floor');
        object_floor.scale.setTo(10,1);
        object_floor.enableBody = true;
*/ 
        
    },
    
    update: function() {
        cursors = this.game.input.keyboard.createCursorKeys();
        
        hoursLeft_text.text = "Hours left: " + hoursLeft;
        
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
        
         this.game.physics.arcade.collide(player , object_computer_code , function() { //Collison: Player -> computer
            code_display = state_game.add.sprite(state_game.width - 300,0,'code');
            code_display.animations.add('code' , [1 , 2 , 3 , 0] , 2 , false);
            code_display.animations.play('code');
            code_points++;
            reduceHours("coding");
            player.animations.play('code');
            console.log("hit");
        });
        
    }
}

var reduceHours = function(reason) {
    hoursLeft-=10;
    
    if(left) {
        log_string = log_string + "\t" + "- 1hr. for " + reason;
        left = false;
    } else {
        log_string = log_string + "\n" + "- 1hr. for " + reason; 
        left = true;
    }
    
    if(hoursLeft % 5 == 0 && hoursLeft != 5) {
        hoursLeft -=2; //For sleep
        if(left) {
        log_string = log_string + "\t" + "- 2hr. for sleep";
        left = false;
    } else {
        log_string = log_string + "\n" + "- 2hr. for sleep";
        left = true;
    }
    }
    
    log_text.text = log_string;
    
    if(hoursLeft <= 0) state_game.state.start('over');
}
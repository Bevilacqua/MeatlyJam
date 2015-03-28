var main = function(game) {
};

var object_computer_code , object_computer_art , object_logo;
var body_computer;
var code_display , art_display;
var player;
var background;

var state_game;

var idea_generated = false;
var idea = "";

var hoursLeft = 48;
var code_points = 0;
var art_points = 0;

var hoursLeft_text;
var start_text;
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
        this.game.load.spritesheet('art' , "res/art.png" , 300 , 300);
        this.game.load.image('white' , "res/white.png");
        this.game.load.image('floor' , "res/floor.png");
        this.game.load.image('prog' , "res/progParticle.png");
        console.log("Assets loaded.");
    },
    
    create: function() {
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        background = this.game.add.sprite(0,0,'white');
        background.scale.setTo(31.5,18.75);
        
        player = this.game.add.sprite((this.game.width / 2) ,this.game.height,'meatly');
        player.anchor.set(.5);
        player.animations.add('idle', [16 , 17 , 19] , .3 , true);
        player.animations.add('left', [0 , 1 , 2 , 3 , 4 , 5 , 6 , 7] , 11 , true);
        player.animations.add('right', [15 , 14 , 13 , 12 , 11 , 10 , 9 , 8] , 11 , true);
        player.animations.add('code' , [17 , 21 , 17] , .6 , true)
        this.game.physics.arcade.enable(player);
        player.body.gravity.y = 300;
        player.body.bounce.x = 25;
        player.body.setSize(30,128);
        player.body.collideWorldBounds = true;
        
        object_computer_code = this.game.add.sprite(this.game.width - 128 , this.game.height -128 , 'meatly');
        object_computer_code.animations.add('single' , [49]);
        object_computer_code.animations.play('single' , 1);
        this.game.physics.arcade.enable(object_computer_code);
        object_computer_code.body.setSize(80,128);
        object_computer_code.body.offset = new Phaser.Point(25 , 0);
        object_computer_code.body.immovable = true;
        
        this.game.add.text(object_computer_code.x + 25 , object_computer_code.y - 50 , "Code!" , {font:"20px Arial"});
        
        object_computer_art = this.game.add.sprite(0 , this.game.height -128 , 'meatly');
        object_computer_art.animations.add('single' , [48]);
        object_computer_art.animations.play('single' , 1);
        this.game.physics.arcade.enable(object_computer_art);
        object_computer_art.body.setSize(80,128);
        object_computer_art.body.offset = new Phaser.Point(25 , 0);
        object_computer_art.body.immovable = true;
        
        this.game.add.text(object_computer_art.x + 30 , object_computer_code.y - 50 , "Art!" , {font:"20px Arial"});
        
        object_logo = this.game.add.sprite((this.game.width / 2) , 64 , 'meatly');
        object_logo.anchor.set(.5);
        object_logo.animations.add('single' , [61]);
        object_logo.animations.play('single' , 1);
        
        hoursLeft_text = this.game.add.text((this.game.width / 2) , 75 , "Hours left: " + hoursLeft);
        hoursLeft_text.anchor.set(.5,0);
        log_text = this.game.add.text((this.game.width / 2) , 90 , "" , {font:"10px Arial"});
        log_text.anchor.set(.5,0);

        start_text = this.game.add.text(this.game.width /2 , this.game.height / 2 , "Press ENTER to generate your brilliant game idea!");
        start_text.anchor.set(.5);
    },
    
    update: function() {
        var startKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        
        if(!idea_generated) {
            player.animations.play('idle');
            if(startKey.isDown) {
                reduceHours("idea");
                var rand = state_game.rnd.integerInRange(0, 10);
                
                switch(rand) {
                    case 1:
                        idea = "Rainbow pony!";
                        break;
                    case 2:
                        idea = "Cyborg cow.";
                        break;
                    case 3:
                        idea = "French toast comes to life?";
                        break;
                    case 4:
                        idea = "Killer cats.";
                        break;
                    case 5:
                        idea = "The inside of an ant's body!";
                        break;
                    case 6:
                        idea = "Strange letters from your creepy neighbor.";
                        break;
                    case 7:
                        idea = "A game without an idea.";
                        break;
                    case 8:
                        idea = "British fishing boats!";
                        break;
                    case 9:
                        idea = "Sharpie sniffing.";
                        break;
                    default:
                        idea = "Gameception...";
                        break;
                        
                }
                
                var ideaText = this.game.add.text(this.game.width / 2 , 120 , "Game idea: " + idea , {font:"12px Arial"});
                ideaText.anchor.set(.5);
                
                idea_generated = true;
                start_text.destroy();
                player.x = (this.game.width / 2);
            }
            return;
        }
        
        cursors = this.game.input.keyboard.createCursorKeys();
        
        hoursLeft_text.text = "Hours left: " + hoursLeft;
        
        if(cursors.left.isDown) {
            player.body.velocity.x = -200;
            player.animations.play('left');
        } else if(cursors.right.isDown) {
            player.body.velocity.x = 200;
            player.animations.play('right');
        } else {
            player.body.velocity.x = 0;
            player.animations.play('idle');
        }
        
         this.game.physics.arcade.collide(player , object_computer_code , function() { //Collison: Player -> computer(code)
            code_display = state_game.add.sprite(state_game.width - 300,0,'code');
            code_display.animations.add('code' , [1 , 2 , 3 , 0] , 2 , false);
            code_display.animations.play('code');
            code_points++;
            reduceHours("coding");
            player.animations.play('code');
        });
        
        this.game.physics.arcade.collide(player , object_computer_art , function() { //Collison: Player -> computer(art)
            art_display = state_game.add.sprite(0 , 0 , 'art');
            var rand = state_game.rnd.integerInRange(0, 4);
            if(rand == 1)
                art_display.animations.add('art' , [1,2,0,3] , 2 , false);
            else if(rand == 2)
                art_display.animations.add('art' , [1,0,2,3] , 2 , false);
            else
                art_display.animations.add('art' , [0,1,2,3] , 2 , false);
            
            art_display.animations.play('art');
            art_points++;
            reduceHours("art");
            player.animations.play('code');
        });
        
    }
}

var reduceHours = function(reason) {
    hoursLeft--;
    player.x = (state_game.width / 2);
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
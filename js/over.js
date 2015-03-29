var over = function(game) {
};

var negativeComment = "- Nothing";
var positiveComment = "Nothing -";

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
        
        var congratsText = this.game.add.text(this.game.width / 2 , 50 ,  "Congrats! You finished your game in time!" , {align:"center"});
        congratsText.anchor.set(.5);
        
        var scoreText = this.game.add.text(this.game.width / 2 , 75 , "Rating: " + generateStar(this.game.global.code , this.game.global.art , this.game.global.sleep) + " / 5");
        scoreText.anchor.set(.5);
        
        var negative = this.game.add.sprite(100 , this.game.height / 2 , 'meatly');
        negative.animations.add('negative' , [51,50,51,51,51] , 1 , true);
        negative.animations.play('negative' , 1);
        
        var negative_review = this.game.add.text((this.game.width / 2) - 20, (this.game.height / 2) + 40, negativeComment);
        negative_review.anchor.set(.5);
        
        var positive = this.game.add.sprite(this.game.width - 228 , (this.game.height / 2) + 20, 'meatly');
        positive.animations.add('positive' , [52,52,52,53,52] , 1 , true);
        positive.animations.play('positive' , 1);
        
        var positive_review = this.game.add.text((this.game.width / 2) + 20 , (this.game.height / 2) + 80 , positiveComment);
        positive_review.anchor.set(.5);
    },

    update: function() {
        
    }
}

function generateStar(code , art , sleep) {
    var star = 0;
    
    if(sleep == 0) {
        star--;
        if(negativeComment == "- Nothing")negativeComment = "- So many spelling errors!";
    }
    
    if(art < 10) {
        star--;
        if(negativeComment == "- Nothing")negativeComment = "- I drew better graphics in my sleep.";
    }
    
    if(code < 10) {
        star--;
        if(negativeComment == "- Nothing")negativeComment = "- This game is so boring. Kill me!";
    }
    
    if(sleep > 4) star++;
    else if(sleep > 8) {
        star+= 2;
        if(positiveComment == "Nothing -")positiveComment = "Very clean game. -";
    }
    
    if(code > art && sleep > 2) star++;
    else if(code > art && sleep == 0) {
        star++;
        if(positiveComment == "Nothing -")positiveComment = "The work put into the mechanics shows. -";
    }
    
    if(code > 10) {
        star++;
        if(positiveComment == "Nothing -")positiveComment = "Good gameplay -";
    }
    if(art > 10) star++;
    if(sleep * code > 30) star++;
    if(art * sleep > 28) star++;
    
    if(art * code > 55) {
        star++;
        positiveComment = "I would pay for this game! -";
    }
    
    if(star < 0) star = 0;
    if(star > 5) star = 5;
    
    if(positiveComment == "Nothing -")positiveComment = "Not bad -";
    if(negativeComment == "- Nothing")negativeComment = "- All your ideas suck. Just like you.";
    
    return star;
}
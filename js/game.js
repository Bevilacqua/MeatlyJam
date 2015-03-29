(function() {
    var game = new Phaser.Game(1000 , 600 , Phaser.AUTO , '');
    game.state.add('setup' , setup);
    game.state.add('main' , main)
    game.state.add('over' , over);
    
    game.global = {
        sleep: 0,
        code: 0,
        art: 0
    }
    
    game.state.start('setup'); 
})();



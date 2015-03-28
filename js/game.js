(function() {
    var game = new Phaser.Game(1000 , 600 , Phaser.AUTO , '');
    game.state.add('setup' , setup);
    game.state.add('main' , main)
    game.state.start('setup'); 
})();


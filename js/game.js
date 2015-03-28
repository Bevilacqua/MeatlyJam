var game = new Phaser.Game(1000 , 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function init() {
    game.scale.pageAlignHorizontally = true;
    game.scale.refresh();
}

function preload() {
    init();
}

function create() {
}

function update() {
}
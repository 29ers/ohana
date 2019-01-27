import Phaser from 'phaser';

export class Win extends Phaser.Scene {
    constructor () {
        super({
            key: 'win'
        })
    }

    create () {

        let winLabel = this.add.text(window.innerWidth/2.8, 200, 'YOU WIN!!!!!!', {fontSize: '50px', fill: '#fff'});
        let startLabel = this.add.text(400, 400, 'Press the "W" key to play again', {fontSize: '25px', fill: '#fff'});
        this.input.keyboard.on('keydown_' + 'W', () => {this.scene.start('levelOne')});

    }
}
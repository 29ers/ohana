import Phaser from 'phaser';

export class Die extends Phaser.Scene {
    constructor () {
        super({
            key: 'die'
        })
    }

    create () {

        let nameLabel = this.add.text(window.innerWidth/2.8, 200, 'YOU DIE!!!!!!!!!!', {fontSize: '50px', fill: '#fff'});
        let startLabel = this.add.text(400, 400, 'Press the "W" key to restart', {fontSize: '25px', fill: '#fff'});

        this.input.keyboard.on('keydown_' + 'W', () => {this.scene.start('levelOne')});
    }
}
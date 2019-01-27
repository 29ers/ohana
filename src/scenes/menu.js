import Phaser from 'phaser';

export class Menu extends Phaser.Scene {
    constructor () {
        super({
            key: 'menu'
        })
    }

    create () {

        let nameLabel = this.add.text(window.innerWidth/2.8, 200, 'OHANA', {fontSize: '50px', fill: '#fff'});
        let startLabel = this.add.text(400, 400, 'Press the "W" key to start', {fontSize: '25px', fill: '#fff'});
        this.input.keyboard.on('keydown_' + 'W', () => {this.scene.start('levelOne')});

    }
}

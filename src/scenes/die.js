import Phaser from 'phaser';

export class Die extends Phaser.Scene {
    constructor () {
        super({
            key: 'die'
        })
    }

    create () {
        this.cameras.main.setBackgroundColor('#cb4335');
        console.log('Die')
        // this.scene.start('win')
    }
}
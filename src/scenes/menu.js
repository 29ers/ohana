import Phaser from 'phaser';


export class Menu extends Phaser.Scene {
    constructor () {
        super({
            key: 'menu'
        })
    }

    create () {
        console.log('Menu')
        this.cameras.main.setBackgroundColor('#D35400');
        this.scene.start('BossBattle')
    }
}
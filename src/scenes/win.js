import Phaser from 'phaser';

export class Win extends Phaser.Scene {
    constructor () {
        super({
            key: 'win'
        })
    }

    create () {

        console.log('Win')
        this.cameras.main.setBackgroundColor('#58D68D');
    }
}
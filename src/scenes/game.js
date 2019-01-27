import Phaser from 'phaser';

// var player;
// var cursors;
export class Game extends Phaser.Scene {
    constructor () {
        super({
            key: 'game',
            active: true
        })
    }

    preload ()
    {
        // this.load.spritesheet('player', 'assets/player.png', { frameWidth: 128, frameHeight: 120});
    }

    create () {


        // player = this.physics.add.sprite(100, 450, 'player')
        // player.setBounce(0.2);
        // player.setCollideWorldBounds(true);

        // this.anims.create({

        //     key: "left",
        //     frames: this.anims.generateFrameNumbers('player', {start: 0, end: 6}),
        //     frameRate: 20,
        //     repeat: -1

        // })

        // this.anims.create({

        //     key: "turn",
        //     frames: [{key:'player', frame: 7}],
        //     frameRate: 20

        // })

        // this.anims.create({

        //     key: "right",
        //     frames: this.anims.generateFrameNumbers('player', {start: 8, end: 17}),
        //     frameRate: 10,
        //     repeat: -1

        // })

        // cursors = this.input.keyboard.createCursorKeys();
        this.scene.launch('levelOne')

    }

    update () {

        // if (cursors.left.isDown) {
        //     player.setVelocityX(-160);
        //     player.anims.play('left', true)
        // } else if (cursors.right.isDown) {
        //     player.setVelocityX(160);
        //     player.anims.play('right', true)
        // } else {
        //     player.setVelocityX(0);
        //     player.anims.play('turn', true)
        // }

        // if (cursors.up.isDown && player.body.touching.down) {

        //     player.setVelocityY(-370)
        // }

    }
}
import Phaser from 'phaser';


var player;
var cursors;
var platforms;
var playerHealth = 100;
var bossHealth = 100;

export class BossThrfee extends Phaser.Scene {
    constructor () {
        super({
            key: 'bossThree',
            parent: 'ohana',
        })
    }

    preload ()
    {
        this.load.image('platforms', 'assets/ground.png');
        this.load.image('background', 'assets/Forest.png'); //get new background
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 128, frameHeight: 120});

        //Import Boss
    }

    create () {

        platforms = this.physics.add.staticGroup();
        platforms.create(500,800, 'platforms').setScale(4).refreshBody();

        this.background = this.add.tileSprite(window.innerWidth/2.35, window.innerHeight/2.06,1200,800, 'background')
        player = this.physics.add.sprite(100, 450, 'player')
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        this.physics.add.collider(player, platforms)

        this.anims.create({

            key: "left",
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 6}),
            frameRate: 20,
            repeat: -1

        })

        this.anims.create({

            key: "turn",
            frames: [{key:'player', frame: 7}],
            frameRate: 20

        })

        this.anims.create({

            key: "right",
            frames: this.anims.generateFrameNumbers('player', {start: 8, end: 17}),
            frameRate: 10,
            repeat: -1

        })

        cursors = this.input.keyboard.createCursorKeys();
    }

    update () {

        if (cursors.left.isDown) {
            direction = -1;
            player.setVelocityX(-160);
            player.anims.play('left', true)
        } else if (cursors.right.isDown) {
            direction = 1;
            player.setVelocityX(160);
            player.anims.play('right', true)
        } else {
            direction = 0;
            player.setVelocityX(0);
            player.anims.play('turn', true)
        }

        if (bossHealth === 0) {

            this.scene.start('levelFour')
        }


        if (playerHealth === 0 ) {

            this.scene.start('die')
        }
    }

    playerTakeDamage () {

    }

    bossTakeDamage () {

    }

}

import Phaser from 'phaser';

var player;
var boss;
var cursors;
var platforms;
var bullets;

export class BossOne extends Phaser.Scene {
    constructor () {
        super({
            key: 'bossOne',
            parent: 'ohana'
        })
    }

    preload ()
    {
        this.load.image('platforms', 'assets/ground.png');
        this.load.image('background', 'assets/Forest.png');
        //this.load.image('bullet', 'assets/rock.png');
        this.load.spritesheet('bullet', 'assets/rock.png', { frameWidth: 128, frameHeight: 120});
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 128, frameHeight: 120});
        this.load.spritesheet('boss', 'assets/BossForestFrame.png',{ frameWidth: 128, frameHeight: 200});
    }

    create () {

        var Bullet = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        intialize:

        function Bullet (scene)
         {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
            this.speed = Phaser.Math.GetSpeed(-400, 1);
         },
            fire: function (x, y)
            {
                this.setPosition(x - 25, y);
                this.setActive(true);
                this.setVisible(true);
            },
            update: function (time, delta)
            {
                this.x -= this.speed * delta;
                if (this.x < -50)
                {
                    this.setActive(false);
                    this.setVisible(false);
                }
            }
        });

        bullets = this.add.group({
            classType: Bullet,
            maxSize: 10,
            runChildUpdate: true
        });

        platforms = this.physics.add.staticGroup();
        platforms.create(500,800, 'platforms').setScale(4).refreshBody();

        this.background = this.add.tileSprite(window.innerWidth/2.35, window.innerHeight/2.06,1600,800, 'background')
        player = this.physics.add.sprite(100, 450, 'player')
        boss = this.physics.add.sprite( 900 , 450, 'boss')
        boss.setBounce(0.2);
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        boss.setCollideWorldBounds(true);

        this.physics.add.collider(player, platforms)
        this.physics.add.collider(boss, platforms)


        this.anims.create({

            key: "left",
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 6}),
            frameRate: 10,
            repeat: -1

        })

        this.anims.create({

            key: "turn",
            frames: [{key:'player', frame: 7}],
            frameRate: 10

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
        let direction = 0;

        // boss.setVelocityX(100);
        // boss.anims.play('turn', true)
        boss.setVelocityY(-10)

        if (cursors.left.isDown) {
            direction = -1;
            player.setVelocityX(-300);
            player.anims.play('left', true)
        } else if (cursors.right.isDown) {
            direction = 1;
            player.setVelocityX(300);
            player.anims.play('right', true)
        } else {
            direction = 0;
            player.setVelocityX(0);
            player.anims.play('turn', true)
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-370)
            let throwsound = this.sound.add("throw")
            throwsound.play()
            var bullet = bullets.get();
            if (bullet)
            {
                bullet.fire(player.x, player.y);
                // lastFired = time + 50;
            }

        }

        this.background.tilePositionX += direction*5

    }

}
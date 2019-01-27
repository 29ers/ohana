import Phaser from 'phaser';


var player;
var cursors;
var platforms;
var star;

export class LevelOne extends Phaser.Scene {
    constructor () {
        super({
            key: 'levelOne',
            parent: 'ohana'
        })
    }

    preload ()
    {
        this.load.image('platforms', 'assets/ground.png');
        this.load.image('background', 'assets/Forest.png');
        this.load.image('star', 'assets/stick.png')
        this.load.image('bomb', 'assets/bomb.png')
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 128, frameHeight: 120});

    }
    
    create () {



        this.background = this.add.tileSprite(window.innerWidth/2.35, window.innerHeight/2.06,1200,800, 'background')
        player = this.physics.add.sprite(100, 450, 'player')

        platforms = this.physics.add.staticGroup();
        platforms.create(500,800, 'platforms').setScale(4).refreshBody();

        platforms.create(200, 550, 'platforms').setScale(.5).refreshBody();
        platforms.create(800, 500, 'platforms').setScale(.5).refreshBody();

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

        stars = this.physics.add.group({
            key: 'star',
            repeat: 12,
            setXY: { x: 12, y: 15, stepX: 70 },
        });
        stars.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        
        });
        this.physics.add.collider(stars, platforms);
        this.physics.add.overlap(player, stars, collectStar, null, this);

        var score = 0;
        var scoreText;

        bombs = this.physics.add.group();

        this.physics.add.collider(bombs, platforms);

        this.physics.add.collider(player, bombs, hitBomb, null, this);
        hitBomb (player, bomb)
        {
            this.physics.pause();

            player.setTint(0xff0000);

            player.anims.play('turn');

            gameOver = true;
        }

        collectStar (player, stars)
        {
            star.disableBody(true, true);

            score += 10;
            scoreText.setText('Score: ' + score);

            if (stars.countActive(true) === 0)
            {
                stars.children.iterate(function (child) {

                    child.enableBody(true, child.x, 0, true, true);

                });

                var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

                var bomb = bombs.create(x, 16, 'bomb');
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

            }
        }
            scoreText = this.add.text(16, 16, 'sticks: 0', { fontSize: '32px', fill: '#000'})
    }

    update () {
        let direction = 0;

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

        if (cursors.up.isDown && player.body.touching.down) {

            player.setVelocityY(-370)
        }
        this.background.tilePositionX += direction*5

    }
}

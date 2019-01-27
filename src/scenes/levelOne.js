import Phaser from 'phaser';

var player;
var resourcesGathered = 0;
var resourcesGatheredText;
var resourcesMax = 100;
var resourcesDropped = 0;
var playerHealth = 100;
var map;
var groundLayer;
var stars;
var cursors;

export class LevelOne extends Phaser.Scene {
    constructor () {
        super({
            key: 'levelOne',
            parent: 'ohana',
        })
    }

    preload ()
    {
        this.load.tilemapTiledJSON('map', 'assets/map.json');
        this.load.spritesheet('tiles', 'assets/tiles.png', {frameWidth: 70, frameHeight: 70});
        // this.load.image('platforms', 'assets/ground.png');
        this.load.image('background', 'assets/Forest.png');
        this.load.image('star', 'assets/invader.png');
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 128, frameHeight: 120});
    }

    create () {

        this.background = this.add.tileSprite(window.innerWidth/2.23, window.innerHeight/2.15,1200,800, 'background')
        map = this.make.tilemap({ key: 'map' })
        var groundTiles = map.addTilesetImage('tiles')
        groundLayer = map.createDynamicLayer('World', groundTiles, 1, 200)
        groundLayer.setCollisionByExclusion([-1]);

        this.physics.world.bounds.width = groundLayer.width;
        this.physics.world.bounds.height = groundLayer.height;

        // groundTiles = this.physics.add.staticGroup();
        // platforms.create(500,800, 'platforms').setScale(4).refreshBody();
        player = this.physics.add.sprite(100, 200, 'player')
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        // player.body.setSize(player.width, player.height-8);

        // this.physics.add.overlap(player, resource, collectResources, null, this);
        // this.physics.add.overlap(player, bomb, collectResources, null, this);

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
            repeat: 15,
            setXY: {x: 12, y: 0, stepX: 140}
        })

        stars.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
        });

        this.physics.add.collider(player, groundLayer);
        this.physics.add.collider(stars, groundLayer);
        this.physics.add.collider(stars, player);


        resourcesGatheredText = this.add.text(16, 16, "Resources Gathered: 0", {fontSize: '32px', fill: '#fff'})
        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(75, 100, map.widthInPixels, map.heightInPixels);
        // make the camera follow the player
        this.cameras.main.startFollow(player);

        // set background color, so the sky is not black
        this.cameras.main.setBackgroundColor('#ccccff');

        this.input.keyboard.on('keydown_' + 'SPACE', () => {this.scene.start('bossOne')});

        // this.physics.add.overlap(player, star, (star) =>
        //     {star.disableBody(true, true);
        //     resourcesGathered += 1;
        //     resourcesGatheredText.updateText("Resources Gathered: " + resourcesGathered);}, null, this)

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

        if (cursors.up.isDown && player.body.onFloor()) {

            player.setVelocityY(-370)
        }

        this.background.tilePositionX += direction*5


        if (resourcesGathered === resourcesMax || resourcesDropped === 100) {

            this.scene.start('bossOne')
        }

        if (playerHealth === 0) {

            this.scene.start('die')
        }
    }

    collectStar (star) {

        star.disableBody(true, true);
        resourcesGathered += 1;
        resourcesGatheredText.updateText("Resources Gathered: " + resourcesGathered);

    }

    takeDamage (bomb) {

        bomb.disableBody(true, true);
        playerHealth = 0;
    }
}

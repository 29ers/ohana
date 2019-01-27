import Phaser from 'phaser';

var player;
var aliens;
var bullets;
// var invader;
var bulletTime = 0;
var cursors;
var fireButton;
// var explosions;
var enemyBullets;
var firingTimer = 0;
var livingEnemies = [];

export class LevelFour extends Phaser.Scene {
    constructor () {
        super({
            key: 'levelFour',
            parent: 'ohana',
        })
    }
    // REPLACE MOST OF THIS WITH SPACE INVADERS GAME //
    preload ()
    {
        this.load.image('bullet', 'assets/siBullet.png');
        this.load.image('enemyBullet', 'assets/enemy-bullet.png');
        this.load.spritesheet('invader', 'assets/invader32x32x4.png', { frameWidth: 32, frameHeight: 32});
        this.load.image('ship', 'assets/siPlayer.png');
        // this.load.spritesheet('kaboom', 'assets/explode.png', { frameWidth: 128, frameHeight: 128});
        this.load.image('starfield', 'assets/starfield.png');
    }

    create () {

        //  The scrolling starfield background
        this.background = this.add.tileSprite(window.innerWidth/2.35, window.innerHeight/2.06,1200,800, 'starfield')

        //  Our bullet group
        bullets = this.physics.add.group({
            key: 'bullet',
            repeat: 30,
            setXY: { x: 0.5, y: 1, stepX: 140 }
        });

        // The enemy's bullets
        enemyBullets = this.physics.add.group({
            key: 'enemyBullet',
            repeat: 30,
            setXY: { x: 0.5, y: 1, stepX: 140 }
        });

        //  The hero!
        player = this.physics.add.sprite(400, 500, 'ship').setOrigin(0.5, 0.5);
        player.setCollideWorldBounds(true);

        //  The baddies!
        aliens = this.physics.add.group({
            gravity: 0
        });
        // aliens.enableBody = true;

        createAliens();
        aliens.setCollideWorldBounds(true);

        this.anims.create({

            key: "invader",
            frames: this.anims.generateFrameNumbers('invader', {start: 0, end: 3}),
            frameRate: 20,
            repeat: -1

        })

        this.anims.create({

            key: "kaboom",
            frames: this.anims.generateFrameNumbers('kaboom', {start: 0, end: 14}),
            frameRate: 20,
            repeat: -1

        })

        //  An explosion pool
        // explosions = this.physics.add.group({
        //     key: 'kaboom',
        //     repeat: 30,
        //     setXY: { x: 0.5, y: 1, stepX: 140 }
        // });
        // explosions.createMultiple(30, 'kaboom');
        explosions.forEach(setupInvader, this);

        //  And some controls to play the game with
        cursors = this.input.keyboard.createCursorKeys();
        fireButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.tweens.add({
            targets: aliens,
            x: 700,
            duration: 3000,
            ease: 0,
            repeat: 0,
            loop: this.descend,
            delay: 1000
        });
    }

    update () {
        this.background.tilePosition.y += 2;

        //  Run collision
        this.physics.add.overlap(bullets, aliens, collisionHandler, null, this);
        this.physics.add.overlap(enemyBullets, player, enemyHitsPlayer, null, this);

        if (cursors.left.isDown) {

            player.setVelocityX(-200);
            player.anims.play('left', true)
        } else if (cursors.right.isDown) {

            player.setVelocityX(200);
            player.anims.play('right', true)
        } else {

            player.setVelocityX(0);
            player.anims.play('turn', true)
        }

        if (fireButton.isDown)
        {
            fireBullet();
        }

        if (this.time.now > firingTimer)
        {
            enemyFires();
        }

        if (livingEnemies.length === 0) {

            this.scene.start('win')
        }
    }
}

function createAliens () {


    for (var y = 0; y < 4; y++)
    {
        for (var x = 0; x < 10; x++)
        {
            aliens.create(x * 48, y * 50, 'invader').setOrigin(0.5, 0.5);
            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
            // alien.play('fly');
            // alien.body.moves = false;
        }
    }

    aliens.x = 100;
    aliens.y = 50;

    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.

}

// function setupInvader (invader) {

//     invader.setOrigin(0.5, 0.5);
// }

function descend() {

    aliens.y += 10;

}

function collisionHandler (bullet, alien) {

    //  When a bullet hits an alien we kill them both
    bullet.kill();
    alien.kill();

    //  Increase the score
    score += 20;
    scoreText.text = scoreString + score;

    //  And create an explosion :)
    // var explosion = explosions.getFirstExists(false);
    // explosion.reset(alien.body.x, alien.body.y);
    // explosion.play('kaboom', 30, false, true);

    if (aliens.countLiving() == 0)
    {
        score += 1000;
        scoreText.text = scoreString + score;

        enemyBullets.callAll('kill',this);
        stateText.text = " You Won, \n Click to restart";
        stateText.visible = true;

    }

}

function enemyHitsPlayer (player,bullet) {

    bullet.kill();

    live = lives.getFirstAlive();

    if (live)
    {
        live.kill();
    }

    //  And create an explosion :)
    // var explosion = explosions.getFirstExists(false);
    // explosion.reset(player.body.x, player.body.y);
    // explosion.play('kaboom', 30, false, true);

    // When the player dies
    if (lives.countLiving() < 1)
    {
        player.kill();
        enemyBullets.callAll('kill');

        stateText.text=" GAME OVER \n Click to restart";
        stateText.visible = true;
    }

}

function enemyFires () {

    //  Grab the first bullet we can from the pool
    enemyBullet = enemyBullets.getFirstExists(false);

    livingEnemies.length=0;

    aliens.forEachAlive(function(alien){

        // put every living enemy in an array
        livingEnemies.push(alien);
    });


    if (enemyBullet && livingEnemies.length > 0)
    {

        var random=Phaser.Math.Between(0,livingEnemies.length-1);

        // randomly select one of them
        var shooter=livingEnemies[random];
        // And fire the bullet from this enemy
        enemyBullet.reset(shooter.body.x, shooter.body.y);

        this.physics.moveToObject(enemyBullet,player,120);
        firingTimer = this.time.now + 2000;
    }

}

function fireBullet () {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (this.time.now > bulletTime)
    {
        //  Grab the first bullet we can from the pool
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            //  And fire it
            bullet.reset(player.x, player.y + 8);
            bullet.body.velocity.y = -400;
            bulletTime = this.time.now + 200;
        }
    }

}
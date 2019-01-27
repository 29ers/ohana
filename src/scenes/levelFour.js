
import Phaser from 'phaser';

var bullets;
var ship;
var speed;
var stats;
var cursors;
var lastFired = 0;
var earth;
var aliens
var enemyBullets
export class LevelFour extends Phaser.Scene {
    constructor () {
        super({
            key: 'levelFour',
            parent: 'ohana',
        })
    }
    
    preload ()
    {
        this.load.image('enemybullet', 'assets/enemy-bullet.png')
        this.load.image('invader', 'assets/invader32x32x4.png', 32, 32)
        this.load.image('ship', 'assets/siPlayer.png');
        this.load.image('bullet', 'assets/siBullet.png');
        this.load.image('earth', 'assets/earth.png')
        this.load.image('starfield', 'assets/starfield.png')
        this.load.image('explode', 'assets/explode.png')
    }
    
    create ()
    
    {
        this.background = this.add.tileSprite(window.innerWidth/2.35, window.innerHeight/2.06,1200,800, 'starfield')
        
        var Bullet = new Phaser.Class({
    
            Extends: Phaser.GameObjects.Image,
    
            initialize:
    
            function Bullet (scene)
            {
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
    
                this.speed = Phaser.Math.GetSpeed(300, 1);
            },
    
            fire: function (posx, posy)
            {
                this.setPosition(posx, posy  -50);
    
                this.setActive(true);
                this.setVisible(true);
            },
    
            update: function (time, delta)
            {
                this.y -= this.speed * delta;
    
                if (this.y < -50)
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


        
        earth = this.add.sprite(475, 700, 'earth')
        ship = this.add.sprite(400, 500, 'ship').setDepth(1);
        ship.setCollideWorldBounds = true;

        cursors = this.input.keyboard.createCursorKeys();
        speed = Phaser.Math.GetSpeed(300, 1);
        //  The baddies!

        
        aliens = this.add.group()
        aliens.enableBody = true;
        aliens.physicsBodyType = Phaser.Physics.ARCADE;

        function createAliens () {
        

            for (var y = 0; y < 4; y++)
            {
                for (var x = 0; x < 5; x++)
                {
                    
                    var alien = aliens.create(x * 100, y * 48, 'invader').setOrigin(-1.5, -1.5);
                    
                }
            }
        
            aliens.x = 20;
            aliens.y = 20;
            
            
        }
        createAliens();     
 
        //  When the tween loops it calls descend


        // function setupInvader (invader) {

        //     invader.anchor.x = 0.5;
        //     invader.anchor.y = 0.5;
        //     invader.animations.add('kaboom');

        // }
        // setupInvader();

}


    
    // function setupInvader (invader) {

    //     invader.anchor.x = 0.5;
    //     invader.anchor.y = 0.5;
    //     invader.animations.add('kaboom');

    // }

        // descend() {

        //     aliens.y += 10;

        // }

    update (time, delta)
    
    {
        if (cursors.left.isDown)
        {
            ship.x -= speed * delta;
        }
        else if (cursors.right.isDown)
        {
            ship.x += speed * delta;
        }
    
        if (cursors.up.isDown && time > lastFired)
        {
            var bullet = bullets.get();
    
            if (bullet)
            {
                bullet.fire(ship.x, ship.y);
    
                lastFired = time + 100;
            }
        }
    }

}
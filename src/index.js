import Phaser from 'phaser';
import { Menu } from './scenes/menu';
import { LevelOne } from './scenes/levelOne';
import { LevelTwo } from './scenes/levelTwo';
import { LevelThree } from './scenes/levelThree';
import { LevelFour } from './scenes/levelFour';
import { Die } from './scenes/die';
import { Win } from './scenes/win';
import { BossOne } from './scenes/bossOne';
import { BossTwo } from './scenes/bossTwo';
import { BossThree } from './scenes/bossThree';

const config = {
    type: Phaser.AUTO,
    parent: 'ohana',
    width: 1200,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300},
            debug: false
        }
    },
    scene: [ Menu, LevelOne, BossOne, Die, Win, LevelTwo, BossTwo, LevelThree, BossThree, LevelFour ]
};

const game = new Phaser.Game(config);

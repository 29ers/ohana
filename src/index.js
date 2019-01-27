import Phaser from 'phaser';
import { Menu } from './scenes/menu';
import { LevelOne } from './scenes/levelOne';
import { LevelTwo } from './scenes/levelTwo';
import { LevelThree } from './scenes/levelThree';
import { LevelFour } from './scenes/levelFour';
import { Die } from './scenes/die';
import { Win } from './scenes/win';
import { BossBattle } from'./scenes/bossBattle';
import { BossOne } from './scenes/bossOne';
import { BossTwo } from './scenes/bossTwo';
import { BossThree } from './scenes/bossThree';

const config = {
    type: Phaser.AUTO,
    parent: 'ohana',
    width: 1600,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300},
            debug: false
        }
    },
    scene: [ Menu, LevelOne, Die, Win, BossOne, LevelTwo, BossTwo, LevelThree, BossThree, LevelFour ]
};
var platforms;
var stars;

const game = new Phaser.Game(config);

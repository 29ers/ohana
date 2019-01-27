import Phaser from 'phaser';
import { Menu } from './scenes/menu';
import { Game } from './scenes/game';
import { LevelOne } from './scenes/levelOne';
import { Die } from './scenes/die';
import { Win } from './scenes/win';

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
    scene: [ Menu, Game, LevelOne, Die, Win ]
};
var platforms;
var stars;

const game = new Phaser.Game(config);

//游戏所有元素的动作对象

import {
    lib
} from './public.js';

import {
    progressObj,
    PJNum,
    totalProgressSprite,
    createFactory
}
from './gameProgress';
//所有行为
let behaviorList = {
    //背景图片用的这个行为
    moveLeftToRight: function() {
        this.behaviorName = 'moveLeftToRight';
        this.lastMove = 0;
        this.fpsNum = 60;
        this.execute = function(sprite, context, time, fpsNum) {
            this.fpsNum = (fpsNum == 0) ? 1 : fpsNum;
            sprite.left += sprite.velocityX / this.fpsNum;
            this.lastMove = time;
        }
    },
    //其他物体的横向运动，都是根据sprite.positionmile与progressObj.createSpriteMileNum的相对位置计算出来的
    SpriteLeftToRight: function() {
        this.behaviorName = 'moveLeftToRight';
        this.lastMove = 0;
        this.fpsNum = 60;
        this.execute = function(sprite, context, time, fpsNum) {
            let translateLeft = sprite.translateLeft || 0;
           // console.log(translateLeft);
            //  console.log('translateLeft'+progressObj.createSpriteMileNum);
          sprite.left = sprite.positionmile - progressObj.createSpriteMileNum - translateLeft;
        }
    },

    //小人跑动动画
    runInPlace: function(setting) {
        let defaultSetting = {
            lastAdvance: 0,
            PAGEFLIP_INTERVAL: 30,
            behaviorName: 'runInPlace',
        };
        lib.jQueryExtend(defaultSetting, setting);
        this.lastAdvance = defaultSetting.lastAdvance;
        this.PAGEFLIP_INTERVAL = defaultSetting.PAGEFLIP_INTERVAL;
        this.behaviorName = defaultSetting.behaviorName;
        this.execute = function(sprite, context, time) {
            if (time - this.lastAdvance > this.PAGEFLIP_INTERVAL) {
                sprite.painter.advance(sprite);
                this.lastAdvance = time;
            }
        }
    },
    //坏花
    upInPlace: function(setting) {
        let defaultSetting = {
            lastAdvance: 0,
            PAGEFLIP_INTERVAL: 30,
            behaviorName: 'runInPlace',
        };
        lib.jQueryExtend(defaultSetting, setting);
        this.lastAdvance = defaultSetting.lastAdvance;
        this.PAGEFLIP_INTERVAL = defaultSetting.PAGEFLIP_INTERVAL;
        this.behaviorName = defaultSetting.behaviorName;
        this.execute = function(sprite, context, time) {
            if (time - this.lastAdvance > this.PAGEFLIP_INTERVAL) {

                sprite.painter.advance(sprite);
                this.lastAdvance = time;
            }
        }
    },
    //小人跳动
    jump: function(setting) {
        let defaultSetting = {
            lastAdvance: 0,
            isJump: false,
            behaviorName: 'jump',
            jumpOverCallback: function() {},
            status: 0, //0是不跳，1是小跳，2是大跳。
        };
        lib.jQueryExtend(defaultSetting, setting);
        this.lastAdvance = defaultSetting.lastAdvance;
        this.behaviorName = defaultSetting.behaviorName;
        this.fpsNum = 60;
        this.status = defaultSetting.status;
        this.jumpOverCallback = defaultSetting.jumpOverCallback;
        this.execute = function(sprite, context, time, fpsNum) {
            if (this.lastAdvance !== 0) {
                if (sprite.velocityY < sprite.startVelocityY) {
                    //这个地方注意
                    // this.fpsNum = (fpsNum == 0) ? 0 : (fpsNum || this.fpsNum);
                    this.fpsNum=(fpsNum == 0) ? 1 : fpsNum ;
                    sprite.velocityY = sprite.velocityY + sprite.GRAVITY_FORCE / this.fpsNum;
                    sprite.top += sprite.velocityY / this.fpsNum;
                    if (sprite.top < sprite.initialTop) {
                        sprite.isJump = true;
                    } else {
                        sprite.top = sprite.initialTop;
                        sprite.isJump = false;
                        this.jumpOverCallback();
                    }
                } else {
                    sprite.isJump = false;
                }
            }
            this.lastAdvance = time;
        }
    },
}
export  {behaviorList};
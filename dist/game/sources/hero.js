"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroWShape = exports.rl = void 0;
const readline = require("readline");
exports.rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
class HeroWShape {
    constructor(lv, hp, atk, name, posX, posY) {
        this.lv = lv;
        this.hp = hp;
        this.atk = atk;
        this.name = name;
        this.posX = posX;
        this.posY = posY;
        this.maxHp = this.hp;
    }
    getUpgrade(hp, atk) {
        this.lv += 1;
        this.hp = hp * 2;
        this.atk = atk * 2;
        console.log("=========================================");
        console.log("레벨업 완료!");
        console.log(`현재 레벨 ${this.lv}lv, ${this.hp}hp, ${this.atk}atk`);
        console.log("=========================================");
    }
    attack(target) {
        if (this.hp >= 0) {
            console.log("=========================================");
            console.log(`>> ${this.name}가 ${target.monsterName}을 ${this.atk}만큼 공격했다!`);
            target.hp -= this.atk;
            console.log(`${target.monsterName}가 공격${this.atk}을 받고, 체력${target.hp}가 남았다.`);
        }
    }
}
exports.HeroWShape = HeroWShape;
//# sourceMappingURL=hero.js.map
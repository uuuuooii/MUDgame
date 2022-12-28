"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonsterShape = void 0;
class MonsterShape {
    constructor(lv, hp, atk, name, posX, posY) {
        this.lv = lv;
        this.hp = hp;
        this.atk = atk;
        this.monsterName = name;
        this.posX = posX;
        this.posY = posY;
        this.maxHp = this.hp;
    }
    attack(target) {
        if (this.hp >= 0) {
            console.log(`>> ${this.monsterName}가 ${target.name}에게 ${this.atk}을 공격했다!`);
            target.hp -= this.atk;
            console.log(`${target.name}가 공격${this.atk}을 받고, 체력${target.hp}가 남았다.`);
            console.log("=========================================");
        }
    }
    getPos() {
        console.log(`몬스터 위치 X:${this.posX}, Y:${this.posY}`);
        return [this.posX, this.posY];
    }
    monsterAbility() {
        console.log(`${this.monsterName}의 능력은${this.lv}lv, ${this.hp}hp, ${this.atk}atk 입니다.`);
        return [this.lv, this.hp, this.atk];
    }
}
exports.MonsterShape = MonsterShape;
//# sourceMappingURL=monster.js.map
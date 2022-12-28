"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const monster_1 = require("./monster");
const hero_1 = require("./hero");
const item_1 = require("./item");
class Game {
    constructor(lv, hp, atk, name, posX, posY) {
        this.characterChoice = () => {
            console.log(`캐릭터 선택 `);
            console.log("=========================================");
            console.log(`1. 전사`);
            console.log(`2. 없음`);
            hero_1.rl.question(">", (line) => {
                if (line === "1") {
                    console.log("=========================================");
                    console.log(`전사로 선택하셨습니다.`);
                    console.log(`캐릭터의 이름은 [ ${this.heroWShape.name}, 능력은 ${this.heroWShape.lv}lv, ${this.heroWShape.hp}hp, ${this.heroWShape.atk}atk ] 입니다.`);
                    console.log(`현재 위치는 X:${this.heroWShape.posX}, Y:${this.heroWShape.posY}입니다.`);
                    this.createMonster();
                    this.createRecoveryItem();
                    this.createAttackItem();
                    return this.mapInfoMessage();
                }
                else if (line === "2") {
                    console.log(`없음!`);
                }
            });
        };
        this.monsterArr = [];
        this.monsterPosArr = [];
        this.recoveryItemArr = [];
        this.recoveryItemPosArr = [];
        this.attackItemArr = [];
        this.attackItemPosArr = [];
        this.posX = posX;
        this.posY = posY;
        this.heroWShape = new hero_1.HeroWShape(lv, hp, atk, name, posX, posY);
        this.heroHP = this.heroWShape.hp;
        this.heroATK = 10;
    }
    createMonster() {
        let monsterIndex = 1;
        while (monsterIndex < 11) {
            const monsterX = Math.floor(Math.random() * 22);
            const monsterY = Math.floor(Math.random() * 22);
            const dupCheck = this.monsterPosArr.find((element) => JSON.stringify(element) === JSON.stringify([monsterX, monsterY]));
            ("[x, y]");
            if (dupCheck === undefined) {
                this.monsterArr.push(new monster_1.MonsterShape(monsterIndex, monsterIndex * 50, monsterIndex * 5, "몬스터", monsterX, monsterY));
                this.monsterPosArr.push([monsterX, monsterY]);
                monsterIndex++;
            }
        }
    }
    meetMonsterCheck(x, y) {
        let faceToFace = false;
        for (let index = 0; index < 10; index++) {
            const monster = this.monsterArr[index];
            const [monPosX, monPosY] = monster.getPos();
            if (x === monPosX && y === monPosY) {
                console.log("=========================================");
                console.log("몬스터를 만났다!");
                monster.monsterAbility();
                return { index };
            }
            else
                continue;
        }
        return faceToFace;
    }
    createRecoveryItem() {
        const recoveryPosX = Math.floor(Math.random() * 21);
        const recoveryPosY = Math.floor(Math.random() * 21);
        this.recoveryItemArr.push(new item_1.ItemShop("회복", this.heroHP / 2, recoveryPosX, recoveryPosY));
        this.recoveryItemPosArr.push([recoveryPosX, recoveryPosY]);
    }
    createAttackItem() {
        let attackItemIndex = 0;
        const recoveryItem = this.recoveryItemArr[0];
        while (attackItemIndex < 10) {
            const attackPosX = Math.floor(Math.random() * 22);
            const attackPosY = Math.floor(Math.random() * 22);
            const dupCheck = this.attackItemPosArr.find((element) => JSON.stringify(element) === JSON.stringify([attackPosX, attackPosY]));
            if (dupCheck === undefined) {
                this.attackItemArr.push(new item_1.ItemShop("공격", attackItemIndex + 1, attackPosX, attackPosY));
                this.attackItemPosArr.push([attackPosX, attackPosY]);
                attackItemIndex++;
            }
        }
    }
    findAttackItem(x, y) {
        let faceToFace = false;
        for (let index = 0; index < 10; index++) {
            const item = this.attackItemArr[index];
            const [itemAttackPosX, itemAttackPosY] = item.getPosAttackItem();
            if (x === itemAttackPosX && y === itemAttackPosY) {
                console.log("=========================================");
                console.log("공격 아이템을 찾았다!");
                console.log(`공격력이 +${item.ability}atk 추가 됩니다.`);
                this.heroWShape.atk += item.ability;
                console.log(`캐릭터의 능력:${this.heroWShape.lv}lv, ${this.heroWShape.hp}hp, ${this.heroWShape.atk}atk ] 입니다.`);
                console.log("=========================================");
                return { index };
            }
            else
                continue;
        }
        return faceToFace;
    }
    findRecoveryItem(x, y) {
        let faceToFace = false;
        for (let index = 0; index < 1; index++) {
            const item = this.recoveryItemArr[index];
            const [itemRecoveryPosX, itemRecoveryPosY] = item.getPosRecoveryItem();
            if (x === itemRecoveryPosX && y === itemRecoveryPosY) {
                console.log("=========================================");
                console.log("회복 아이템을 찾았다!");
                console.log(`회복력이 ${item.ability}% 회복 되었습니다.`);
                this.heroWShape.hp = this.heroWShape.hp + this.heroWShape.lv * 50;
                if (this.heroWShape.hp >= this.heroWShape.maxHp) {
                    this.heroWShape.hp = this.heroWShape.maxHp * this.heroWShape.lv;
                }
                console.log(`캐릭터의 능력:${this.heroWShape.lv}lv, ${this.heroWShape.hp}hp, ${this.heroWShape.atk}atk ] 입니다.`);
            }
        }
        return faceToFace;
    }
    movePosition() {
        console.log(`이동 위치 x: ${this.posX}, y: ${this.posY}`);
        console.log("=========================================");
        const meetMonster = this.meetMonsterCheck(this.posX, this.posY);
        const attackFindItem = this.findAttackItem(this.posX, this.posY);
        const recoveryFindItem = this.findRecoveryItem(this.posX, this.posY);
        if (meetMonster) {
            return this.choiceAction(meetMonster.index);
        }
        if (attackFindItem) {
            return this.mapInfoMessage();
        }
        if (recoveryFindItem) {
        }
        return this.mapInfoMessage();
    }
    mapInfoMessage() {
        if (this.heroWShape.hp <= 0) {
            setTimeout(() => {
                console.log("아이템을 찾아서 체력을 회복하세요");
                console.log("=========================================");
                console.log(`어디로 이동하시겠어어요?`);
                console.log("[1:동 2:서 3:남 4:북] 중에 선택하세요.");
            }, 1000);
        }
        else if (this.posX === 10 && this.posY === 10) {
            console.log(`현재는 광장에 있습니다.`);
            console.log("=========================================");
            console.log(`어디로 이동하시겠어어요?`);
            console.log("[1:동 2:서 3:남 4:북] 중에 선택하세요.");
        }
        else {
            console.log("=========================================");
            console.log(`어디로 이동하시겠어어요?`);
            console.log("[1:동 2:서 3:남 4:북] 중에 선택하세요.");
        }
        hero_1.rl.question(">", (question) => {
            if (question === "1") {
                if (this.checkMapEnd("east", this.posX, this.posY)) {
                    console.log("=========================================");
                    console.log("막다른 길입니다.");
                    this.mapInfoMessage();
                }
                else {
                    this.posX++;
                }
                console.log(`동쪽을 선택하셨습니다`);
                return this.movePosition();
            }
            else if (question === "2") {
                if (this.checkMapEnd("west", this.posX, this.posY)) {
                    console.log("=========================================");
                    console.log("막다른 길입니다.");
                    this.mapInfoMessage();
                }
                else {
                    this.posX--;
                }
                console.log(`서쪽을 선택하셨습니다`);
                return this.movePosition();
            }
            else if (question === "3") {
                if (this.checkMapEnd("south", this.posX, this.posY)) {
                    console.log("=========================================");
                    console.log("막다른 길입니다.");
                    this.mapInfoMessage();
                }
                else {
                    this.posY++;
                }
                console.log(`남쪽을 선택하셨습니다`);
                return this.movePosition();
            }
            else if (question === "4") {
                if (this.checkMapEnd("north", this.posX, this.posY)) {
                    this.mapInfoMessage();
                }
                else {
                    this.posY--;
                }
                console.log(`북쪽을 선택하셨습니다`);
                return this.movePosition();
            }
            else {
                console.log("입력에 실패하셨습니다. 다시 입력해주세요");
                return this.movePosition();
            }
        });
    }
    checkMapEnd(direction, x, y) {
        switch (direction) {
            case "east": {
                if (x === 21)
                    return true;
                else
                    false;
                break;
            }
            case "west": {
                if (x === 0)
                    return true;
                else
                    false;
                break;
            }
            case "south": {
                if (y === 21)
                    return true;
                else
                    false;
                break;
            }
            case "north": {
                if (y === 0)
                    return true;
                else
                    false;
                break;
            }
            default: {
                break;
            }
        }
    }
    choiceAction(index) {
        console.log("공격하시겠습니까? 1.공격. 2.귀환.");
        console.log("=========================================");
        const monster = this.monsterArr[index];
        hero_1.rl.question(">", (question) => {
            if (question === "1") {
                console.log("공격!");
                this.heroWShape.attack(monster);
                monster.attack(this.heroWShape);
                this.repeatChoiceAction(index);
            }
            else if (question === "2") {
                console.log("광장으로 귀한 한다.");
                this.mapInfoMessage();
            }
            else {
                console.log("입력에 실패하셨습니다. 다시 입력해주세요");
                return this.movePosition();
            }
        });
    }
    repeatChoiceAction(index) {
        const monster = this.monsterArr[index];
        if (this.heroWShape.hp > 0 && monster.hp > 0) {
            console.log("계속 공격하시겠습니까? ");
            console.log("1. 공격.  2. 도망간다. ");
            hero_1.rl.question(">", (question) => {
                if (question === "1") {
                    if (this.actionCheck("1", this.heroWShape.hp, monster.hp)) {
                        this.heroWShape.attack(monster);
                        monster.attack(this.heroWShape);
                        this.repeatChoiceAction(index);
                    }
                }
                else if (question === "2") {
                    if (this.actionCheck("2", this.heroWShape.hp, monster.hp)) {
                        if (Math.random() < 0.5) {
                            console.log("도망에 성공했다. ");
                            console.log("랜덤으로 이동된다.");
                            this.randomEscape();
                            this.mapInfoMessage();
                        }
                        else {
                            console.log("도망치는 데 실패했다...");
                            this.heroWShape.attack(monster);
                            monster.attack(this.heroWShape);
                            this.repeatChoiceAction(index);
                        }
                    }
                }
                else {
                    console.log("입력에 실패하셨습니다. 다시 입력해주세요");
                    return this.movePosition();
                }
            });
        }
        else if (this.heroWShape.hp <= 0) {
            console.log("전사가 죽었습니다. 광장으로 이동합니다.");
            this.mapInfoMessage();
        }
        else if (monster.hp <= 0) {
            console.log("몬스터가 죽었습니다.");
            this.heroWShape.getUpgrade(this.heroHP, this.heroATK);
            this.heroHP = 200;
            this.heroATK = 20;
            console.log("몬스터가 30초 뒤에 리젠됩니다.");
            console.log("기다리겠습니까?");
            console.log("1.기다린다 . 2.이동한다.");
            hero_1.rl.question(">", (question) => {
                if (question === "1") {
                    console.log("몬스터 리젠중...");
                    setTimeout(() => {
                        monster.hp = monster.maxHp;
                        console.log("몬스터가 리젠되었습니다.");
                        this.choiceAction(index);
                    }, 30000);
                }
                else if (question === "2") {
                    this.mapInfoMessage();
                }
                else {
                    console.log("입력에 실패하셨습니다. 다시 입력해주세요");
                    return this.movePosition();
                }
            });
        }
        else {
            console.log("입력에 실패하셨습니다. 다시 입력해주세요");
            return this.movePosition();
        }
    }
    randomEscape() {
        const randomX = Math.floor(Math.random() * 21);
        const randomY = Math.floor(Math.random() * 21);
        console.log(randomX, randomY);
        this.posX = randomX;
        this.posY = randomY;
        console.log("=========================================");
        console.log("랜덤으로 이동 했습니다.");
        console.log(`현재 위치는 X:${this.posX}, Y:${this.posY}입니다.`);
        return [randomX, randomY];
    }
    actionCheck(choice, heroHp, monsterHp) {
        switch (choice) {
            case "1": {
                if (heroHp > 0)
                    return true;
                else
                    false;
                break;
            }
            case "2": {
                if (monsterHp > 0)
                    return true;
                else
                    false;
                break;
            }
            default:
                break;
        }
    }
}
exports.Game = Game;
//# sourceMappingURL=game.js.map
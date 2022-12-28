import { Game } from "./game";
const readline = require("readline");

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export class HeroWShape {
  lv: number;
  hp: number;
  atk: number;
  name: string;
  posX: number;
  posY: number;
  maxHp: number;

  constructor(
    lv: number,
    hp: number,
    atk: number,
    name: string,
    posX: number,
    posY: number
  ) {
    this.lv = lv;
    this.hp = hp; //체력
    this.atk = atk; //공격력
    this.name = name;
    this.posX = posX;
    this.posY = posY;
    this.maxHp = this.hp;
  }

  //[4]레벨업
  getUpgrade(hp: number, atk: number) {
    this.lv += 1;
    this.hp = hp * 2;
    this.atk = atk * 2;
    console.log("=========================================");
    console.log("레벨업 완료!");
    console.log(`현재 레벨 ${this.lv}lv, ${this.hp}hp, ${this.atk}atk`);
    console.log("=========================================");
  }

  //[4]전사 공격
  attack(target) {
    if (this.hp >= 0) {
      console.log("=========================================");
      console.log(
        `>> ${this.name}가 ${target.monsterName}을 ${this.atk}만큼 공격했다!`
      );
      target.hp -= this.atk;

      //hp가 마이너스로 안 나오게끔
      if (target.hp < 0) {
        target.hp = 0;
        console.log(
          `${target.monsterName}가 공격${this.atk}을 받고, 체력${target.hp}가 남았다.`
        );
      } else {
        console.log(
          `${target.monsterName}가 공격${this.atk}을 받고, 체력${target.hp}가 남았다.`
        );
      }
    }
  }
}

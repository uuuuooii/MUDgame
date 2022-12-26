export class MonsterShape {
  private lv: number;
  hp: number;
  private atk: number;
  monsterName: string;
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
    // 레벨 1 HP : 30, ATK :5
    this.lv = lv;
    this.hp = hp; //체력
    this.atk = atk; //공격력
    this.monsterName = name;
    this.posX = posX;
    this.posY = posY;
    this.maxHp = this.hp;
  }

  //[4]몬스터 공격
  attack(target) {
    if (this.hp >= 0) {
      console.log(
        `>> ${this.monsterName}가 ${target.name}에게 ${this.atk}을 공격했다!`
      );
      target.hp -= this.atk;

      console.log(
        `${target.name}가 공격${this.atk}을 받고, 체력${target.hp}가 남았다.`
      );
      console.log("=========================================");
    }
  }

  //몬스터 위치
  getPos() {
    console.log(`몬스터 위치 X:${this.posX}, Y:${this.posY}`);
    return [this.posX, this.posY];
  }

  //몬스터 능력
  monsterAbility() {
    console.log(
      `${this.monsterName}의 능력은${this.lv}lv, ${this.hp}hp, ${this.atk}atk 입니다.`
    );
    return [this.lv, this.hp, this.atk];
  }
}

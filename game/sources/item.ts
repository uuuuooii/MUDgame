export class ItemShop {
  type: string;
  ability: number;
  posX: number;
  posY: number;

  constructor(type: string, ability: number, posX: number, posY: number) {
    this.type = type;
    this.ability = ability;
    this.posX = posX;
    this.posY = posY;
  }

  getPosAttackItem() {
    console.log(`공격 아이템 위치 X:${this.posX}, Y:${this.posY}`);
    return [this.posX, this.posY];
  }
  getPosRecoveryItem() {
    console.log(`회복 아이템 위치 X:${this.posX}, Y:${this.posY}`);
    return [this.posX, this.posY];
  }

  //50% 회복
  halfRecovery() {
    if (this.type === "회복") {
      this.ability + Math.floor((this.ability * 50) / 100);
      console.log(this.ability + Math.floor((this.ability * 50) / 100));
    } else return;
  }
}

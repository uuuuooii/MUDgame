export class ItemShop {
  ability: number;
  private posX: number;
  private posY: number;

  constructor(type: string, ability: number, posX: number, posY: number) {
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
}

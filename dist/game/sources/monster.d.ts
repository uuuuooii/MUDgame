export declare class MonsterShape {
    private lv;
    hp: number;
    private atk;
    monsterName: string;
    posX: number;
    posY: number;
    maxHp: number;
    constructor(lv: number, hp: number, atk: number, name: string, posX: number, posY: number);
    attack(target: any): void;
    getPos(): number[];
    monsterAbility(): number[];
}

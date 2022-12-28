export declare const rl: any;
export declare class HeroWShape {
    lv: number;
    hp: number;
    atk: number;
    name: string;
    upgrade: number;
    posX: number;
    posY: number;
    maxHp: number;
    constructor(lv: any, hp: any, atk: any, name: any, posX: any, posY: any);
    getUpgrade(hp: number, atk: number): void;
    attack(target: any): void;
}

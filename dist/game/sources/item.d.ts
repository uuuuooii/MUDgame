export declare class ItemShop {
    type: string;
    ability: number;
    posX: number;
    posY: number;
    constructor(type: string, ability: number, posX: number, posY: number);
    getPosAttackItem(): number[];
    getPosRecoveryItem(): number[];
    halfRecovery(): void;
}

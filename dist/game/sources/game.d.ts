export declare class Game {
    private posX;
    private posY;
    private monsterArr;
    private monsterPosArr;
    private recoveryItemArr;
    private recoveryItemPosArr;
    private attackItemArr;
    private attackItemPosArr;
    private heroWShape;
    private heroHP;
    private heroATK;
    constructor(lv: number, hp: number, atk: number, name: string, posX: number, posY: number);
    characterChoice: () => void;
    createMonster(): void;
    meetMonsterCheck(x: number, y: number): false | {
        index: number;
    };
    createRecoveryItem(): void;
    createAttackItem(): void;
    findAttackItem(x: number, y: number): false | {
        index: number;
    };
    findRecoveryItem(x: number, y: number): boolean;
    movePosition(): void;
    mapInfoMessage(): void;
    checkMapEnd(direction: string, x: number, y: number): boolean;
    choiceAction(index: number): void;
    repeatChoiceAction(index: number): void;
    randomEscape(): number[];
    actionCheck(choice: string, heroHp: any, monsterHp: any): boolean;
}

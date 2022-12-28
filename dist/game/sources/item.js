"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemShop = void 0;
class ItemShop {
    constructor(type, ability, posX, posY) {
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
    halfRecovery() {
        if (this.type === "회복") {
            this.ability + Math.floor((this.ability * 50) / 100);
            console.log(this.ability + Math.floor((this.ability * 50) / 100));
        }
        else
            return;
    }
}
exports.ItemShop = ItemShop;
//# sourceMappingURL=item.js.map
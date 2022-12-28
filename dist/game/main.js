"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = require("./sources/game");
const randomX = Math.floor(Math.random() * 21);
const randomY = Math.floor(Math.random() * 21);
const map = new game_1.Game(1, 100, 10, "전사", randomX, randomY);
map.characterChoice();
//# sourceMappingURL=main.js.map
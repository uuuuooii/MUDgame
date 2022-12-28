import { Game } from "./sources/game";
import { HeroWShape } from "./sources/hero";

//랜덤 시작
const randomX: number = Math.floor(Math.random() * 21);
const randomY: number = Math.floor(Math.random() * 21);

//생성자 주입
// const herowShape = new HeroWShape(1, 100, 10, "전사", randomX, randomY);
// const map = new Game(herowShape, randomX, randomY);

//LV, HP, ATK, name
const map = new Game(1, 100, 10, "전사", randomX, randomY);

//[0]게임 시작
map.characterChoice();

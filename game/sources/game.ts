import { MonsterShape } from "./monster";
import { HeroWShape, rl } from "./hero";
import { ItemShop } from "./item";

export class Game {
  private posX: number;
  private posY: number;
  private monsterArr: MonsterShape[];
  private monsterPosArr: [number, number][];
  private recoveryItemArr: ItemShop[];
  private recoveryItemPosArr: [number, number][];
  private attackItemArr: ItemShop[];
  private attackItemPosArr: [number, number][];
  private heroWShape: HeroWShape;
  private heroHP: number;
  private heroATK: number;

  constructor(
    lv: number,
    hp: number,
    atk: number,
    name: string,
    posX: number,
    posY: number
    //생성자 주입
    // private heroWShape: HeroWShape
  ) {
    //랜덤 시작

    this.monsterArr = [];
    this.monsterPosArr = [];
    this.recoveryItemArr = [];
    this.recoveryItemPosArr = [];
    this.attackItemArr = [];
    this.attackItemPosArr = [];
    this.posX = posX;
    this.posY = posY;
    this.heroWShape = new HeroWShape(lv, hp, atk, name, posX, posY);
    this.heroHP = this.heroWShape.hp;
    this.heroATK = 10;
  }

  //[1]캐릭터 선택
  characterChoice = () => {
    console.log(`캐릭터 선택 `);
    console.log("=========================================");
    console.log(`1. 전사`);
    console.log(`2. 없음`);

    rl.question(">", (line) => {
      if (line === "1") {
        console.log("=========================================");
        console.log(`전사로 선택하셨습니다.`);

        console.log(
          `캐릭터의 이름은 [ ${this.heroWShape.name}, 능력은 ${this.heroWShape.lv}lv, ${this.heroWShape.hp}hp, ${this.heroWShape.atk}atk ] 입니다.`
        );
        console.log(
          `현재 위치는 X:${this.heroWShape.posX}, Y:${this.heroWShape.posY}입니다.`
        );
        this.createMonster();
        this.createRecoveryItem();
        this.createAttackItem();
        return this.mapInfoMessage();
      } else if (line === "2") {
        console.log(`다시 선택해주세요!`);
        this.characterChoice();
      }
    });
  };

  //[2]몬스터 생성
  createMonster() {
    let monsterIndex: number = 1;

    //몬스터,아이템 랜덤으로 생성
    while (monsterIndex < 11) {
      const monsterX: number = Math.floor(Math.random() * 22); // 0 ~ 21
      const monsterY: number = Math.floor(Math.random() * 22); // 0 ~ 21

      const dupCheck = this.monsterPosArr.find(
        (element) =>
          JSON.stringify(element) === JSON.stringify([monsterX, monsterY])
      );
      ("[x, y]");

      //몬스터 생성
      if (dupCheck === undefined) {
        //몬스터 값 증가
        this.monsterArr.push(
          new MonsterShape(
            monsterIndex,
            monsterIndex * 50,
            monsterIndex * 5,
            "몬스터",
            monsterX,
            monsterY
          )
        );

        this.monsterPosArr.push([monsterX, monsterY]);
        monsterIndex++;

        // 몬스터 능력 확인
        // console.log(
        //   new MonsterShape(index, index * 100, index * 10, "몬스터", x, y)
        // );
      }
    }
  }

  // 몬스터 만났는지 확인하는 함수
  meetMonsterCheck(x: number, y: number) {
    let faceToFace: boolean = false;

    for (let index = 0; index < 10; index++) {
      const monster = this.monsterArr[index];
      const [monPosX, monPosY]: number[] = monster.getPos();

      if (x === monPosX && y === monPosY) {
        console.log("=========================================");
        console.log("몬스터를 만났다!");
        monster.monsterAbility();
        //파라미터 리턴
        return { index };
      } else continue;
    }
    return faceToFace;
  }

  //[2] 회복 아이템 생성
  createRecoveryItem() {
    const recoveryPosX: number = Math.floor(Math.random() * 21);
    const recoveryPosY: number = Math.floor(Math.random() * 21);

    this.recoveryItemArr.push(
      new ItemShop("회복", this.heroHP / 2, recoveryPosX, recoveryPosY)
    );
    this.recoveryItemPosArr.push([recoveryPosX, recoveryPosY]);
  }

  //[2] 공격 아이템 생성
  createAttackItem() {
    let attackItemIndex: number = 0;
    const recoveryItem = this.recoveryItemArr[0];

    while (attackItemIndex < 10) {
      const attackPosX: number = Math.floor(Math.random() * 22);
      const attackPosY: number = Math.floor(Math.random() * 22);

      const dupCheck = this.attackItemPosArr.find(
        (element) =>
          JSON.stringify(element) === JSON.stringify([attackPosX, attackPosY])
      );

      if (dupCheck === undefined) {
        //공격력 증가
        this.attackItemArr.push(
          new ItemShop("공격", attackItemIndex + 1, attackPosX, attackPosY)
        );
        this.attackItemPosArr.push([attackPosX, attackPosY]);

        attackItemIndex++;
      }
    }
  }

  //공격 아이템 확인 + 추가
  findAttackItem(x: number, y: number) {
    let faceToFace: boolean = false;

    for (let index = 0; index < 10; index++) {
      const item = this.attackItemArr[index];
      const [itemAttackPosX, itemAttackPosY]: number[] =
        item.getPosAttackItem();

      if (x === itemAttackPosX && y === itemAttackPosY) {
        console.log("=========================================");
        console.log("공격 아이템을 찾았다!");
        console.log(`공격력이 +${item.ability}atk 추가 됩니다.`);
        this.heroWShape.atk += item.ability;
        console.log(
          `캐릭터의 능력:${this.heroWShape.lv}lv, ${this.heroWShape.hp}hp, ${this.heroWShape.atk}atk ] 입니다.`
        );
        console.log("=========================================");
        return { index };
      } else continue;
    }
    return faceToFace;
  }

  //회복 아이템 확인
  findRecoveryItem(x: number, y: number) {
    let faceToFace: boolean = false;

    // 추후에 회복아이템 개수 증가될 시 MAX 값 수정 필요
    for (let index = 0; index < 1; index++) {
      const item = this.recoveryItemArr[index];
      const [itemRecoveryPosX, itemRecoveryPosY]: number[] =
        item.getPosRecoveryItem();

      if (x === itemRecoveryPosX && y === itemRecoveryPosY) {
        console.log("=========================================");
        console.log("회복 아이템을 찾았다!");
        console.log(`회복력이 ${item.ability}% 회복 되었습니다.`);

        //50%회복
        this.heroWShape.hp = this.heroWShape.hp + this.heroWShape.lv * 50;
        //(단 최대 체력을 초과할 수 없음)
        if (this.heroWShape.hp >= this.heroWShape.maxHp) {
          this.heroWShape.hp = this.heroWShape.maxHp * this.heroWShape.lv;
        }
        console.log(
          `캐릭터의 능력:${this.heroWShape.lv}lv, ${this.heroWShape.hp}hp, ${this.heroWShape.atk}atk ] 입니다.`
        );
      }
    }
    return faceToFace;
  }

  //[2]동서남북 이동
  mapInfoMessage() {
    if (this.heroWShape.hp <= 0) {
      console.log("아이템을 찾아서 체력을 회복하세요");
      console.log("=========================================");
      console.log(`어디로 이동하시겠어어요?`);
      console.log("[1:동 2:서 3:남 4:북] 중에 선택하세요.");
    } else if (this.posX === 10 && this.posY === 10) {
      console.log(`현재는 광장에 있습니다.`);
      console.log("=========================================");
      console.log(`어디로 이동하시겠어어요?`);
      console.log("[1:동 2:서 3:남 4:북] 중에 선택하세요.");
    } else {
      console.log("=========================================");
      console.log(`어디로 이동하시겠어어요?`);
      console.log("[1:동 2:서 3:남 4:북] 중에 선택하세요.");
    }

    rl.question(">", (question) => {
      if (question === "1") {
        if (this.checkMapEnd("east", this.posX, this.posY)) {
          console.log("=========================================");
          console.log("막다른 길입니다.");
          this.mapInfoMessage();
        } else {
          this.posX++;
        }
        console.log(`동쪽을 선택하셨습니다`);
        return this.movePosition();
      } else if (question === "2") {
        if (this.checkMapEnd("west", this.posX, this.posY)) {
          console.log("=========================================");
          console.log("막다른 길입니다.");
          this.mapInfoMessage();
        } else {
          this.posX--;
        }
        console.log(`서쪽을 선택하셨습니다`);
        return this.movePosition();
      } else if (question === "3") {
        if (this.checkMapEnd("south", this.posX, this.posY)) {
          console.log("=========================================");
          console.log("막다른 길입니다.");
          this.mapInfoMessage();
        } else {
          this.posY++;
        }
        console.log(`남쪽을 선택하셨습니다`);
        return this.movePosition();
      } else if (question === "4") {
        if (this.checkMapEnd("north", this.posX, this.posY)) {
          this.mapInfoMessage();
        } else {
          this.posY--;
        }
        console.log(`북쪽을 선택하셨습니다`);
        return this.movePosition();
      } else {
        console.log("입력에 실패하셨습니다. 다시 입력해주세요");
        return this.movePosition();
      }
    });
  }
  //[2]동서남북 이동 예외처리
  checkMapEnd(direction: string, x: number, y: number) {
    switch (direction) {
      case "east": {
        if (x === 21) return true;
        else false;
        break;
      }
      case "west": {
        if (x === 0) return true;
        else false;
        break;
      }
      case "south": {
        if (y === 21) return true;
        else false;
        break;
      }
      case "north": {
        if (y === 0) return true;
        else false;
        break;
      }
      default: {
        break;
      }
    }
  }

  //[3] 나의 위치 & 몬스터 만나는지 체크 & 아이템 찾았는지 체크
  movePosition() {
    console.log(`이동 위치 x: ${this.posX}, y: ${this.posY}`);

    console.log("=========================================");

    //몬스터 만나면 choiceAction넘어감
    const meetMonster = this.meetMonsterCheck(this.posX, this.posY);
    //공격 아이템 찾으면 mapInfoMessage넘어감
    const attackFindItem = this.findAttackItem(this.posX, this.posY);
    //회복 아이템 찾으면 mapInfoMessage넘어감
    const recoveryFindItem = this.findRecoveryItem(this.posX, this.posY);
    if (meetMonster) {
      return this.choiceAction(meetMonster.index);
    }
    if (attackFindItem) {
      return this.mapInfoMessage();
    }
    if (recoveryFindItem) {
    }
    return this.mapInfoMessage();
  }

  //[4]싸울지 귀한할지 결정
  choiceAction(index: number) {
    console.log("공격하시겠습니까? 1.공격. 2.귀환.");
    console.log("=========================================");
    const monster = this.monsterArr[index];

    rl.question(">", (question) => {
      if (question === "1") {
        console.log("공격!");

        //전사 공격
        this.heroWShape.attack(monster);
        //몬스터 공격
        monster.attack(this.heroWShape);
        //싸울지 도망갈지 선택
        this.repeatChoiceAction(index);
      } else if (question === "2") {
        console.log("광장으로 귀한 한다.");
        this.mapInfoMessage();
      } else {
        console.log("입력에 실패하셨습니다. 다시 입력해주세요");
        return this.movePosition();
      }
    });
  }

  //[4]계속 싸울지 도망갈지 결정
  repeatChoiceAction(index: number) {
    const monster = this.monsterArr[index];

    if (this.heroWShape.hp > 0 && monster.hp > 0) {
      console.log("계속 공격하시겠습니까? ");
      console.log("1. 공격.  2. 도망간다. ");
      rl.question(">", (question) => {
        if (question === "1") {
          if (this.actionCheck("1", this.heroWShape.hp, monster.hp)) {
            this.heroWShape.attack(monster);
            monster.attack(this.heroWShape);
            this.repeatChoiceAction(index);
          }
        } else if (question === "2") {
          if (this.actionCheck("2", this.heroWShape.hp, monster.hp)) {
            //전투시 도망 50% 확률
            if (Math.random() < 0.5) {
              console.log("도망에 성공했다. ");
              console.log("랜덤으로 이동된다.");
              this.randomEscape();
              this.mapInfoMessage();
            } else {
              console.log("도망치는 데 실패했다...");
              this.heroWShape.attack(monster);
              monster.attack(this.heroWShape);
              this.repeatChoiceAction(index);
            }
          }
        } else {
          console.log("입력에 실패하셨습니다. 다시 입력해주세요");
          return this.movePosition();
        }
      });
    } else if (this.heroWShape.hp <= 0) {
      console.log("전사가 죽었습니다. 광장으로 이동합니다.");
      this.mapInfoMessage();
      this.posX = 10;
      this.posY = 10;
    } else if (monster.hp <= 0) {
      console.log("몬스터가 죽었습니다.");
      this.heroWShape.getUpgrade(this.heroHP, this.heroATK);
      this.heroHP = 200;
      this.heroATK = 20;
      console.log("몬스터가 30초 뒤에 리젠됩니다.");
      console.log("기다리겠습니까?");
      console.log("1.기다린다 . 2.이동한다.");
      rl.question(">", (question) => {
        if (question === "1") {
          //몬스터 hp초기화
          console.log("몬스터 리젠중...");
          setTimeout(() => {
            monster.hp = monster.maxHp;
            console.log("몬스터가 리젠되었습니다.");
            this.choiceAction(index);
          }, 30000);
        } else if (question === "2") {
          this.mapInfoMessage();
        } else {
          console.log("입력에 실패하셨습니다. 다시 입력해주세요");
          return this.movePosition();
        }
      });
    } else {
      console.log("입력에 실패하셨습니다. 다시 입력해주세요");
      return this.movePosition();
    }
  }

  // 랜덤 도망
  randomEscape() {
    const randomX: number = Math.floor(Math.random() * 21);
    const randomY: number = Math.floor(Math.random() * 21);

    this.posX = randomX;
    this.posY = randomY;

    console.log("=========================================");
    console.log("랜덤으로 이동 했습니다.");
    console.log(`현재 위치는 X:${this.posX}, Y:${this.posY}입니다.`);
    return [randomX, randomY];
  }

  //[4]싸울지 도망갈지 결정 예외처리
  actionCheck(choice: string, heroHp, monsterHp) {
    switch (choice) {
      case "1": {
        if (heroHp > 0) return true;
        else false;
        break;
      }
      case "2": {
        if (monsterHp > 0) return true;
        else false;
        break;
      }
      default:
        break;
    }
  }
}

// 코드 양이 생각보다 방대해서 셀프체크와 리팩토링 위주로 진행하였습니다.
// 휴식 기능, 종료 기능 추가 (셀프체크)
// 회복 기능, 도망 기능 추가 (셀프체크)
// UX 개선을 위해 번호 입력 시 input 태그를 초기화, focus()를 사용해 인풋칸을 포커싱하게 했습니다.
// UX 개선을 위해 로그 메시지가 8줄까지 기록되도록 수정했습니다.

const $startScreen = document.querySelector("#start-screen");
const $gameMenu = document.querySelector("#game-menu");
const $battleMenu = document.querySelector("#battle-menu");
const $heroStat = document.querySelector("#hero-stat");
const $heroName = document.querySelector("#hero-name");
const $heroLevel = document.querySelector("#hero-level");
const $heroHp = document.querySelector("#hero-hp");
const $heroXp = document.querySelector("#hero-xp");
const $heroAtt = document.querySelector("#hero-att");
const $monsterName = document.querySelector("#monster-name");
const $monsterHp = document.querySelector("#monster-hp");
const $monsterAtt = document.querySelector("#monster-att");
const $message = document.querySelector("#message");

class Game {
  constructor(name) {
    this.monster = null;
    this.hero = null;
    this.monsterList = [
      { name: "슬라임", hp: 25, att: 10, xp: 10 },
      { name: "스켈레톤", hp: 50, att: 15, xp: 20 },
      { name: "마왕", hp: 150, att: 35, xp: 50 },
    ];
    this.start(name);
  }
  start(name) {
    $gameMenu.addEventListener("submit", this.onGameMenuInput);
    $battleMenu.addEventListener("submit", this.onBattleMenuInput);
    this.changeScreen("game");
    this.hero = new Hero(name, this);
    this.updateHeroStat();
    $heroStat.style.display = "block";
    document.querySelector("#menu-input").focus();
  }
  changeScreen(screen) {
    if (screen === "start") {
      $startScreen.style.display = "block";
      $gameMenu.style.display = "none";
      $battleMenu.style.display = "none";
    } else if (screen === "game") {
      $startScreen.style.display = "none";
      $gameMenu.style.display = "block";
      $battleMenu.style.display = "none";
    } else if (screen === "battle") {
      $startScreen.style.display = "none";
      $gameMenu.style.display = "none";
      $battleMenu.style.display = "block";
    }
  }
  onGameMenuInput = (e) => {
    e.preventDefault();
    const input = e.target["menu-input"].value;
    e.target["menu-input"].value = "";
    e.target["menu-input"].focus();
    if (input === "1") {
      this.changeScreen("battle");
      this.createMonster();
    } else if (input === "2") {
      // 휴식 기능 추가 (셀프체크)
      const { hero } = this;
      hero.hp = hero.maxHp;
      this.updateHeroStat();
      this.showMessage(
        `${hero.name}이(가) 휴식을 취해 체력을 모두 회복했습니다.`
      );
    } else if (input === "3") {
      // 종료 기능 추가 (셀프체크)
      this.showMessage("게임을 종료하고 초기 화면으로 돌아갑니다.");
      this.quit();
    }
  };
  onBattleMenuInput = (e) => {
    e.preventDefault();
    const input = e.target["battle-input"].value;
    e.target["battle-input"].value = "";
    e.target["battle-input"].focus();
    const { hero, monster } = this;
    if (input === "1") {
      hero.attack(monster);
      monster.attack(hero);
      if (hero.hp <= 0) {
        this.showMessage(`${hero.lev}레벨에서 전사. 주인공을 새로 생성하세요.`);
        this.quit();
      } else if (monster.hp <= 0) {
        this.showMessage(`몬스터를 잡아 ${monster.xp} 경험치를 얻었다.`);
        hero.getXp(monster.xp);
        this.monster = null;
        this.updateHeroStat();
        this.updateMonsterStat();
        this.changeScreen("game");
        document.querySelector("#menu-input").focus();
      } else {
        this.showMessage(
          `${hero.att}의 피해를 주고, ${monster.att}의 피해를 받았다.`
        );
        this.updateHeroStat();
        this.updateMonsterStat();
      }
    } else if (input === "2") {
      // 회복 기능 추가(셀프체크)
      hero.heal(monster);
      if (hero.hp <= 0) {
        this.showMessage("회복 도중 공격을 받아 전사했습니다.");
        this.quit();
        return;
      }
      this.updateHeroStat();
      this.showMessage(
        `체력을 20 회복했지만, 몬스터에게 ${monster.att}의 데미지를 받았습니다.`
      );
    } else if (input === "3") {
      // 도망 기능 추가(셀프체크)
      this.showMessage(`${monster.name}으로부터 도망쳤습니다.`);
      this.monster = null;
      this.updateHeroStat();
      this.updateMonsterStat();
      this.changeScreen("game");
      document.querySelector("#menu-input").focus();
    }
  };
  updateHeroStat() {
    const { hero } = this;
    if (hero === null) {
      $heroName.textContent = "";
      $heroLevel.textContent = "";
      $heroHp.textContent = "";
      $heroXp.textContent = "";
      $heroAtt.textContent = "";
      return;
    }
    $heroName.textContent = hero.name;
    $heroLevel.textContent = `Level: ${hero.lev}`;
    $heroHp.textContent = `HP: ${hero.hp}/${hero.maxHp}`;
    $heroXp.textContent = `XP: ${hero.xp}/${hero.lev * 15}`;
    $heroAtt.textContent = `ATT: ${hero.att}`;
  }
  createMonster() {
    const randomIndex = Math.floor(Math.random() * this.monsterList.length);
    const randomMonster = this.monsterList[randomIndex];
    this.monster = new Monster(
      randomMonster.name,
      randomMonster.hp,
      randomMonster.att,
      randomMonster.xp
    );
    this.updateMonsterStat();
    this.showMessage(`몬스터와 마주쳤다. ${this.monster.name}인 것 같다!`);
    document.querySelector("#battle-input").focus();
  }
  updateMonsterStat() {
    const { monster } = this;
    if (monster === null) {
      $monsterName.textContent = "";
      $monsterHp.textContent = "";
      $monsterAtt.textContent = "";
      return;
    }
    $monsterName.textContent = monster.name;
    $monsterHp.textContent = `HP: ${monster.hp}/${monster.maxHp}`;
    $monsterAtt.textContent = `ATT: ${monster.att}`;
  }
  showMessage(txt) {
    // 진행 로그 관리(8줄, UX개선)
    const lines = $message.textContent.split("\n");
    lines.push(txt);
    const lastFive = lines.slice(-8);
    $message.textContent = lastFive.join("\n");
  }
  quit() {
    this.hero = null;
    this.monster = null;
    this.updateHeroStat();
    this.updateMonsterStat();
    $gameMenu.removeEventListener("submit", this.onGameMenuInput);
    $battleMenu.removeEventListener("submit", this.onBattleMenuInput);
    $heroStat.style.display = "none";
    this.changeScreen("start");
    game = null;
    document.querySelector("#name-input").focus();
  }
}

class Unit {
  constructor(name, hp, att, xp) {
    this.name = name;
    this.maxHp = hp;
    this.hp = hp;
    this.xp = xp;
    this.att = att;
  }
  attack(target) {
    target.hp -= this.att;
  }
}

class Hero extends Unit {
  constructor(name, game) {
    super(name, 100, 10, 0);
    this.lev = 1;
    this.game = game;
  }
  heal(monster) {
    this.hp += 20;
    if (this.hp > this.maxHp) this.hp = this.maxHp;
    monster.attack(this);
  }
  getXp(xp) {
    this.xp += xp;
    if (this.xp >= this.lev * 15) {
      this.xp -= this.lev * 15;
      this.lev += 1;
      this.maxHp += 5;
      this.att += 5;
      this.hp = this.maxHp;
      this.game.showMessage(`레벨 업! ${this.lev}레벨이 되었습니다.`);
    }
  }
}

class Monster extends Unit {}

let game = null;
$startScreen.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target["name-input"].value;
  game = new Game(name);
});

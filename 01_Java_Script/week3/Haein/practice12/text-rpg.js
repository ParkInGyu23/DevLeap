const $startScreen = document.querySelector("#start-screen"); // 초기 화면
const $gameMenu = document.querySelector("#game-menu"); // 일반 메뉴 화면
const $battleMenu = document.querySelector("#battle-menu"); // 전투 메뉴 화면
const $heroName = document.querySelector("#hero-name"); // 주인공 이름
/* ━━━━━━━━━━━━━━━━━━━━┓
┃     주인공, 몬스터, 일반 메뉴 구현     ┃
┗━━━━━━━━━━━━━━━━━━━━━┛ */

const $heroLevel = document.querySelector("#hero-level"); // 주인공 레벨
const $heroHp = document.querySelector("#hero-hp"); // 주인공 체력
const $heroXp = document.querySelector("#hero-xp"); // 주인공 경험치
const $heroAtt = document.querySelector("#hero-att"); // 주인공 공격력
const $monsterName = document.querySelector("#monster-name"); // 몬스터 이름
const $monsterHp = document.querySelector("#monster-hp"); // 몬스터 체력
const $monsterAtt = document.querySelector("#monster-att"); // 몬스터 공격력
const $message = document.querySelector("#message");
/* ━━━━━━━━━━━━━━━━━━━━━━━┓
┃             클래스로 코드 재구성             ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━┛ */
class Game {
  // 게임 클래스
  constructor(name) {
    // 생성자1
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
    // 게임 시작 메서드
    $gameMenu.addEventListener("submit", this.onGameMenuInput);
    $battleMenu.addEventListener("submit", this.onBattleMenuInput);
    this.changeScreen("game");
    this.hero = new Hero(name);
    this.hero = new Hero(name, this);
    this.updateHeroStat();
  }

  updateHeroStat() {
    // 주인공 정보 표시 메서드
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
    $heroLevel.textContent = `${hero.lev}Lev`;
    $heroHp.textContent = `HP: ${hero.hp} / ${hero.maxHp}`;
    $heroXp.textContent = `XP: ${hero.xp} / ${15 * hero.lev}`;
    $heroAtt.textContent = `ATT: ${hero.att}`;
  }

  changeScreen(screen) {
    // 화면 전환 메서드
    if (screen === "start") {
      // 초기 화면
      $startScreen.style.display = "block"; // 초기 화면 보이기
      $gameMenu.style.display = "none"; // 일반 메뉴 숨기기
      $battleMenu.style.display = "none"; // 전투 메뉴 화면 숨기기
    } else if (screen === "game") {
      // 일반 메뉴
      $startScreen.style.display = "none";
      $gameMenu.style.display = "block"; // 일반 메뉴 화면 보이기
      $battleMenu.style.display = "none";
    } else if (screen === "battle") {
      // 전투 메뉴
      $startScreen.style.display = "none";
      $gameMenu.style.display = "none";
      $battleMenu.style.display = "block"; // 전투 메뉴 화면 보이기
    }
  }
  onGameMenuInput = (event) => {
    // 일반 메뉴 메서드
    event.preventDefault();
    const input = event.target["menu-input"].value;
    if (input === "1") {
      // 모험
      this.changeScreen("battle");
      this.createMonster();
    } else if (input === "2") {
      // 휴식
    } else if (input === "3") {
      // 종료
    }
  };

  createMonster() {
    // 몬스터 생성 메서드
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
  }
  updateMonsterStat() {
    // 몬스터 정보 표시 메서드
    const { monster } = this;
    if (monster === null) {
      $monsterName.textContent = "";
      $monsterHp.textContent = "";
      $monsterAtt.textContent = "";
      return;
    }
    $monsterName.textContent = monster.name;
    $monsterHp.textContent = `HP: ${monster.hp} / ${monster.maxHp}`;
    $monsterAtt.textContent = `ATT: ${monster.att}`;
  }
  showMessage(text) {
    $message.textContent = text;
  }

  onBattleMenuInput = (event) => {
    // 전투 메뉴 메서드
    event.preventDefault();
    const input = event.target["battle-input"].value;
    if (input === "1") {
      // 공격
      const { hero, monster } = this;
      hero.attack(monster);
      monster.attack(hero);
      if (hero.hp <= 0) {
        // 주인공 체력이 0이면 게임 오버
        this.showMessage(
          `${hero.lev}레벨에서 전사. 주인공을 새로 생성하세요. `
        );
        this.quit();
      } else if (monster.hp <= 0) {
        // 몬스터 체력이 0이면 경험치 획득
        this.showMessage(`몬스터를 잡아 ${monster.xp} 경험치를 얻었다. `);
        hero.getXp(monster.xp);
        this.monster = null;
        this.updateHeroStat();
        this.updateMonsterStat();
        this.changeScreen("game");
      } else {
        // 피해 주고받기
        this.showMessage(
          `${hero.att}의 피해를 주고, ${monster.att}의 피해를 받았다.`
        );
        this.updateHeroStat();
        this.updateMonsterStat();
      }
    } else if (input === "2") {
      // 회복
    } else if (input === "3") {
      // 도망
    }
  };

  quit() {
    this.hero = null;
    this.monster = null;
    this.updateHeroStat();
    this.updateMonsterStat();
    $gameMenu.removeEventListener("submit", this.onGameMenuInput);
    $battleMenu.removeEventListener("submit", this.onBattleMenuInput);
    this.changeScreen("start");
    game = null;
  }
}
class Unit {
  // 공통 클래스
  constructor(name, hp, att, xp) {
    // 생성자
    this.name = name;
    this.maxHp = hp;
    this.hp = hp;
    this.xp = xp;
    this.att = att;
  }
  attack(target) {
    // 공격 메서드
    target.hp -= this.att;
  }
}
class Hero extends Unit {
  // 주인공 클래스
  constructor(name, game) {
    // 생성기
    super(name, 100, 10, 0);
    this.lev = 1;
    this.game = game;
  }
  heal(monster) {
    // 회복 메서드
    this.hp += 20;
    this.hp -= monster.att;
  }
  getXp(xp) {
    // 레벨업 메서드
    this.xp += xp;
    if (this.xp >= this.lev * 15) {
      this.xp -= this.lev * 15;
      this.lev += 1;
      this.maxHp += 5;
      this.att += 5;
      this.hp = this.maxHp;
      this.game.showMessage(`레벨 업! ${this.lev} 레벨이 되었습니다.`);
    }
  }
}
class Monster extends Unit {
  // 몬스터 클래스
}
let game = null;

$startScreen.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = event.target["name-input"].value;
  game = new Game(name); // 게임 객체 생성
  $startScreen.style.display = "none"; // 초기 화면 숨기기
  $gameMenu.style.display = "block"; // 일반 메뉴 화면 보이기
  $heroName.textContent = name;
  /* ━━━━━━━━━━━━━━━━━━━━┓
┃              주인공 정보 표시          ┃
┗━━━━━━━━━━━━━━━━━━━━━┛ */
  $heroLevel.textContent = `${hero.lev}Lev`;
  $heroHp.textContent = `HP: ${hero.hp} / ${hero.maxHp}`;
  $heroXp.textContent = `XP: ${hero.xp} / ${15 * hero.lev}`;
  $heroAtt.textContent = `ATT: ${hero.att}`;
  hero.name = name;
});

/* ━━━━━━━━━━━━━━━━━━━━━━━┓
┃     일반메뉴 -> 1번 모험선택시 전투메뉴      ┃
┃이떄 상대할 몬스터를 몬스터리스트 무작위가져옴 ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━┛ */
$gameMenu.addEventListener("submit", (event) => {
  // 일반 메뉴
  event.preventDefault();
  const input = event.target["menu-input"].value;
  if (input === "1") {
    // 1번 모험 선택 시
    $gameMenu.style.display = "none"; // 일반 메뉴 화면 숨기기
    $battleMenu.style.display = "block"; // 전투 메뉴 화면 보이기
    monster = JSON.parse(
      JSON.stringify(
        monsterList[Math.floor(Math.random() * monsterList.length)]
      )
    ); // 몬스터 무작위로 가져오기
    // 상대할 몬스터 정보 표시
    monster.maxHp = monster.hp;
    $monsterName.textContent = monster.name;
    $monsterHp.textContent = `HP: ${monster.hp} / ${monster.maxHp}`;
    $monsterAtt.textContent`ATT: ${monster.att}`;
  } else if (input === "2") {
    // 2번 휴식 선택 시
  } else if (input === "3") {
    // 3번 종료 선택 시
  }
});

/* ━━━━━━━━━━━━━━━━━━━━━━━┓
┃       전투메뉴에서 1(공격)을 입력 할 때      ┃
┃  서로 공격을 주고받고, 그결과를 화면에 표시   ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━┛ */
$battleMenu.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = event.target["battle-input"].value;
  if (input === "1") {
    hero.attack(monster);
    $heroHp.textContent = `HP: ${hero.hp} / ${hero.maxHp}`;
    $monsterHp.textContent = `HP: ${monster.hp} / ${monster.maxHp}`;
    $message.textContent = `${hero.att}의 피해를 주고,  ${monster.att}의 피해를 받았다.`;
  } else if (input === "2") {
    // 2번 회복 선택 시
  } else if (input === "3") {
    // 3번 도망 선택 시
  }
});

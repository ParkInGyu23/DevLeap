/*
이번 과제는 문제만 읽고 완전히 처음부터 구현하기에는 클래스 구조 자체가 익숙하지 않아
중간 이후부터는 제공된 정답 코드를 참고하며 따라 작성하고 흐름을 이해해나갔습니다.

처음에는 클래스 없이 함수만으로 플레이 로직을 처리하려고 했는데,
구조가 점점 복잡해지면서 상태 관리가 뒤엉키거나 중복 코드가 생기기 쉬웠습니다.
반면 Class 기반으로 Game / Hero / Monster 객체를 생성해놓고
각 역할을 메서드 단위로 나누니 확실히 로직이 더 명확하게 나누어졌고
상태가 한 객체 안에 정리된다는 점에서 장점이 크다고 느꼈습니다.

📌 궁금했던 점 — 실무에서도 이렇게 클래스를 많이 사용할까?
찾아보니 정답은 "상황에 따라 다르다"는 것이었습니다.
요즘 프론트엔드 실무에서는 React·Vue 같은 프레임워크를 주로 쓰기 때문에
이런 방식의 Class 구성 자체를 직접 짜는 경우는 상대적으로 적을 수 있지만,
게임/Canvas/WebGL·상태 시뮬레이션·엔진 로직 같은 경우에는 지금처럼
클래스로 객체를 나누어 설계하는 방식이 여전히 자주 사용된다고 합니다.

즉, 실무에서 Class가 무조건 필수는 아니지만
프로그램의 상태가 복잡해지는 경우 오히려 유지보수성과 확장성이 좋아지기 때문에
이번 과제처럼 논리적 개체가 명확한 프로젝트라면 Class 설계는 충분히 의미 있는 선택이라는 걸 배웠습니다.

클래스를 처음 접했을 때는 낯설고 어려웠지만,
직접 적용하면서 객체가 어떤 구조로 흘러가는지 이해할 수 있었습니다.
*/

document.addEventListener('DOMContentLoaded', function() {
  const $startScreen = document.querySelector('.start_screen');
  const $screen = document.querySelector('.screen');
  const $gameMenu = $screen.querySelector('.game_menu');
  const $battleMenu = $screen.querySelector('.battle_menu');
  const $heroStart = $screen.querySelector('.hero_start');
  const $monsterStart = $screen.querySelector('.monster_start');
  const $message = $screen.querySelector('.message');
  
  class Game {
    constructor(name) {
      this.monster = null;
      this.hero = null;
      this.monsterList = [
        { name: '슬라임', hp: 25, att: 10, xp: 10},
        { name: '스켈레톤', hp: 50, att: 15, xp: 20},
        { name: '마왕', hp: 150, att: 35, xp: 50},
      ];
      this.start(name); // 게임 시작
    }
    start(name) { // 게임 시작 메서드
     $screen.querySelector('.game_menu').addEventListener('submit', this.onGameMenuInput);
     $screen.querySelector('.battle_menu').addEventListener('submit', this.onBattleMenuInput);
     this.hero = new Hero(this, name);
     this.changeScreen('game');
     this.updateHeroStat();
    }
    changeScreen(screen) { // 화면 바꾸는 메서드
        if(screen === 'start') {
          $battleMenu.style.display = 'none';
          $monsterStart.style.display = 'none';
          $gameMenu.style.display = 'none';
          $screen.style.display = 'none';
          $startScreen.style.display = 'block';
        } else if(screen === 'game') {
          $startScreen.style.display = 'none';
          $battleMenu.style.display = 'none';
          $monsterStart.style.display = 'none';
          $screen.style.display = 'block';
          $gameMenu.style.display = 'block';
        } else if (screen === 'battle') {
          $gameMenu.style.display = 'none';
          $battleMenu.style.display = 'block';
          $monsterStart.style.display = 'inline-block';
        }
    }
    onGameMenuInput = (e) => { // 게임 메뉴에서 input 입력 시
      e.preventDefault();
      const formData = new FormData(e.target);
      if (!formSubmitCheck(formData)) return; 
      
      const menuInput = formData.get('menu_input');
      // input 값 비우기
      const input = e.target.querySelector('input');
      if (input) input.value = '';
    
      if(menuInput === '1') {
        // 모험을 선택했을때 랜덤으로 몬스터 생성
         const randomIndex = Math.floor(Math.random() * this.monsterList.length);
        const randomMonster = this.monsterList[randomIndex];
        this.monster = new Monster(
            this,
            randomMonster.name,
            randomMonster.hp,
            randomMonster.att,
            randomMonster.xp,
        );
        
        this.changeScreen('battle'); // 화면 전환
        this.updateMonsterStat();
        this.showMessage(`몬스터와 마주쳤다. ${this.monster.name}인 것 같다!`);
      } else if (menuInput === '2') {
        // 휴식
        this.hero.hp = this.hero.maxHp;
        this.updateHeroStat();
         this.showMessage('체력을 모두 회복했다.');
      } else if (menuInput === '3') {
        // 종료
        this.quit();
      }
    }
    onBattleMenuInput = (e) => { // 배틀 메뉴에서 input 입력 시
      e.preventDefault();
      const formData = new FormData(e.target);
      if (!formSubmitCheck(formData)) return; 
      
      const battleInput = formData.get('battle_input');
      // input 값 비우기
      const input = e.target.querySelector('input');
      if (input) input.value = '';
       const { hero, monster } = this;
    
      if(battleInput === '1') {
        // 공격
        hero.attack(monster);
        monster.attack(hero);
        
        if (hero.hp <= 0) {
          this.quit();
          this.showMessage(`${hero.lev} 레벨에서 전사했습니다. 새 주인공을 생성하세요.`);
        } else if (monster.hp <= 0) {
          this.showMessage(`몬스터를 잡아 ${monster.xp} 경험치를 얻었다.`);
          hero.getXp(monster.xp);
          this.monster = null;
          this.changeScreen('game');
        } else {
          this.showMessage(`${hero.att}의 데미지를 주고, ${monster.att}의 데미지를 받았습니다.`);
        }
        this.updateHeroStat();
        this.updateMonsterStat();
      } else if(battleInput === '2') {
        // 회복
        if(hero.hp + 20 <= hero.maxHp) {
          hero.hp += 20;
        } else {
         hero.hp = hero.maxHp;
        }
        monster.attack(this.hero);
        this.showMessage(`회복하는 동안 몬스터에게 공격을 당해 ${hero.hp} 체력이 되었다.`);
      } else if(battleInput === '3') {
        // 도망
        this.changeScreen('game');
        this.showMessage('몬스터를 피해 도망쳤다!');
      }
    }
    updateHeroStat() {
      const { hero } = this;
      if (hero === null) {
          $heroStart.querySelector('.hero_name').textContent = '';
          $heroStart.querySelector('.hero_level').textContent = '';
          $heroStart.querySelector('.hero_hp').textContent = '';
          $heroStart.querySelector('.hero_xp').textContent = '';
          $heroStart.querySelector('.hero_att').textContent = '';
          return;
      }
      $heroStart.querySelector('.hero_name').textContent = hero.name;
      $heroStart.querySelector('.hero_level').textContent = `${hero.lev}Lev`;
      $heroStart.querySelector('.hero_hp').textContent = `HP: ${hero.hp}/${hero.maxHp}`;
      $heroStart.querySelector('.hero_xp').textContent = `XP: ${hero.xp}/${15 * hero.lev}`;
      $heroStart.querySelector('.hero_att').textContent = `ATT: ${hero.att}`;
    }
    updateMonsterStat() {
      const { monster } = this;
      if (monster === null) {
          $monsterStart.querySelector('.monster_name').textContent = '';
          $monsterStart.querySelector('.monster_hp').textContent = '';
          $monsterStart.querySelector('.monster_att').textContent = '';
          return;
      }
      $monsterStart.querySelector('.monster_name').textContent = monster.name;
      $monsterStart.querySelector('.monster_hp').textContent = `HP: ${monster.hp}/${monster.maxHp}`;
      $monsterStart.querySelector('.monster_att').textContent = `ATT: ${monster.att}`;
    }
    showMessage(msg) {
      $message.textContent = msg;
    }
    // 종료 및 초기화
    quit() {
        this.hero = null;
        this.monster = null;
        this.updateHeroStat();
        this.updateMonsterStat();
        $screen.querySelector('.game_menu').removeEventListener('submit', this.onGameMenuInput);
        $screen.querySelector('.battle_menu').removeEventListener('submit', this.onBattleMenuInput);
        this.changeScreen('start');
        game = null;
        showMessage('게임을 재시작합니다.');
    }
  }
  
  // 공툥 요소 함수(부모 클래스)
    class Unit {
        constructor(game, name, hp, att, xp) {
            this.game = game;
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
  
  // 유저 객체 생성
  class Hero extends Unit {
     constructor(game, name) {
          super(game, name, 100, 10, 0);
          this.lev = 1;  
      }
      // 공격 함수
      attack(target) {
          super.attack(target); 
      }
      // 힐 함수
      heal(monster) {
          this.hp += 20;
          this.hp -= monster.att;
      }
      // 경험치 함수
      getXp(xp) {
          this.xp += xp;
          if (this.xp >= this.lev * 15) { // 경험치를 다 채우면
              this.xp -= this.lev * 15;
              this.lev += 1;
              this.maxHp += 5;
              this.att += 5;
              this.hp = this.maxHp;
              this.game.showMessage(`레벨업! 레벨 ${this.lev}`);
          }
      }
  }
  
  // Monster 객체 생성
  class Monster extends Unit {
      constructor(game, name, hp, att, xp) {
          super(game, name, hp, att, xp);
      }
  }
  
  // 폼 검사하는 함수
  const formSubmitCheck = (formData) => {
    for (const [key, value] of formData.entries()) {
      if (value.trim() === '') {
        alert('입력값을 입력해주세요.');
        return false;
      }
    } 
    
    return true;
  }
  
  // 시작화면 
  $startScreen.querySelector('form').addEventListener('submit', function(e)  {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (!formSubmitCheck(formData)) return; 
    
    // 처음 화면에서 유저네임 받고 게임 클래스 생성
    const name = formData.get('name_input');
    game = new Game(name);
    
    // input 값 비우기
    const input = e.target.querySelector('input');
    if (input) input.value = '';
  });
});
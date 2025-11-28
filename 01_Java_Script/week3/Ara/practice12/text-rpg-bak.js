const hero = {
    name : '',
    lev: 1,
    maxHp: 100,
    hp: 100,
    xp: 0,
    att: 10,
    attack(monster) {
      monster.hp -= this.att;
      this.hp -= monster.att;
    }, 
    heal(monster) {
      this.hp += 20;
      this.hp -= monster.att;
    }
  };
  let monster = null;
  const monsterList = [
    { name: '슬라임', hp: 25, att: 10, xp: 10},
    { name: '스켈레톤', hp: 50, att: 15, xp: 20},
    { name: '마왕', hp: 150, att: 35, xp: 50},
  ];
  
  // 폼 검사하는 함수
  const formSubmitCheck = (formData) => {
    for (const [key, value] of formData.entries()) {
      if (value.trim() === '') {
        alert('입력값을 모두 입력해주세요.');
        return false;
      }
    } 
    
    return true;
  }
 
  $startScreen.querySelector('form').addEventListener('submit', function(e)  {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (!formSubmitCheck(formData)) return; 
    
    // 처음 화면에서 유저네임 받고 게임 화면으로 넘어가기
    const username = formData.get('name_input');
    hero.name = username;
    $startScreen.style.display = 'none';
    $screen.style.display = 'block';
    $gameMenu.style.display = 'block';
    
    // 히어로 정보 노출
    $heroStart.querySelector('.hero_name').innerHTML = 'USERNAME : ' + username;
    $heroStart.querySelector('.hero_level').innerHTML = 'LEVEL : ' + hero.lev;
    $heroStart.querySelector('.hero_hp').innerHTML = 'HP : ' + hero.hp + '/' + hero.maxHp;
    $heroStart.querySelector('.hero_xp').innerHTML = 'XP : ' + hero.xp;
    $heroStart.querySelector('.hero_att').innerHTML = 'ATT : ' + hero.att; 
  });
  
  // 게임 메뉴 화면에서 선택
  $screen.querySelector('.game_menu').addEventListener('submit', function(e)  {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (!formSubmitCheck(formData)) return; 
    
    const menuInput = formData.get('menu_input');
    
    if(menuInput === '1') {
      // 모험을 선택했을때 랜덤으로 몬스터 생성
      monster = JSON.parse(
                  JSON.stringify(monsterList[Math.floor(Math.random() * 3)])
                );
      $monsterStart.style.display = 'inline-block';
      $monsterStart.querySelector('.monster_name').innerHTML = 'MONSTER : ' + monster.name;
      $monsterStart.querySelector('.monster_hp').innerHTML = 'HP : ' + monster.hp;
      $monsterStart.querySelector('.monster_att').innerHTML = 'XP : ' + monster.att;
      
      // 다음 화면으로 넘어감
      $gameMenu.style.display = 'none';
      $battleMenu.style.display = 'block';
    } else if (menuInput === '2') {
    
    } else if (menuInput === '3') {
    
    }
  });
  
  $screen.querySelector('.battle_menu').addEventListener('submit', function(e)  {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (!formSubmitCheck(formData)) return; 
    
    const battleInput = formData.get('battle_input');
    
    if(battleInput === '1') {
      // 공격
      hero.attack(monster);
      $message.innerHTML = hero.att + '의 피해를 주고' + monster.att + '의 피해를 받았다.'
      $heroStart.querySelector('.hero_hp').innerHTML = 'HP : ' + hero.hp + '/' + hero.maxHp;
    }
  });
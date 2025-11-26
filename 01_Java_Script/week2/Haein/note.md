# Week 2 개인 정리

<!--## ✏️ 배운 내용 요약
https://youtu.be/eHUUrPc4oyo?si=51DfSG0_lOyj8AY-&t=175-->
  > ✏️ 4강. HTML과 DOM 조작하기
  
  ## 📌 Document Object Model 줄여서 DOM
  📝 DOM을 알아보기 전에<br>
    - 웹브라우저는 HTML 문서를 해석하고, 화면을 통해 해석된 결과를 보여준다.<br>
    - 해석한 HTML 코드를 화면을 통해 보여주는 과정을 '렌더링'이라 한다.<br>
  📝 렌더링의 세부 과정<br>
    - 브라우저는 HTML 코드를 해석해서 요소들을 트리 형태로 구조화해 표현하는 문서(객체)를 생성한다.<br>
    - 이를 DOM이라 하며, 브라우저는 DOM을 통해 화면에 웹 콘텐츠들을 렌더링한다.<br>
  📝 DOM의 존재 목적<br>
    - DOM은 자바스크립트를 사용해서 웹 콘텐츠를 추가, 수정, 삭제하거나 마우스 클릭, 키보드 타이핑 등 이벤트에 대한 처리를 정의할 수 있도록 제공되는 프로그래밍 인터페이스(interface)이다.
    
  <br>
  <br>

  ## 📌 문서 인터페이스 그리고 기능들 (Document & Method)
  > window.document
  
  <!--## 📌 window.document-->
  브라우저 객체 window의 document 속성은 창이 포함한 문서를 참조한다.<br>
  즉, window.document은 현재 브라우저에 렌더링되고 있는 문서를 의미하며,
  이 속성을 이용하면 해당 문서에 접근할 수 있다.
  
  💡 좀 있어보이게 표현하면?<br>
  window.document는 페이지 콘텐츠, 즉 DOM에 대한 진입점 역활을 하는<br>
  프로그래밍 인터페이스이다!
  이를 이용하면 페이지의 정보를 얻거나 웹 요소를 생성 및 조작할 수 있다.
  
  📖 DOM은 document 객체를 통해 접근 및 조작할 수 있다.
  
  > 속성과 메소드를 제공한다<br>

  document는 문서(HTML, XML, SVG 등)에 대한 공통의 속성과 메소드를 제공한다.
  즉, 다양한 API(Application Programming InterFace)를 제공한다.

  관련 문서 참고링크
  https://developer.mozilla.org/ko/docs/Web/API/Document
  


  > 다음 두 메소드는 요소를 선택하기 위해 사용할 수 있는 대표적인 메소드이다.<br>
  
  ### 두 메소드는 모두 요소(Element) 객체를 반환한다!
  - document.querySelector<br>
  - document.getElementById<br>
  
  📖 선택자(selector)는 html 태그를 가져오게 도와주는 문자열이다.<br> 
  📖 여러개의 태그를 선택 > 태그를 한꺼번에 선택하고싶다면!?<br>
    document.querySelector 대신 document.querySelectorAll() 메서드를 사용!
  ~~~html
  <button>입력</button>
  <button>버튼2</button>
  <button>버튼3</button>
  ~~~  
  ~~~js
  📖 const buttons = document.querySelectorAll('button');
  console.log(buttons); 을 사용하게 되면 콘솔에 태그 3개가 동시에 표시가 된다.
  여러개 한번에 표시하려고 배열을 사용한것처럼 보이지만 실제로는 배열이 아니다.
  NodeList 라는 특수한 객체이다.
  💡 이때 querySelectorAll이 아닌 그냥 쓰게되면 첫번째 버튼만 선택된다.
  ~~~
  <br>

  > document.querySelector
  
  document의 querySelector 메소드는 선택자를 인자로 전달받아, 전달받은 선택자와 일치하는 문서 내 첫 번째 요소(Element)를 반환한다. <br>
  일치하는 요소가 없으면 '없다'라는 의미의 null 데이터를 반환한다.<br>
  인자로 전달되는 선택자는 문자열 타입의 '유효한 CSS 선택자'를 의미한다.
  ~~~js
  // p 태그를 선택하자!
  document.querySelector("p");

  // id가 text인 요소를 선택하자!
  document.querySelector("#text"); 

  // class가 text인 요소를 선택하자!
  document.querySelector(".text");
  ~~~

  > document.getElementById

  document의 getElementById 메소드는 id를 인자로 전달받아, 전달받은 선택자와 일치하는 문서 내 요소(Element)를 반환한다.<br>
  일치하는 요소가 없으면 '없다'라는 의미의 null 데이터를 반환한다.<br>
  인자로 전달되는 선택자는 문자열 타입의 'id'를 의미한다.<br>
📝 querySelector에서는 css 선택자를 요구하는 반면
여기에서는 기호없이 ID만 딱 적어주면 되니 참고하기!
  ~~~js
  // id가 text인 요소를 선택하자!
  document.getElementById("text");
  // id가 image인 요소를 선택하자!
  document.getElementById("image");
  ~~~
📖 ID속성 값은 태그에 달 수 있는 고유한 값이며, 한번 사용한 id속성의 값은 다른 태그에 재사용 할 수 없다.<br>
📖 선택하고싶은 태그에 id속성을 달아두면 선택하기 쉽다.<br>
📖 order라는 id속성값이 있으면 앞에 #을 붙여 #order라는 선택자로 사용하면 된다.<br>
~~~js
document.querySelector('#<id 속성 값>')
~~~
📖 두번쨰, 세번째 버튼을 동시에 선택하고 싶을땐 class속성을 사용하면된다.<br>
💡 자바스크립트의 class문법과는 다르니 주의하자!
~~~js
document.querySelectorAll('.<class 속성 값>')
~~~
💡 class속성은 여러번 사용이 가능하나, All이 아닌 일반 메서드를 사용하면 하나의 태그만 선택되니 주의하자!
<br><br>
~~~html
<body>
<div><span id="order">1</span>번째 참가자</div>
<div>제시어: <span id="word"></span></div>
</body>
~~~
~~~js
const span = document.querySelector('div span');
console.log(span);
~~~
📖 실무에서는 div나 span 태그가 흔하게 쓰임으로 span태그에 id속성을 붙여 선택하기 쉽게 한다.
<br>

> textContent

textContent 속성은 해당 노드가 포함하고 있는 텍스트 콘텐츠를 표현하는 속성이다.<br>
textContent를 통해 요소가 포함한 텍스트를 읽을수도, 변경할 수도 있다.<br>
📖 태그내부의 텍스트를 자바스크립트로 가져와야 하거나 태그 내부에 접근해 텍스트를 수정해야 하는 경우<br>
예를들어 '1번째 참가자'라는 문자열에서 현재 참가자가 몇 번째 참가자인지 확인하기 위해 1을 가져와야 한다고하면, 문자열이 담긴 태그에 textContent라는 속성을 붙이면 된다.
~~~js
태그.textContent // 태그 내부의 문자열을 가져옴
~~~
📖 textContent는 무조건 문자열이 나오므로 콘솔에 표시되는 1은 숫자 1이 아닌. 문자열 1이다.<br>
빈값의 경우에도 null이나 undefined가 아닌 ''이 나온다.<br>
~~~html
<div><span id="order">1</span>번째 참가자</div>
<div>제시어: <span id="word"></span></div>
<input type="text">
<button>입력</button>
~~~
~~~js
const $order = document.querySelector('#order');
console.log($order.textContent);
const $div = document.querySelector('div');
console.log($div.textContent)
~~~
📖 div의 textContent는 태그내부에 있는  #order 변수에 담긴 span 태그의 문자열까지 가져왔다.<br>
다만 내부의 <span id="order">dhk </span>은 제거된다.<br>
📖 내부의 HTML 태그까지 전부 가져오고 싶다면 textContent 대신 innerHTML 속성을 사용하면 된다.<br>
~~~js
태그.innerHTML // 태그 내부의 HTML 태그를 포함한 문자열을 가져옴
~~~

~~~js
// p 요소를 반환받아 상수로 이름을 붙인다!
const p = document.querySelector("p");

// p 요소의 text-Content 속성을 콘솔에 출력해보자!
console.log(p.textContent);

// p 요소의 textContent 값을 변경해보자!
p.textContent = "텍스트를 이걸로 바꿔!"
~~~

📝 이 메소드들은 사용법은 다르지만 공톹점인 요소를 찾아서 반환해주고 
반환된 요소는 돔이라는 객체를 통해 직접 조작할 수 있는 대상이다.

🔍 p, h1 태그들을 각각 매소드를 이용하여 골라놓도록 하자!
~~~js
document.querySelector("h1");
document.getElementById("text");

/*두가지를 골라놓으려고 하는데
각각의 요소를 찾아서 반환해주기때문에
반환된 데이터를 우리는 이름을 붙여서 관리를 할 수 있다.*/

const h1 = document.querySelector("h1"); // html h1 태그
const p = document.getElementById("text"); // p태그의 ID "text"
~~~

이름을 붙일때는 변수나 상수를 사용할 수 있다.<br>
우리는 그대상을 변경시키지 않을것 임으로 const를 사용한다.<br>
이렇게하면  h1, p라는 이름은 실제 이태그들에 접근할 수 있는 이름이 된다.<br>

🔍 textContent를 확인해보도록 하자!<br>
📝 (요소안에)쓰여져있는 텍스트를 의미 [ 표시되고있는텍스트를 반환해준다. ]
~~~js
console.log(h1.textContent)
~~~

> textContent 추가적인 특징

📝 포함하고 있는 텍스트들을 읽을수도 있지만 또한 변경할 수도 있다.

📝 읽을때는 변수내용 읽듯이 속성 이름만 써주면 된다.

📝 변경해줄때는 변수랑 마찬가지로 변수내용 변경하듯이
속성의 내용을 변경해주면 된다.
~~~js
h1.textContent = 헬로우 여러분!!";
~~~ 
💡 html 상에서 h1 태그의 내용이 헬로우여러분!! 으로 변경됨을 알 수 있다.


> ⚡️ 한눈에 들어오는 총 정리
- window의 document 속성은 창이 포함한 문서를 참조한다.
- document는 모든 종류의 문서에 대한 공통의 속성과 메소드를 제공한다.
- document의 querySelector 메소드는 선택자를 인자로 전달받아, 전달받은 선택자와 일치하는 문서 내 첫번째 요소(Element)를 반환한다.
- document의 getElementById 메소드는 id를 인자로 전달받아, 전달받은 선택자와 일치하는 문서 내 요소(Element)를 반환한다.
- textContent 속성은 노드가 포함하고 있는 텍스트 콘텐츠를 표시한다.

=================================================================================================================================
 
  ## 📌 이벤트 핸들링 addEventListener & 이벤트 객체
  > addEventListener

  📝 onclick, onkeydown 과 같은 이벤트 속성을 통해 이벤트 핸들러를 등록하는 것보다 현대적인 방법은 addEventListener 메소드를 활용하는 것이다.

  🔍 클릭 이벤트핸들러를 등록하는 경우의 예
  
  ~~~js
  // 이전 영상에서 학습한 방식
  target.onclick = function(){}

  // addEventListener의 방식
  target.addEventListener('click', function(){})
  ~~~
  > 똑같잖아 뭐가 현대적이야

  🔍 결국 이벤트핸들로 등록을 한다. 라는 점만 보면 addEventListener 그다지 특별하게 느껴지지 않는 메소드입니다.<br>
  그러나 이 메서드를 사용해 이벤트핸들러를 등록하는 것은 이벤트핸들러 속성을 사용하는 것에 비해 몇 가지 이점을 제공합니다.<br>
  💡 이전에 추가한 이벤트핸들러를 제거할 수 있는 대응 메소드로 리무브 이벤트리스너라는 메소드를 사용할 수 있게 됩니다.<br>
  💡 같은 타겟에 대해 다수의 핸들러를 등록할 수 있게 해줍니다.<br>
  이벤트속성 가지고는 못하는 거거든요.<br>
  💡 추가적인 옵션 사항들을 더 사용할 수 있게 해줍니다.

  > 이벤트 객체


📝이벤트 객체는 추가적인 기능과 정보를 제공하기 위해 이벤트핸들러에 자동으로 전달되는 데이터이다.<br>
📝이를 활용하기 위해서는 이벤트핸들러 함수에 매개변수를 추가하여 이벤트 발생 시마다 이벤트 객체를 전달받을 수 있도록 해야 합니다.
~~~js
// click 이벤트가 발생하면 함수를 호출하겠다!
target.addEventListener('click', function(){})

// click 이벤트가 발생하면 함수를 호출하겠다!
// + 이때 자동으로 전달되는 이벤트 객체를 매개변수 event에 대입하겠다!
target.addEventListener('click', function(event){})
~~~

💡 이벤트 핸들러라는 것은 이벤트가 발생했을 때를 대비해서 등록하는 함수이다.<br>
💡 이벤트가 발생하면 이벤트 핸들러함수가 호출된다.<br>
💡 그런데 이때 이벤트가 발생하는 그 순간에 이벤트에 대한 기능과 정보를 가지고 있는 객체가 이 이벤트핸들러 함수에 자동으로 전달이 된다.<br>
💡 함수의 데이터가 전달되는 것이니까 함수가 그걸 받으려면 방법은 단 한가지 매개변수를 통해 전달받는 방법밖에 없다.

> ⚡️ 한눈에 들어오는 총 정리
- addEventListener 메소드를 활용해 이벤트 핸들러 등록을 할 수 있다.
- 이는 이벤트 핸들러 속성을 사용하는 것보다 현대적인(좋은) 방법이다.
- 이벤트 객체는 추가적인 기능과 정보를 제공하기 위해 이벤트 핸들러에 자동으로 전달되는 데이터이다.
- 이벤트 발생 시에 이벤트 핸들러가 호출될 때 이벤트 객체가 전달되는데, 이때 이벤트 핸들러 함수의 매개변수를 통해 이벤트 객체를 받을 수 있다.
<!--![alt text](image.png)-->
![alt text](image-1.png)


  ## 📌 createElement & appendChild
  > document.createElement

  📝 document의 createElement 메소드는 ```지정된 이름```의 HTML 요소를 만들어 반환해준다.
  ~~~js
  document.createElement('div')
  document.createElement('p')
  document.createElement('a')
  ~~~
  💡 지정된 이름 : 인자로 전달된 이름을 뜻함, 문자열 형태로 이름을 전달해주면 됨

   > createElement 요소를 만들었다 끝일까?
   
   📝 HTML요소가 만들어지고 또 반환 되었다고 해서, 해당 요소가 곧장 웹 브라우저 화면에 추가되는 것은 아니다.
   ~~~js
   document.createElement('div')
   document.createElement('p')
   document.createElement('a')
   ~~~
   💡 브라우저 화면에 위 요소(div, p, a)들이 곧장 추가되지 않는다.
   💡 메소드를 통해 만든 요소를 DOM에 직접 추가해주는 작업을 꼭 진행해야지만 브라우저를 통해 추가로 렌더링 되는것을 확인할 수 있다.

   > DOM에 추가하는 작업은 어떻게 해야할까?
   
   📝appendChild 라는 친구를 활용하면 된다.
   
   - appendChild 메소드는 '노드'라고도 불리는 DOM 내 개별 요소에 자식 요소를 추가할 때 사용하는 메소드이다.<br>
  
  📝기본 사용 법
  ~~~js
  // 타겟 요소 안에 새롭게 자식 요소가 추가되어서 브라우저 화면 상에도 그 결과가 반영된다.
  target.appendChild(자식으로_추가할_요소)
  
  // createElement를 이용해서 p요소를 생성하고 이를 문서의 body태그 안에다가 자식으로 추가하겠다는 코드
  예제
  const p = document.createElement("p")
  document.body.appendChild(p)
  ~~~
  
  > appendChild vs append

   📝 appendChild 메소드와 비슷한 역활을 하는 append 메소드도 있다.<br>
   타겟 요소에 자식 요소를 추가한다는 점에서 같으나, [기능적]차이점도 존재한다.<br>
   📝 주요한 차이
   - appendChild의 경우 추가한 자식 노드를 반환하지만, append는 반환 데이터가 없다.
   - append를 이용하면 요소에 노드 객체 또는 문자열을 자식 요소로 추가할 수 있지만, appendChild는 노드 객체만을 추가할 수 있다.
   - appendChild 문자열은 추가 불가능 [오브젝트만가능-DOM요소'노드']
   - append 문자열에 대한 추가 가능

   🔍 우리는 둘 중 무엇을 사용해서 자식 요소를 추가하는게 좋을까요?
   - 정답은 없다. 상황에 맞게 선택하면 된다.
   - 무엇을 써야만 한다라는 룰같은것은 없기에 차이점만 잘 기억해두자!

   > 자바스크립트로 스타일 입혀주기

   📝 태그.style.backgroundColor="red"<br>
   📝 태그.style.width = "200px"

   > ⚡️ 한눈에 들어오는 총 정리
    - document의 createElement 메소드는 지정된 이름의 HTML 요소를 만들어 반환해준다.
    - appendChild 메소드는 노드에 자식 요소를 추가할 때 사용하는 메소드이다.
    - append 메소드 또한 자식 요소를 추가할 때 사용할 수 있는 메소드인데, appendChild와 기능적으로 다른 면이 있다.

 ## 📌 입력 요소를 통해 사용자 입력값을 처리하는 방법 [value 속성 & preventDefault]
  > 입력 요소 값 읽기

  📝`<input>`, `<select>` 처럼 사용자로부터 입력을 받는데 사용되는 요소들이 있다.
  여기에서 `사용자가 입력한 값을 읽어들일 때`는 요소의 `value 속성`에 접근하자.

  📝차이를 기억하자!
  - 요소의 텍스트에 접근하고 싶다 : textContent 또는 innerText
  - 사용자가 요소에 입력한 값에 접근하고 싶다 : value

  💡 이 속성들간의 차이를 헷갈려 하시는 경향이 있으니 주의하자!

  > 접근이라 함은...
  
  입력 요소의 value에 접근하여 할 수 있는 일은 크게 두 가지, 읽기와 쓰기이다.
  ~~~js
  // 대상 요소의 사용자 입력값을 읽어 콘솔에 출력하자!
  console.log(target.value)
  
  // 대상 요소의 사용자 입력값을 "변경값"으로 바꾸자!
  target.value = "변경값"
  ~~~

  > 입력 폼을 다루어보자!

  여러 입력 요소를 포함할 수 있는 폼 요소로부터 여러 입력 값을 읽을 수 있다.
  ~~~html
  <form>
    <input name="nickname" placeholder="닉네임" />
    <input name="character" placeholder="특징" />
    <input type="submit" value="입력 완료" />
  </form>
  ~~~
  💬 form에서 submit 이벤트 발생하면 입력 값들을 읽자! 앗, 그런데 문제가...<br>
  - 폼에서 입력값을 제출하는 작업을 수행하면 이때는 이벤트라는걸 발생시킨다.<br>
  - 제출 이벤트 submit 이벤트가 발생되는 그때 우리는 이벤트핸들러를 사용해서 입력값들에 접근하면 되는데
  이 작업을 하기 전에 우리가 해결 해야할 사소한 문제가 하나 있다.<br>
  - 폼에는 액션이라고 하는 속성이 있는데 액션은 폼에 입력된 입력값들을 전송받아 이를 처리해줄 서버 프로그램의 url을 지정하는 속성이다.<br>
  - 웹 문서에 기입된 입력값들을 제출하면 웹 문서는 액션에 쓰여진 url로 이동하게 된다.<br>
  - 그래야 입력값을 토대로 어떤 동작이 이어질 수 있다.<br>
  만일 액션 속성이 지정되지 않은 상태에서 폼을 제출하게되면 그 때는 페이지가 새로고침되어 버리는 현상을 확인할 수 있다.<br>
  - 따라서 액션을 지정하지 않고 폼의 입력값을 읽어드리고 싶을때는 다른 추가적인 조치가 필요하다.<br>
  - 하나의 조치방법으로써 우리는 이벤트 객체를 사용해볼것이다.
~~~html
<form action="없는데요">
  <input name="nickname" placeholder="닉네임" />
  <input name="character" placeholder="특징" />
  <input type="submit" value="입력완료" /> 
</form>
~~~
=> action이 없을땐? 이벤트 객체를 사용해 봅시다.

<!--https://youtu.be/Bsq3gzypMDk?si=GMKe9-jhVcyswKtF&t=332 5:32-->
// 날짜정보를 가져오는 즉시실행함수 

(function() {
  
  const $date = document.querySelector('header .date');
  const $day = $date.nextElementSibling; // DOMTree를 타고 선택
  
  // 날짜출력
  const today = new Date();

  const year = today.getFullYear();
  let month = today.getMonth()+1;
  let date = today.getDate();

  // 월, 일 두자리표기
  month = month < 10 ? `0${month}` : month;
  date = date < 10 ? `0${date}` : date;

  $date.textContent = `${year}.${month}.${date}`;
  

  // 요일출력
  const day = today.getDay(); //0~6(일~토)
  const dayName = ['일','월','화','수','목','금','토'];
  
  $day.textContent = dayName[day];

  // 주말일경우 그림자효과를 줘서 요일강조 -> text-shadow:1px 1px 16px exportColorFn()[0]

  if(day === 0 || day === 6) {
    $day.style.textShadow = `1px 1px 16px ${exportColorFn()[0]}`;
  } else {
    $day.style.textShadow = 'none';
  }

  
})();
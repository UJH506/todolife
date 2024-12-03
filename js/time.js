// 문제) 날짜시간 정보를 가진 객체변수 now를 선언하시오

// 날짜,시간을 가져오는 함수
const displayTimeFn = ()=>{
  const now = new Date();
  
  const hours = now.getHours();      // 시 hours
  const minutes = now.getMinutes();  // 분 minutes
  const seconds = now.getSeconds();  // 초 seconds
  
  // ampm 구분
  const ampm = hours<12 ? 'am' : 'pm';

  // 12시간 표기제
  const hours12 = hours % 12; // 0~11

  // 2자리 숫자로 변환
  const zeroHours = hours12<10 ? `0${hours12}` : `${hours12}`;
  const zeroMimutes = minutes<10 ? `0${minutes}` : `${minutes}`;
  const zeroSeconds = seconds<10 ? `0${seconds}` : `${seconds}`;

  let time = '';

  if(hours12>0) { //1~11
    time = `(${zeroHours}:${zeroMimutes}:${zeroSeconds} ${ampm})`;
  } else { //12
    time = `(12:${zeroMimutes}:${zeroSeconds} ${ampm})`;
  }

  const $time = document.querySelector('header .time');
  $time.textContent = time;
};

// 1초간격으로 콜백함수를 호출
setInterval(displayTimeFn, 1000); //함수에 왜 가로안붙이지 .. .
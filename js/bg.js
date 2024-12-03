const $randomColor = document.querySelector('.random-color');


// 랜덤으로 색상과 보색을 리턴하는 함수
const exportColorFn = ()=>{
    // 1. R,G,B에 해당하는 0~255 사이의 수치를 랜덤하게 추출
  const R = Math.floor(Math.random()*256);
  const G = Math.floor(Math.random()*256);
  const B = Math.floor(Math.random()*256);

  // 2. R,G,B 수치값을 조합하여 배경색을 결정
  const bgColor = `rgb(${R},${G},${B})`;

  // 3. 보색추출 - 255에서 각각의 R,G,B 값을 차감한다.
  const R_ = 255 - R;
  const G_ = 255 - G;
  const B_ = 255 - B;
  const complementaryColor = `rgb(${R_},${G_},${B_})`;

  return [bgColor, complementaryColor]; //return값은 하나밖에 올 수 없기때문에 배열의 형태로
};

$randomColor.addEventListener('click', ()=>{
  const [bgColor, complementaryColor] = exportColorFn(); //비구조할당

  document.body.style.backgroundColor = bgColor;
  document.body.style.color = complementaryColor;

  // section의 테두리색을 보색으로적용
  // 방법1
  document.querySelectorAll('section')[0].style.borderColor = complementaryColor;
  document.querySelectorAll('section')[1].style.borderColor = complementaryColor;
  document.querySelectorAll('section')[2].style.borderColor = complementaryColor;
  
  // 방법2
  for(let i=0; i>3; i++) {
    document.querySelectorAll('section')[i].style.borderColor = complementaryColor
  }

  document.querySelectorAll('section').forEach(($sect)=>{
    sect.style.borderColor = complementaryColor;
  })
});


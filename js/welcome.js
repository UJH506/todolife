const $login = document.getElementById('login');
const $content = $login.nextElementSibling;

const $loginform = $login.firstElementChild;
const $username = $loginform.children[1];

const $user = document.querySelector('.user');

// 로컬스토리지에 state.username에 따라 UI를 선택
if(state.username !== '') {
  $content.style.display = 'block';
  $login.style.display = 'none';
} else {
  $content.style.display = 'none';
  $login.style.display = 'flex';
}

// 로그인폼에 대한 submit 이벤트 구문
$loginform.addEventListener('submit', (evt)=>{
  evt.preventDefault();

  const username = $username.value.trim();

  // html에서 input 태그에 옵션으로 required 줘서 유효성 생략

  $login.style.display = 'none'; //로그인폼 숨김
  $content.style.display = 'block'; //컨텐츠 노출

  // 로컬스토리지에 username 값 저장
  state = {...state, username};
  saveStateFn();

  $user.textContent = username;
  
})
// 로컬스토리지에 저장된 데이터 추출 -> 문자열
let state = localStorage.getItem('state');

if(state !== null ) {

  // 불러온 데이터가 문자열이므로 객체로 변환
  state = JSON.parse(state);

} else {
  // 로컬스토리지에 저장할 초기데이터를 저장
  // 배열, 객체, 배열+객체, 기본데이터 형태로 저장 가능한데 ..
  // state = {

  //   username : '',

  //   Dday : [
  //     {id : 0, tit : '취업준비', date : new Date('2024-07-05').valueOf()}
  //     // {id:1, tit:'취업준비', date: new Date('2024-09-30').valueOf()}
  //     // {id:2, tit:'취업준비', date: new Date('2024-09-30').valueOf()}
  //     // {id:3, tit:'취업준비', date: new Date('2024-09-30').valueOf()}
  //     // 이런식으로 ..담김(필기)
  //   ],
    
  //   nextDdayId : 1,

  //   todos : [
  //     {id : 0, tit : '투두라이프 복습', complete : false},
  //     {id : 1, tit : '투두라이프 복습', complete : false},
  //     {id : 2, tit : '투두라이프 복습', complete : false},
  //     {id : 3, tit : '투두라이프 복습', complete : false}
  //   ],

  //   nextTodoId : 1
  // }

  state = {

    username : '',

    Dday : [],
    
    nextDdayId : 0,

    todos : [],

    nextTodoId : 0
  }
}

// 현재상태를 로컬스토리지에 저장
const saveStateFn = ()=>{
  localStorage.setItem('state', JSON.stringify(state)); //문자열로 변환하여 저장
};

const $expire = document.querySelector('.expire');
$expire.addEventListener('click', ()=>{

  if(confirm('정말로 입력한 정보를 모두 삭제하시겠습니까?')) {
    localStorage.removeItem('state');
    location.reload(); //브라우저 새로고침 (js폴더 140폴더 20번파일 참조)
  } else {
    alert('데이터 초기화가 중지되었습니다. \n계속 이용해 주세요.');
  }
});
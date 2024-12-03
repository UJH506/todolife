(function(){

  const quotes = [
    {
      msg : "노력을 대신할 수 있는 것은 없습니다.",
      author : "토마스 에디슨"
    }, 
    {
      msg : "상황을 가장 잘 활용하는 사람이 가장 좋은 상황을 맞는다.",
      author : "존 우든"
    }, 
    {
      msg : "일반적인 것을 잃을 위험을 감수하지 않으면 평범한 것에 만족해야 한다.",
      author : "짐 론"
    }, 
    {
      msg : "기회는 일어나는 것이 아니라 만들어내는 것이다.",
      author : "크리스 그로서"
    }, 
    {
      msg : "성공한 사람이 되려고 노력하기보다 가치있는 사람이 되려고 노력하라.",
      author : "알버트 아인슈타인"
    }, 
    {
      msg : "나는 실패한 게 아니다. 나는 잘 되지 않는 방법 1만 가지를 발견한 것이다.",
      author : "토마스 에디슨"
    }, 
    {
      msg : "위대한 것으로 향하기 위해 좋은 것을 포기하는 걸 두려워하지 마라.",
      author : "존 록펠러"
    }, 
    {
      msg : "당신이 세상을 바꿀 수 없다고 말하는 사람에는 두 종류가 있다. 시도하기를 두려워하는 사람들, 당신이 성공할까 봐 두려워하는 사람들.",
      author : "레이 고포스"
    }, 
    {
      msg : "성공은 매일 반복한 작은 노력들의 합이다.",
      author : "로버트 콜리어"
    } 
  ];

  const idx = Math.floor(Math.random()*quotes.length);
  const quote = quotes[idx];

  const $msg = document.querySelector('header .msg');
  const $author = $msg.nextElementSibling;

  $msg.textContent = quote.msg;
  $author.textContent = quote.author;

})();

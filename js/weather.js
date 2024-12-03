/*
   navigator 객체는  --(전역객체라 변수선언안해도댐 ! ! -필기)
    1. 브라우저와 운영체제 정보를 제공
    2. 현재 브라우저가 위치정보를 제공하는지 확인할 때 사용
    3. 현재 Host 컴퓨터의 위도, 경도 값을 추출할 때 사용
*/

//GPS 위치정보 동의시 실행할 함수
const currentGeoFn = (position)=>{

  const lat = position.coords.latitude; //위도
  const lon = position.coords.longitude; //경도

  console.log(`lat = ${lat}`);
  console.log(`lon = ${lon}`);

  const APIKey = '8019913290e2983feeeb1cf06aacb633';

  // 비동기방식(AJAX)으로 현재날씨 데이터를 받아와서 출력
  (async function() {
    
    // 날씨정보를 제공하는 오픈웨더맵의 API서비스
    // units=metric 옵션은 섭씨온도 설정
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`; //&로 구분해서 매개변수가 들어감 &이름=값 (필기)

    // console.log(`url = ${url}`);

    const data = await (await fetch(url)).json();

    // console.log('typeof data =', typeof data);
    console.log('data =', data);

    // 1. 현재지역명 출력
    const $city = document.querySelector('.weather .city');
    $city.textContent = data.name;

    // 2. 현재날씨와 기온
    const weather = data.weather[0].main; //description
    const temp = data.main.temp;

    const $weatherTemp = document.querySelector('.weather h3');
    $weatherTemp.textContent = `${weather} / ${temp}`

    // 3. 날씨이미지 https://openweathermap.org/weather-conditions 
    const $weatherImg = document.querySelector('.weather>.current>img');
    const imgSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const imgAlt = data.weather[0].description;

    $weatherImg.setAttribute('src', imgSrc);

    $weatherImg.src = imgSrc;
    $weatherImg.alt = imgAlt;
    $weatherImg.title = imgAlt;

  })();

  
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`;

  // 비동기방식(AJAX)으로 오늘 날씨예보 데이터를 받아와서 출력
  (async function() {
    const info = await (await fetch(forecastUrl)).json();
    // console.log('날씨예보 데이터(5일간 3시간 단위) info =', info);

    /*
      오늘 날씨예보에 대한 시나리오

      1. 사용자에게 필요한 날씨정보 시간대 09:00 ~ 21:00 으로 가정
      2. 현재시간이 낮 12시 이후라면 pm6, pm9에 대한 날씨 정보제공
      3. 현재시간이 낮 12시 이후가 아니라면 am9, p m12에 대한 날씨 정보제공

      4. 오전9시, 오후12/6/9에 해당하는 데이터만을 4개의 변수에 각각 저장
        1) .dt_txt 속성에서 날짜값을 가져와서 진짜 날짜객체로 변환
        2) 40개의 예보 데이터 중 어떤게 오늘날짜의 예보 데이터인지 전수조사
          (1) 현재시간기준 이전자정 시간정보를 밀리세컨즈로 변환 
          (2) 예보데이터의 이전자정 시간정보를 밀리세컨즈로 변환
    */

    let today9am = null; //오늘 오전9시 예보를 저장할 변수 // {dt: 1719478800, main: {…}, weather: Array(1), clouds: {…}, wind: {…}, …}
    let today12pm = null;
    let today6pm = null;
    let today9pm = null;

    // 오늘에 해당하는 이전자정 시간정보를 밀리세컨즈로 변환
    const todayDateMill = new Date().setHours(0,0,0,0);
    // console.log(`todayDateMill = ${todayDateMill}`); //1719414000000

    // 필요한 데이터만을 찾아내기 위한 전수조사
    for(let forecast of info.list) {
      
      // console.log(forecast);
      
      const forecastDate = new Date(forecast.dt_txt); // 예보데이터의 날짜객체
      const forecastHours = forecastDate.getHours();
      const forecastMill = forecastDate.setHours(0,0,0,0); // 예보데이터의 이전자정 시간정보를 밀리세컨즈로 변환
      // console.log('forecastHours =',forecastHours)


      // 만약 같은날(오늘)이면 4개의 예보를 저장할 변수에 각 시간에 해당하는 forecast를 할당
      if(todayDateMill === forecastMill) {

        // 방법1
        switch(forecastHours) {
          case 9: today9am = forecast; break;
          case 12: today12pm = forecast; break;
          case 18: today6pm = forecast; break;
          case 21: today9pm = forecast; break;
        }

        /*
        // 방법2
        if(forecastHours === 9) {
          today9am = forecast;
        } else if(forecastHours === 12) {
          today12pm = forecast;
        } else if(forecastHours === 18) {
          today6pm = forecast;
        } else if(forecastHours === 21) {
          today9pm = forecast;
        }
        */
      }
    }

    
    // console.log('today9am =',today9am );
    // console.log('today12pm =',today12pm );
    // console.log('today6pm =',today6pm );
    // console.log('today9pm =',today9pm );

    const currentHour = new Date().getHours(); //현재시간
    
    let frstForecast = null; //첫번째예보
    let secForecast = null; //두번째예보

    // 현재시간에 따라 위 두 예보변수에 값 할당
    if(currentHour > 12) {
      frstForecast = today6pm;
      secForecast = today9pm;
    } else {
      frstForecast = today9am;
      secForecast = today12pm;
    }

    console.log('frstForecast =',frstForecast);
    console.log('secForecast =',secForecast);

    // 오늘 첫번째 예보 출력
    const $todayFrstFrame = document.querySelector('.today p:nth-of-type(1)>.frame');
    const $todayFrstImg = $todayFrstFrame.firstElementChild;

    $todayFrstImg.src = `https://openweathermap.org/img/wn/${frstForecast.weather[0].icon}@2x.png`;
    $todayFrstImg.alt = frstForecast.weather[0].main;
    $todayFrstImg.title = frstForecast.weather[0].description;
    
    // 돔선택햇는대 변수겹칠거라 그냥변수뺏음 (필기)
    $todayFrstFrame.nextElementSibling.firstElementChild.textContent = `${new Date(frstForecast.dt_txt).getHours()}시`;
    
    $todayFrstFrame.nextElementSibling.lastElementChild.textContent = frstForecast.main.temp;

    // 오늘 두번째 예보 출력
    const $todaySecFrame = document.querySelector('.today p:nth-of-type(2)>.frame');
    const $todaySecImg = $todaySecFrame.firstElementChild;

    $todaySecImg.src = `https://openweathermap.org/img/wn/${secForecast.weather[0].icon}@2x.png`;
    $todaySecImg.alt = secForecast.weather[0].main;
    $todaySecImg.title = secForecast.weather[0].description;
    
    // 돔선택햇는대 변수겹칠거라 그냥변수뺏음 (필기)
    $todaySecFrame.nextElementSibling.firstElementChild.textContent = `${new Date(secForecast.dt_txt).getHours()}시`;
    
    $todaySecFrame.nextElementSibling.lastElementChild.textContent = secForecast.main.temp;
    
  })();

  // 비동기방식(AJAX)으로 내일 날씨예보 데이터를 받아와서 출력
  // (내가한거)
  // (async function() {

  //   // 비동기방식으로 날씨 데이터를 받아오는 fetch() 코드작성
  //   const info = await (await fetch(forecastUrl)).json();
  //   console.log('info =', info)

  //   let tomorrow9am = null;
  //   let tomorrow6pm = null;

  //   const today = new Date();
  //   const tomorrowDateMill = new Date(today.setDate(today.getDate() + 1)).setHours(0,0,0,0); //내일의 이전자정을 밀리초로 변환
  //   console.log('tomorrowDateMill =',tomorrowDateMill);

  //   // 날씨정보객체의 dt_txt 값을 진짜 객체로 변환

  //   for(forecast of info.list) {
  //     const forecastDate = new Date(forecast.dt_txt);
  //     const forecastHour = forecastDate.getHours();
  //     const forecastMill = forecastDate.setHours(0,0,0,0);
  //     // console.log(forecastMill);

  //     // 이전자정이 저거랑 같은거 비교 (내일만 구하기)
  //     if(forecastMill === tomorrowDateMill) {
  //       if(forecastHour === 9) {
  //         tomorrow9am = forecast;
  //       } else if(forecastHour === 18) {
  //         tomorrow6pm = forecast;
  //       }
  //     }
  //   }
  //   console.log('tomorrow9am =',tomorrow9am);
  //   console.log('tomorrow6pm =',tomorrow6pm);

  //   // 내일 첫번째 예보 출력하는 코드
  //   const $tomorrowFstImg = document.querySelector('.tomorrow p:first-of-type>.frame>img');
  //   const $tomorrowFstWhen = document.querySelector('.tomorrow p:first-of-type>span:nth-of-type(2)>.when');
  //   const $tomorrowFstTemp = $tomorrowFstWhen.nextElementSibling;

  //   $tomorrowFstImg.src = `https://openweathermap.org/img/wn/${tomorrow9am.weather[0].icon}@2x.png`;
  //   $tomorrowFstImg.alt = tomorrow9am.weather[0].main;
  //   $tomorrowFstImg.title = tomorrow9am.weather[0].description;

  //   $tomorrowFstWhen.textContent = `${new Date(tomorrow9am.dt_txt).getHours()}시`;

  //   $tomorrowFstTemp.textContent = `${tomorrow9am.main.temp}`

  //   // 내일 두번째 예보 출력하는 코드
  //   const $tomorrowSecImg = document.querySelector('.tomorrow p:last-of-type>.frame>img');
  //   const $tomorrowSecWhen = document.querySelector('.tomorrow p:last-of-type>span:nth-of-type(2)>.when');
  //   const $tomorrowSecTemp = $tomorrowSecWhen.nextElementSibling;

  //   $tomorrowSecImg.src = `https://openweathermap.org/img/wn/${tomorrow6pm.weather[0].icon}@2x.png`;
  //   $tomorrowSecImg.alt = tomorrow6pm.weather[0].main;
  //   $tomorrowSecImg.title = tomorrow6pm.weather[0].description;

  //   $tomorrowSecWhen.textContent = `${new Date(tomorrow6pm.dt_txt).getHours()}시`;

  //   $tomorrowSecTemp.textContent = `${tomorrow6pm.main.temp}`
    
  // })();

  // 비동기방식(AJAX)으로 내일 날씨예보 데이터를 받아와서 출력
  // (쌤이한거)
  (async function() {
    const info = await (await fetch(forecastUrl)).json();
    console.log('info =',info);

    let tomorrow9am = null;
    let tomorrow6pm = null;

    // 내일날짜설정
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);

    const tomorrowMill = tomorrow.setHours(0,0,0,0); //이전자정시간
    console.log(`tomorrowMill = ${tomorrowMill}`);

    // 필요한 데이터를 추출하기 위한 전수조사
    for(let forecast of info.list) {
      const forecastDate = new Date(forecast.dt_txt);
      const forecastHour = forecastDate.getHours();
      const forecastMill = forecastDate.setHours(0,0,0,0);

      // 2개의 날씨예보를 저장할 변수에 각 시간에 해당하는 forecast를 할당
      if(tomorrowMill === forecastMill) {
        switch(forecastHour) {
          case 9 : tomorrow9am = forecast; break;
          case 18 : tomorrow6pm = forecast; break;
        }
      }
    } //for
    
    // 내일 첫번째예보 출력
    const $tomorrowFrstFrame = document.querySelector('.tomorrow p:nth-of-type(1)>.frame');
    const $tomorrowFrstImg = $tomorrowFrstFrame.firstElementChild;

    $tomorrowFrstImg.src = `https://openweathermap.org/img/wn/${tomorrow9am.weather[0].icon}@2x.png`;
    $tomorrowFrstImg.alt = tomorrow9am.weather[0].main;
    $tomorrowFrstImg.title = tomorrow9am.weather[0].description;

    $tomorrowFrstFrame.nextElementSibling.lastElementChild.textContent = tomorrow9am.main.temp;
    
    // 내일 두번째예보 출력
    const $tomorrowSecFrame = document.querySelector('.tomorrow p:nth-of-type(2)>.frame');
    const $tomorrowSecImg = $tomorrowSecFrame.firstElementChild;
    
    $tomorrowSecImg.src = `https://openweathermap.org/img/wn/${tomorrow6pm.weather[0].icon}@2x.png`;
    $tomorrowSecImg.alt = tomorrow6pm.weather[0].main;
    $tomorrowSecImg.title = tomorrow6pm.weather[0].description;

    $tomorrowSecFrame.nextElementSibling.lastElementChild.textContent = tomorrow6pm.main.temp;
  })();
};

// 에러가 발생할 경우 실행할 함수
const errGeoFn = ()=>{
  alert('브라우저가 GPS 위치정보 기능을 지원하지 않습니다.');
};

navigator.geolocation.getCurrentPosition(currentGeoFn, errGeoFn);

const api_key = ""; //openweathermap에 가서 가입하면 발급받을 수 있다.
const weather = document.querySelector(".js-weather"); //html에 추가해준다.
const COORDS = "coords";

function getWeather(lat, lng){
    //fetch(`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}`);
    //fetch를 사용해 api의 데이터를 가져올 수 있다. ` 백틱 사용 권장
    //fetch(`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}`);
    //실제 사용시에는 api키를 추가로 넣어주어야 데이터를 받아올 수 있다.
    //API를 웹에서 접근하는 법을 보고 접근한 다음에 어떤 형식인지 파악하는 것도 잊지말자
    //대부분 JSON이긴 하나 혹시 모르니까 위의 API는 JSON형태로 넘겨준다.
    //검사에서 newtwork탭을 보면 받아온 것의 request헤더와 response결과도 볼 수 있다.
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&units=metric`)
    .then(function(response){   //response는 네트워킹 정보이다.
        return response.json(); //네트워킹 정보로부터 우리가 원하는 데이터인 json만 가져온다.
    }).then(function(json){ //json을 가져오는 것도 시간이 걸리므로 다 가져오면 실행하게 한다.
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
    //기본으로는 화씨온도가 표현된다. units=metric 파라미터를 추가하면 섭씨온도로 표현된다.
    //then은 기본적으로 함수를 호출하지만 데이터가 모두 받아지고 나서 함수를 호출한다.
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){ //위치 값을 인자로 받는다.
    //console.log(position)으로 가져올 값이나 처리하고 싶은 값의 키를 확인한다.
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };  //latitude : latitude 처럼 키와 밸류의 이름이 같으면 하나로 써도 된다.
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("fail to load position");
}

function askForCoords(){
    //navigator라는 것의 API를 이용해서 위치를 가져온다.
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
    //getCurrentPosition은 위치를 가져오는데 성공했을 때와 실패했을 때의 콜백 함수를 인자로 받는다.
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else{
        //get weather
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();
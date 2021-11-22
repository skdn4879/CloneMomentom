const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

function getTime(){
  const dateTime = new Date();
  const hour = dateTime.getHours();
  const minute = dateTime.getMinutes();
  const second = dateTime.getSeconds();

  clockTitle.innerText = `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`;
  
}

function init(){
  getTime();
  setInterval(getTime, 1000);
}
init();
const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-grettings");

const USER_LS = "currentUser"
const SHOWING = "showing";

function saveName(text){
  localStorage.setItem(USER_LS, text);
}

function handleClick(event){
  greeting.classList.remove(SHOWING);
  askForName();
}

function handleNameSubmit(event){
  event.preventDefault(); //이벤트의 기본동작을 막음
  //submit의 경우 enter를 누르면 요청을 보내면서 페이지가 새로고침되고 내부의 텍스트가 사라지는데 이러한 기본 동작을 막은 다음 원하는 동작을 수행하게 할려고 한다.
  const currentValue = input.value;
  paintGreetings(currentValue);
  saveName(currentValue);
}

function askForName(){
  form.classList.add(SHOWING);
  form.addEventListener("submit", handleNameSubmit)
}

function paintGreetings(text){
  form.classList.remove(SHOWING);
  greeting.classList.add(SHOWING);
  greeting.innerText = `Hello ${text}`;
  greeting.addEventListener("click", handleClick)
}

function loadName(){
  const currentUser = localStorage.getItem(USER_LS);

  if(currentUser === null){
    askForName();
  } else{
    paintGreetings(currentUser);
  }
}

function init(){
  loadName();
}

init();
const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event){
    //console.dir(event.target); 대상을 분석해서 키워드를 알아내는 기법
    //여기서는 버튼을 포함한 부모인 li를 찾는 것이 목적 li를 삭제해야하니까
    //console.log(event.target.parentNode);
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li); //html에서 삭제
    //const cleanToDos = toDos.filter(filterFn); filter는 array의 모든 아이템을 가지고 함수를 실행하고
    //거기서 반환 값이 true인 아이템들로만 새로운 array를 만들고 할당한다.
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id); //li의 id는 String이고 toDo의 id는 number여서 동일하게 해준다.
        //이런 자료형의 차이를 주의할 것 console.log로 확인하는 습관을 기르자
        //여기서는 위에 삭제된 li태그를 담은 li라는 변수의 id와 로컬스토리지의
        //toDos라는 배열 안에 들어있는 원소들 중 삭제된 li의 id와 자신의 id 값이
        //다른 애들 즉 삭제되지 않은 애들로만 새로운 배열로 만들어져
        //cleanToDos에 할당된다.
    })
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    //자바스크립트는 localStorage에 String형으로 저장하려고 한다.
    //localStorage.getItem으로 가져오면 집어넣은 타입이 어떻든 String타입의
    //값이 반환된다. 그래서 toDos의 원소가 객체이므로 그냥 넣으면
    //localStorage에 가보면 값이 Object object 이런식으로 보인다.
    //따라서 String형식으로 바꿔서 넣어주는데 우리가 여기서 사용할 것은
    //JSON.stringify이다. 자바스크립트 객체를 String으로 바꿔준다.
    /* JSON = JavaScript Objecgt Notation
    데이터를 전달할 때 자바스크립트가 다룰 수 있도록 Object로 바꿔주는 기법
    Object를 String으로 String을 Object로 바꿀수있다.*/
}

function paintToDo(text){
    const li = document.createElement("li"); //html문서의 엘리먼트를 읽어오는 것 뿐만 아니라 만들어낼 수도 있다.
    const btn_del = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    btn_del.innerText = "완료";
    btn_del.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(span); //해당 태그의 자식 태그로 넣는다는 뜻
    li.appendChild(btn_del);
    li.id = newId;
    toDoList.appendChild(li);
    /* <ul class="js-toDoList">
        <li>
            <span></span>
            <button></button>
        </li>
    </ul> */
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        //넣을 때 JSON String으로 변환해서 넣었으니 뺄 때는 Object로 바꿔서 뺀다.
        /*for(key in parsedToDos){
            paintToDo(parsedToDos[key].text);
        }*/
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        })
    }
} //새로고침 할 때마다 toDos는 빈 배열이 되고 로컬 스토리지에 저장된 객체들의 text만
//받아서 다시 배열에 넣고 id값을 생성해서 넣어주기 때문에 삭제를 해도 다시 새로고침을 하면
//알아서 id들이 순서대로 맞추어진다.

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
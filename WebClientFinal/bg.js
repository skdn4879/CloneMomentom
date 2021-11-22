const body = document.querySelector("body");

const IMG_NUMBER = 5;

function paintImage(number){
    const image = new Image();
    image.src = `./images/${number + 1}.jpg`; //직접 폴더를 생성하고 이미지를 넣음
    image.classList.add("bgImage");
    //body.appendChild(image); 태그 맨 뒷줄에 자식태그 추가
    body.prepend(image) //태그 맨 앞줄에 자식태그 추가
}

function generateRandom(){
    const random = Math.floor(Math.random() * IMG_NUMBER);
    return random;
}

function init(){
    const randomNumber = generateRandom();
    paintImage(randomNumber);
}

init();
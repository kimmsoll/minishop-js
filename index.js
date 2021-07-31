'use strict'

//getElementByClassName 과 querySelector 비교 숙지 필요
const container = document.querySelector(".items");
const logo = document.getElementById("logo");
const btn = document.querySelectorAll(".clothes");

// fetch에 적은 url을 통해 json 파일을 받아올 수 있다
// json에서 items 만 받아오기 위해 과정을 한 번 더 거친다.
const loadData = () => fetch("./data.json")
    .then((res)=>res.json())
    .then((json)=>json.items);

const createHTML = (item) => {
    return `<li><img src="${item.img}">
    <span>${item.size}, ${item.gender}</span>
    </li>`
}

const displayItems = (items) => {
    // join("") 이 아니라 join() 하게 되면 중간에 콤마로 구분됨
    container.innerHTML = items.map((item)=>createHTML(item)).join("");
    return items;
}

const setEventListener = (items) => {
    // 로고 누르면 모든 옷 출력
    logo.addEventListener("click", (event) => {displayItems(items)});
    // 버튼에 맞게 필터링 되어 출력
    btn.forEach(button => button.addEventListener("click", (event) => {
        if(event.target.dataset.key === "color"){
            displayItems(items.filter((item) => item.color === event.target.dataset.value));
        } else if(event.target.dataset.key === "type"){
            displayItems(items.filter((item) => item.type === event.target.dataset.value));
        } else {
            displayItems(items);
        }
}))};

loadData()
.then((items) => displayItems(items))
.then((items) => setEventListener(items));
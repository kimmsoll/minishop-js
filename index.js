'use strict'

const container = document.querySelector(".items");
const logo = document.querySelector("#logo");
const buttons = document.querySelector("nav");

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
    container.innerHTML = items.map((item)=>createHTML(item)).join("");
    return items;
}

const onClick = (event, items) => {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;
    if(key === undefined || value === undefined){
        event.preventDefault();
    } else {
        displayItems(items.filter((item) => item[key] === value));
    }
}

const setEventListener = (items) => {
    logo.addEventListener("click", () => displayItems(items));
    buttons.addEventListener("click", (event) => onClick(event, items));
};

loadData()
.then((items) => displayItems(items))
.then((items) => setEventListener(items));
// ==UserScript==
// @name         GoogleBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.com/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match        https://crushdrummers.ru/*
// @icon         https://www.google.com/s2/favicons?domain=tampermonkey.net
// @grant        none
// ==/UserScript==
let sites = {
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["Гобой","Флейта","Как звучит кларнет","Валторна", "Фагот"],
    "crushdrummers.ru":["Барабанное шоу", "Заказать шоу барабанщиков", "Барабанщики на праздник москва"]
}
let site = Object.keys(sites)[getIntRandom(0, Object.keys(sites).length)]; // Получаем случайный ключ объекта sites
let worlds = sites[site]; // Получаем ключевые слова для выбранного случайным образом сайта
let googleInput = document.getElementsByName("q")[0];
let word = worlds[getIntRandom(0, worlds.length)];
let btnK = document.getElementsByName("btnK")[0];
if(btnK != undefined){ // Проверка, на существование кнопки поиск в гугл, она есть только на главной странице
    document.cookie = "site="+site;
    let i = 0;
    let timerId = setInterval(()=>{
        googleInput.value += word[i++];
        if(i==word.length){
            clearInterval(timerId); // Останавливаем setInterval
            btnK.click();
        }
    }, 1000);
}else if(location.hostname == "www.google.com"){
    let site = getCookie('site');
    let links = document.links;
    let pnnext = document.getElementById("pnnext");
    let goToTheNextPage = true;
    let currentPage = +document.querySelector(".YyVfkd").innerText;
    for(let i=0; i<links.length; i++){
        let link = links[i];
        if(link.href.indexOf(site) != -1){
            setTimeout(function(){
                link.click();
            }, 2000)
            goToTheNextPage = false;
            break;
        }
    }
    if(goToTheNextPage && currentPage<10) setTimeout(function(){pnnext.click();}, 1800);
    else if(goToTheNextPage) location.href = "https://www.google.com/";
}else{
    let links = document.links;
    let index = getIntRandom(0, links.length)
    setTimeout(()=>{
        if (links[index].href.indexOf(location.pathname) != -1)
            links[index].click();
        else location.href = "https://www.google.com/";
    }, 2000);

    console.log("Мы уже не на гугле");
}

function getIntRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}


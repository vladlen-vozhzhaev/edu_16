// ==UserScript==
// @name         GoogleBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.com/*
// @icon         https://www.google.com/s2/favicons?domain=tampermonkey.net
// @grant        none
// ==/UserScript==

let worlds = ["Гобой","Флейта","Как звучит кларнет","Валторна", "Фагот"];
let googleInput = document.getElementsByName("q")[0];
googleInput.value= worlds[getIntRandom(0, worlds.length)];
let btnK = document.getElementsByName("btnK")[0];
if(btnK != undefined){ // Проверка, на существование кнопки поиск в гугл, она есть только на главной странице
    setTimeout(function(){
        btnK.click();
    },1500);
}else{
    let links = document.links;
    let pnnext = document.getElementById("pnnext");
    let goToTheNextPage = true;
    for(let i=0; i<links.length; i++){
        let link = links[i];
        if(link.href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai") != -1){
            setTimeout(function(){
                link.click();
            }, 2000)
            goToTheNextPage = false;
            break;
        }
    }
    if(goToTheNextPage) setTimeout(function(){pnnext.click();}, 1800);
}

function getIntRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}

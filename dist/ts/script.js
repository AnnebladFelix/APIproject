"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const urlFirstGen = 'https://pokeapi.co/api/v2/pokemon?limit=151';
const urlPkmn = 'https://pokeapi.co/api/v2/pokemon/';
const urlMny = 'https://pokeapi.co/api/v2/';
const searchBarInput = document.querySelector('#search-bar');
const searchBtn = document.querySelector('#search-btn');
let pokeinfo = document.querySelector('#info-box');
let pokeCard = document.querySelector('#card-box');
let div1 = document.createElement('div');
let info = document.createElement('p');
let img = document.createElement('div');
let pokeId = document.createElement('p');
let nxtBtn = document.getElementById('nxt-btn');
let preBtn = document.getElementById('pre-btn');
let i = 0;
nxtBtn.addEventListener('click', function (e) {
    e.preventDefault();
    pokeinfo.innerHTML = "";
    i++;
    preBtn.disabled = false;
    foo();
    if (i >= 151) {
        nxtBtn.disabled = true;
    }
    if (i <= 150) {
        nxtBtn.disabled = false;
    }
});
preBtn.addEventListener('click', function (e) {
    e.preventDefault();
    pokeinfo.innerHTML = "";
    foo();
    nxtBtn.disabled = false;
    if (i <= 0) {
        preBtn.disabled = true;
    }
    if (i >= 1) {
        preBtn.disabled = false;
        i--;
    }
});
function foo() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(urlPkmn + i);
        const data = yield response.json();
        pokeinfo.append(div1, info, pokeId, img);
        info.innerHTML = data.name;
        pokeId.innerHTML = ('id: ' + data.id);
        img.innerHTML = (`<img class="cover" src="${data.sprites['front_default']}">`);
    });
}
foo();
searchBtn.addEventListener('click', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const response = yield fetch(urlPkmn + searchBarInput.value);
    const data = yield response.json();
    if (response.status === 404) {
        alert('No Pokemon found!');
    }
    else {
        pokeinfo.append(div1, info, pokeId, img);
        info.innerHTML = data.name;
        pokeId.innerHTML = ('id: ' + data.id);
        img.innerHTML = (`<img class="cover" src="${data.sprites['front_default']}">`);
    }
}));
function pkmnCard() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let y = 1; y < 152; y++) {
            const response = fetch(urlPkmn + y);
            const data = yield (yield response).json();
            let div2 = document.createElement('div');
            let info2 = document.createElement('p');
            info2.className = 'info2';
            let img2 = document.createElement('div');
            pokeCard.append(div2, info2, img2);
            info2.innerHTML = data.name + '. id: ' + data.id;
            img2.innerHTML = (`<img class="cover" src="${data.sprites['front_default']}">`);
        }
    });
}
pkmnCard();

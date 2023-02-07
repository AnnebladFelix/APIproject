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
const urlFirstGen = 'https://pokeapi.co/api/v2/pokemon?limit=151&generation=1';
const urlPkmn = 'https://pokeapi.co/api/v2/pokemon/';
const urlMny = 'https://pokeapi.co/api/v2/';
const urlPkmtype = 'https://pokeapi.co/api/v2/type/';
const searchBarInput = document.querySelector('#search-bar');
const searchBtn = document.querySelector('#search-btn');
let pokeInfo = document.querySelector('#info-box');
let pokeCard = document.querySelector('#card-box');
let pokeTypes = document.querySelector('#pkmTypes');
let div1 = document.createElement('div');
let info = document.createElement('p');
let img = document.createElement('div');
let pokeId = document.createElement('p');
let nxtBtn = document.getElementById('nxt-btn');
let preBtn = document.getElementById('pre-btn');
let i = 1;
nxtBtn.addEventListener('click', function (e) {
    e.preventDefault();
    pokeInfo.innerHTML = "";
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
    pokeInfo.innerHTML = "";
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
        pokeInfo.append(div1, info, pokeId, img);
        info.innerHTML = data.name;
        pokeId.innerHTML = ('id: ' + data.id);
        img.innerHTML = (`<img class="cover" src="${data.sprites['front_default']}">`);
    });
}
foo();
searchBtn.addEventListener('click', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    try {
        const response = yield fetch(urlPkmn + searchBarInput.value);
        const data = yield response.json();
        pokeInfo.append(div1, info, pokeId, img);
        info.innerHTML = data.name;
        pokeId.innerHTML = ('id: ' + data.id);
        img.innerHTML = (`<img class="cover" src="${data.sprites['front_default']}">`);
    }
    catch (error) {
        alert('No Pokemon found!');
    }
}));
function pkmnCard() {
    fetch(urlFirstGen)
        .then(response => response.json())
        .then(pokemons => {
        const pokemon = pokemons.results;
        console.log(pokemon);
        pokemon.map((poke) => {
            fetch(poke.url)
                .then(response => response.json())
                .then(pokemon => {
                const title = document.createElement('h1');
                title.className = 'pkmnName';
                title.innerText = pokemon.name;
                document.body.appendChild(title);
                const img = document.createElement('img');
                img.className = 'pkmImg';
                img.src = pokemon.sprites.front_default;
                img.width = 96;
                img.height = 96;
                img.src = pokemon.sprites.front_default;
                img.loading = "lazy";
                document.body.appendChild(img);
                const typeList = document.createElement('ul');
                typeList.className = 'typeList';
                pokemon.types.forEach((typeInfo) => {
                    const typeItem = document.createElement('li');
                    typeItem.innerText = typeInfo.type.name;
                    typeList.appendChild(typeItem);
                });
                document.body.appendChild(typeList);
                const pokeDiv = document.createElement('div');
                pokeDiv.append(title, img, typeList);
                document.body.appendChild(pokeDiv);
                pokeDiv.className = "pokeDiv";
                pokeCard.append(pokeDiv);
            })
                .catch(error => {
                console.error("error fetching pokemon", error);
            });
        });
    })
        .catch(error => {
        console.error("error fetching pokomen from generation 1", error);
    });
}
pkmnCard();
function displayPokemon(pokemonId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pokemonResponse = yield fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
            const pokemon = yield pokemonResponse.json();
            const pokemonDetailsResponse = yield fetch(pokemon.url);
            const pokemonDetails = yield pokemonDetailsResponse.json();
            const typeDetailsResponses = yield Promise.all(pokemonDetails.types.map((type) => fetch(type.type.url)));
            const typeDetails = yield Promise.all(typeDetailsResponses.map(res => res.json()));
            const title = document.createElement('h1');
            title.innerText = pokemonDetails.name;
            document.body.appendChild(title);
            const img = document.createElement('img');
            img.width = 96;
            img.height = 96;
            img.style.objectFit = "cover";
            img.style.display = "block";
            img.style.width = "100%";
            img.style.height = "auto";
            img.style.margin = "16px 0";
            img.src = pokemonDetails.sprites.front_default;
            img.loading = "lazy";
            document.body.appendChild(img);
            const typeList = document.createElement('ul');
            typeDetails.forEach(details => {
                const typeItem = document.createElement('li');
                typeItem.innerText = details.name;
                typeList.appendChild(typeItem);
            });
            document.body.appendChild(typeList);
        }
        catch (error) {
            console.error(error);
        }
    });
}
function renderPokemonCard(pokemonData) {
    let pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokemon-card");
    pokemonCard.className = "pokeDiv";
    let pokemonName = document.createElement("h1");
    pokemonName.innerHTML = pokemonData.name;
    pokemonName.className = 'pkmnName';
    let pokemonImage = document.createElement("img");
    pokemonImage.src = pokemonData.sprites.front_default;
    pokemonImage.className = 'pkmImg';
    let pokemonTypeList = document.createElement("ul");
    pokemonTypeList.classList.add("pokemon-types");
    pokemonData.types.forEach((type) => {
        let pokemonType = document.createElement("li");
        pokemonType.innerHTML = type.type.name;
        pokemonTypeList.appendChild(pokemonType);
    });
    pokemonTypeList.className = 'typeList';
    pokemonCard.appendChild(pokemonName);
    pokemonCard.appendChild(pokemonImage);
    pokemonCard.appendChild(pokemonTypeList);
    pokeCard.appendChild(pokemonCard);
}
fetch(urlPkmtype)
    .then(response => response.json())
    .then(data => {
    data.results.map((type) => {
        let lbl = document.createElement('label');
        pokeTypes.append(lbl);
        lbl.innerHTML = (`<input class="poke-radio" type="radio" name="pkmnType" value="${type.name}"> ${type.name}`);
    });
}).then(() => {
    let pokeRadio = Array.from(document.querySelectorAll('.poke-radio'));
    pokeRadio.forEach(radioButton => {
        radioButton.addEventListener('change', (event) => {
            const selectedPkmType = event.target.value;
            fetch(urlPkmtype + selectedPkmType)
                .then(response => response.json())
                .then(res => {
                console.log(res);
                pokeCard.innerHTML = "";
                res.pokemon.forEach((pokemon) => {
                    fetch(pokemon.pokemon.url)
                        .then(response => response.json())
                        .then(pokemonData => {
                        pokeCard.appendChild(renderPokemonCard(pokemonData));
                    });
                });
            });
        });
    });
});

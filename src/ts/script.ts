const urlFirstGen = 'https://pokeapi.co/api/v2/pokemon?limit=151'; //?limit=151
const urlPkmn = 'https://pokeapi.co/api/v2/pokemon/';
const urlMny = 'https://pokeapi.co/api/v2/';

const searchBarInput = document.querySelector('#search-bar') as HTMLInputElement;
const searchBtn = document.querySelector('#search-btn') as HTMLButtonElement;
let pokeinfo = document.querySelector('#info-box') as HTMLElement;   
let pokeCard = document.querySelector('#card-box') as HTMLElement;     
let div1 = document.createElement('div');
let info = document.createElement('p');
let img = document.createElement('div');
let pokeId = document.createElement('p');

let nxtBtn = <HTMLButtonElement> document.getElementById('nxt-btn')!;
let preBtn = <HTMLButtonElement> document.getElementById('pre-btn')!;

// interface pkmnTemplate {
//     name: string,
//     id: number,
//     types: string,
//     sprites: ,
// }

// Next button with a gray out function when i >= 151
    let i = 0;
    nxtBtn.addEventListener('click', function(e){
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

    })
// Previous button with a gray out function when i <= 0
    preBtn.addEventListener('click', function(e){
        e.preventDefault();
        pokeinfo.innerHTML = "";
        foo();
        nxtBtn.disabled = false;
        if (i <= 0) {
            preBtn.disabled = true;
        }
        if (i >= 1) {
            preBtn.disabled = false;
            i--
        }
    })
// Function that writes out one pokemon and changes when a button is pressed.
    async function foo() {
        const response = await fetch(urlPkmn + i);
        const data = await response.json();
        pokeinfo.append(div1, info, pokeId, img)
        info.innerHTML = data.name;
        pokeId.innerHTML = ('id: ' + data.id);
        img.innerHTML = (`<img class="cover" src="${data.sprites['front_default']}">`);
    }
    foo();

//function that listens after search and outputs it in info-box
searchBtn.addEventListener('click', async (event) =>{
    event.preventDefault();
    const response = await fetch(urlPkmn + searchBarInput.value);
    const data = await response.json();
    if(response.status === 404){
        alert('No Pokemon found!')
    }else{
        pokeinfo.append(div1, info, pokeId, img)
    info.innerHTML = data.name;
    pokeId.innerHTML = ('id: ' + data.id);
    img.innerHTML = (`<img class="cover" src="${data.sprites['front_default']}">`);
    }
    // if(searchBarInput.value !== data){
    // pokeinfo.append(div1, info, pokeId, img)
    // info.innerHTML = data.name;
    // pokeId.innerHTML = ('id: ' + data.id);
    // img.innerHTML = (`<img class="cover" src="${data.sprites['front_default']}">`);}else{
    //     alert('No Pokemon found!')
    // }
    
})

// Function that writes out first 151 pokemons.
async function pkmnCard() {
    for ( let y = 1; y < 152; y++) {
        const response = fetch(urlPkmn + y);
        const data = await (await response).json();
        let div2 = document.createElement('div');
        let info2 = document.createElement('p');
        info2.className = 'info2';
        let img2 = document.createElement('div');
        pokeCard.append(div2, info2, img2)
        info2.innerHTML = data.name + '. id: ' + data.id;
        img2.innerHTML = (`<img class="cover" src="${data.sprites['front_default']}">`);
    }}
    pkmnCard();

//meny med olika saker så som pokemon, item, berries, games, moves.
// https://pokeapi.co/api/v2/ + menyChoise
//function med functions i för att få upp det man väljer?

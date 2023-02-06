const urlFirstGen = 'https://pokeapi.co/api/v2/pokemon?limit=151&generation=1'; //?limit=151
const urlPkmn = 'https://pokeapi.co/api/v2/pokemon/';
const urlMny = 'https://pokeapi.co/api/v2/'; 
const urlPkmtype = 'https://pokeapi.co/api/v2/type/'

const searchBarInput = document.querySelector('#search-bar') as HTMLInputElement;
const searchBtn = document.querySelector('#search-btn') as HTMLButtonElement;
let pokeinfo = document.querySelector('#info-box') as HTMLElement;   
let pokeCard = document.querySelector('#card-box') as HTMLElement;  
let pokeTypes = document.querySelector('#pkmTypes') as HTMLElement;  

let div1 = document.createElement('div');
let info = document.createElement('p');
let img = document.createElement('div');
let pokeId = document.createElement('p');

let nxtBtn = <HTMLButtonElement> document.getElementById('nxt-btn')!;
let preBtn = <HTMLButtonElement> document.getElementById('pre-btn')!;

type pkmnTemplate = {
    name: string,
    id: string,
    types: string,
    sprites:  { [key: string]: string }, // This type definition specifies that the sprites property is an object that maps strings to strings.
}

// Next button with a gray out function when i >= 151
let i = 1;
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
    const data: pkmnTemplate = await response.json();
    pokeinfo.append(div1, info, pokeId, img)
    info.innerHTML = data.name;
    pokeId.innerHTML = ('id: ' + data.id);
    img.innerHTML = (`<img class="cover" src="${data.sprites['front_default']}">`);
}
foo();

//function that listens after search and outputs it in info-box
searchBtn.addEventListener('click', async (event) =>{
    event.preventDefault();
    try {
        const response = await fetch(urlPkmn + searchBarInput.value);
        const data: pkmnTemplate = await response.json();
        
        pokeinfo.append(div1, info, pokeId, img)
        info.innerHTML = data.name;
        pokeId.innerHTML = ('id: ' + data.id);
        img.innerHTML = (`<img class="cover" src="${data.sprites['front_default']}">`);
        
    } catch (error) {
        alert('No Pokemon found!')
    }
})


// Function that writes out first 151 pokemons.
function pkmnCard() {
    fetch(urlFirstGen)
    .then(response => response.json())
    .then(pokemons => {
        const pokemon = pokemons.results;
        console.log("🚀 ~ file: script.ts:93 ~ pkmnCard ~ pokemon", pokemon)
        pokemon.map((poke: { url: RequestInfo | URL; }) => {
            fetch(poke.url)
            .then(response => response.json())
            .then(pokemon => {
               
                const title = document.createElement('h1');
                title.innerText = pokemon.name;
                document.body.appendChild(title);
            
                const img = document.createElement('img');
                img.src = pokemon.sprites.front_default;
                img.width = 96;
                img.height = 96;
                img.src = pokemon.sprites.front_default;
                img.loading = "lazy";
                document.body.appendChild(img);
            
                const typeList = document.createElement('ul');
                pokemon.types.forEach((typeInfo: { type: { name: string; }; }) => {
                  const typeItem = document.createElement('li');
                  typeItem.innerText = typeInfo.type.name;
                  typeList.appendChild(typeItem);
                });
                document.body.appendChild(typeList);
                
            })
            .catch(error => {
                console.error("error fetching pokemon" , error);
            });  
        })
           
    })
    .catch(error => {
        console.error("error fetching pokomen from generation 1" , error);
    });
}
    
pkmnCard();
async function displayPokemon(pokemonId: any) {
    try {
      const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      const pokemon = await pokemonResponse.json();
  
      const pokemonDetailsResponse = await fetch(pokemon.url);
      const pokemonDetails = await pokemonDetailsResponse.json();
  
      const typeDetailsResponses = await Promise.all(pokemonDetails.types.map((type: { type: { url: RequestInfo | URL; }; }) => fetch(type.type.url)));
      const typeDetails = await Promise.all(typeDetailsResponses.map(res => res.json()));
  
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
    } catch (error) {
      console.error(error);
    }
  }
  
  


//meny med olika saker så som pokemon, item, berries, games, moves.
// https://pokeapi.co/api/v2/ + menyChoise
//function med functions i för att få upp det man väljer?

fetch(urlPkmtype)
    .then(response => response.json())
    .then(data => {
        data.results.map((type: { name: any; }) => {
            let lbl = document.createElement('label');
            pokeTypes.append(lbl)
            lbl.innerHTML = (`<input class="poke-radio" type="radio" name="pkmnType" value="${type.name}"> ${type.name}`)
        })
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
                    console.log(pokeCard);
                })
            });
        });
    }
);  


//kolla upp promise all
//inne i radiobutton ränsa innerhtml och ersätt med det nya
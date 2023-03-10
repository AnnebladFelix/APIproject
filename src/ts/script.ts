const urlFirstGen = 'https://pokeapi.co/api/v2/pokemon?limit=151&generation=1'; //?limit=151
const urlPkmn = 'https://pokeapi.co/api/v2/pokemon/';
const urlPkmtype = 'https://pokeapi.co/api/v2/type/' // all pokemon types and the pokemons under the type.

const searchBarInput = document.querySelector('#search-bar') as HTMLInputElement;
const searchBtn = document.querySelector('#search-btn') as HTMLButtonElement;
let pokeInfo = document.querySelector('#info-box') as HTMLElement;   
let pokeCard = document.querySelector('#card-box') as HTMLElement;  
let pokeTypes = document.querySelector('#pkmTypes') as HTMLElement;  
let div1 = document.createElement('div');
let info = document.createElement('p');
info.className = 'infoName';
let img = document.createElement('div');
let pokeId = document.createElement('p');
let nxtBtn = <HTMLButtonElement> document.getElementById('nxt-btn')!;
let preBtn = <HTMLButtonElement> document.getElementById('pre-btn')!;
//All the colors for the pokeomn types
const colors = {
    fire: "#f08030",
    grass: "#78c850",
    electric: "#f8d030",
    ice: '#98d8d8',
    water: "#6890f0",
    ground: "#e0c068",
    rock: "#b8a038",
    fairy: "#ffaec9",
    poison: "#a040a0",
    bug: "#a8b820",
    dragon: "#7038f8",
    psychic: "#f85888",
    flying: "#a890f0",
    fighting: "#c03028",
    normal: '#a8a878',
    dark: '#705848',
    ghost: '#705898',
    steel: '#b8b8d0',
  }
const main_types = Object.keys(colors);

//typing up my pokemons
type pkmnTemplate = {
    [x: string]: any;
    name: string,
    id: number,
    types: string,
    sprites:  { [key: string]: string }, // This type definition specifies that the sprites property is an object that maps strings to strings.
}

// Function that writes out one pokemon and changes when a button is pressed.
async function foo() {
    const response = await fetch(urlPkmn + i);
    const data: pkmnTemplate = await response.json();
    pokeInfo.append(div1, info, pokeId, img)
    info.innerHTML = data.name;
    pokeId.innerHTML = ('id: ' + data.id);
    img.innerHTML = (`<img class="cover" src="${data.sprites['front_default']}">`);
}
foo();

// Next button with a gray out function when i >= 151
let i = 1;
nxtBtn.addEventListener('click', function(e){
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
})
    
// Previous button with a gray out function when i <= 0
preBtn.addEventListener('click', function(e){
    e.preventDefault();
    pokeInfo.innerHTML = "";
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

//function that listens after search and outputs it in info-box
searchBtn.addEventListener('click', async (e) =>{
    e.preventDefault();
    try {
        const response = await fetch(urlPkmn + searchBarInput.value);
        const data: pkmnTemplate = await response.json();
        
        pokeInfo.append(div1, info, pokeId, img)
        info.innerHTML = data.name;
        pokeId.innerHTML = ('id: ' + data.id);
        img.innerHTML = (`<img class="cover" src="${data.sprites['front_default']}">`);
        
    } catch (error) {
        alert('No Pokemon found!')
    }
})


// Function that writes out first 151 pokemons.
function pkmnCard() {
    // fetch data from urlFirstGen 
    fetch(urlFirstGen)
      .then(response => response.json())
      .then(pokemons => {
        // destructure the response and assign the `results` property to the `pokemon` constant
        const pokemon: pkmnTemplate = pokemons.results;
        console.log(pokemon)
        
        // use the `map` method to loop through the `pokemon` constant and perform an action for each item in the array
        pokemon.map((poke: { url: RequestInfo | URL; }) => {
          // fetch data from the URL provided in each pokemon object
          fetch(poke.url)
            .then(response => response.json())
            .then(pokemon => {
              // create the title element and set its inner text to the pokemon's name
              const title = document.createElement('h1');
              title.className = 'pkmnName'
              title.innerText = pokemon.name;
              document.body.appendChild(title);
              
              // code to show pokemon's ID
              // const id = document.createElement('h2');
              // id.className = 'pkmnId'
              // id.innerText = ('ID: ' + pokemon.id);
              // document.body.appendChild(id);
  
              // create an image element and set its source URL to the front default sprite of the pokemon
              const img = document.createElement('img');
              img.className = 'pkmImg'
              img.src = pokemon.sprites.front_default;
              img.width = 96;
              img.height = 96;
              img.src = pokemon.sprites.front_default;
              img.loading = "lazy";
              document.body.appendChild(img);
              
              // create a list element for the pokemon's types
              const typeList = document.createElement('ul');
              typeList.className = 'typeList'
              // use `forEach` to loop through the pokemon's types and add a list item for each type
              pokemon.types.forEach((typeInfo: { type: { name: string; }; }) => {
                const typeItem = document.createElement('li');
                typeItem.innerText = typeInfo.type.name;
                typeList.appendChild(typeItem);
              });
              document.body.appendChild(typeList);
              
              // create a div element and append the title, image, and type list to it
              const pokeDiv = document.createElement('div');
              pokeDiv.append(title, img, typeList); //need to add id into the append if id is desierd to show
              document.body.appendChild(pokeDiv);
              pokeDiv.className = "pokeDiv";
              const poke_types = pokemon.types.map((type: { type: { name: any; }; }) => type.type.name)
              const type = main_types.find((type) => poke_types.indexOf(type) > -1)
              const color = colors[type];
              // background is dependent on type
              pokeDiv.style.backgroundColor = color
              // finally, append the `pokeDiv` to the `pokeCard` element
              pokeCard.append(pokeDiv);
            })
            .catch(error => {
              // log an error if there's a problem fetching the pokemon's information
              console.error("error fetching pokemon" , error);
            });  
        })
      })
      .catch(error => {
        // log an error if there's a problem fetching the first generation pokemon  
        console.error("error fetching pokomen from generation 1" , error);
    });
}
pkmnCard();
async function displayPokemon(pokemonId: Array<string | number>) {
    try {
      const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      const pokemon = await pokemonResponse.json();
      const pokemonDetailsResponse = await fetch(pokemon.url);
      const pokemonDetails = await pokemonDetailsResponse.json();
      // We then make a request to the URL for each type of the pokemon, using Promise.all to wait for all of the requests to complete.
      //with the first map function i take url and every type object will become an url and in the second map i take the url and make it into a jason response.
      const typeDetailsResponses = await Promise.all(pokemonDetails.types.map((type: { type: { url: RequestInfo | URL; }; }) => fetch(type.type.url)));
      const typeDetails = await Promise.all(typeDetailsResponses.map(res => res.json()));
      // Next, we create an h1 element with the name of the pokemon.
      const title = document.createElement('h1');
      title.innerText = pokemonDetails.name;
      // We append the h1 element to the body of the document.
      document.body.appendChild(title);
      // We create an img element with the front default sprite of the pokemon.
      const img = document.createElement('img');
      img.width = 96;
      img.height = 96;
      img.src = pokemonDetails.sprites.front_default;
      img.loading = "lazy";
      // We append the img element to the body of the document.
      document.body.appendChild(img);
  
      // We create a ul element for the types of the pokemon.
      const typeList = document.createElement('ul');
      // For each type, we create a li element with the name of the type and append it to the ul element.
      typeDetails.forEach(details => {
        const typeItem = document.createElement('li');
        typeItem.innerText = details.name;
        typeList.appendChild(typeItem);
      });
      // We append the ul element to the body of the document.
      document.body.appendChild(typeList);
    } catch (error) {
      // If an error occurs, we log it to the console.
      console.error(error);
    }
}
// function to create and render pokemon cards
function renderPokemonCard(pokemonData: { name: string; sprites: { front_default: string; }; types: { type: { name: string; }; }[]; }) {
    // create a new div element for the pokemon card
    let pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokemon-card");
    pokemonCard.className = "pokeDiv";

    // create the pokemon name header
    let pokemonName = document.createElement("h1");
    pokemonName.innerHTML = pokemonData.name;
    pokemonName.className = 'pkmnName'
  
    // create the pokemon image
    let pokemonImage = document.createElement("img");
    pokemonImage.src = pokemonData.sprites.front_default;
    pokemonImage.className = 'pkmImg'
  
    // create the pokemon type list
    let pokemonTypeList = document.createElement("ul");
    pokemonTypeList.classList.add("pokemon-types");
  
    pokemonData.types.forEach((type: { type: { name: string; }; }) => {
      let pokemonType = document.createElement("li");
      pokemonType.innerHTML = type.type.name;
      pokemonTypeList.appendChild(pokemonType);
    });
    pokemonTypeList.className = 'typeList'
  
    // append all elements to the pokemonCard
    pokemonCard.appendChild(pokemonName);
    pokemonCard.appendChild(pokemonImage);
    pokemonCard.appendChild(pokemonTypeList);
  
    // append the pokemon card to the pokemon card container
    pokeCard.appendChild(pokemonCard);
    return pokemonCard;
}
//Menu with radiobuttons that changes to buttons. When pressed they change color.
fetch(urlPkmtype)
.then(response => response.json())
.then(data => {
    data.results.map((type: { name: any; }) => {
        let radioDiv = document.createElement('div');
        radioDiv.className = 'radioDiv';
        let lbl = document.createElement('label');
        lbl.className = 'radioLabel';
        radioDiv.append(lbl);
        pokeTypes.append(radioDiv);
        lbl.innerHTML = (`<input class="poke-radio" type="radio" name="pkmnType" value="${type.name}"> ${type.name}`)
    });
    // add event listeners to the radio buttons
    const radioButtons = document.querySelectorAll('.poke-radio');
    radioButtons.forEach(radioButton => {
        radioButton.addEventListener('click', () => {
            // remove the "checked" class from all radio buttons
            radioButtons.forEach(rb => {
                rb.parentElement!.classList.remove('checked');
            });
            // add the "checked" class to the parent label of the selected radio button
            radioButton.parentElement!.classList.add('checked');
        });
    });
  }).then(() => {
    //makes an array from my radiobutton
    let pokeRadio = Array.from(document.querySelectorAll('.poke-radio'));   
        pokeRadio.forEach(radioButton => {
            radioButton.addEventListener('change', (event) => {
                //event.preventDefault();
                if (event.target instanceof HTMLInputElement) {
                    const selectedPkmType = event.target.value;
                    fetch(urlPkmtype + selectedPkmType)
                    .then(response => response.json())
                    .then(res => {
                        console.log(res);
                        pokeCard.innerHTML = "";
                        res.pokemon.forEach((pokemon: { pokemon: { url: RequestInfo | URL; }; }) => {
                        fetch(pokemon.pokemon.url)
                        .then(response => response.json())
                        .then(pokemonData => {
                            pokeCard.appendChild(renderPokemonCard(pokemonData));
                        });
                    });
                });
            }
        });
    });
});

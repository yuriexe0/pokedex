const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__img");
const pokemonType = document.querySelector(".pokemon__type");

const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const buttonPrev = document.querySelector(".btnprev");
const buttonNext = document.querySelector(".btnnext");

let searchPokemon = 1;

const colors = {
    fire: '#EE8130',
    grass: '#7AC74C',
    electric: '#F7D02C',
    water: '#6390F0',
    ground: '#E2BF65',
    rock: '#B6A136',
    fairy: '#D685AD',
    poison: '#A33EA1',
    bug: '#A6B91A',
    dragon: '#6F35FC',
    psychic: '#F95587',
    flying: '#A98FF3',
    fighting: '#C22E28',
    normal: '#A8A77A',
    ghost: '#735797',
    ice: '#96D9D6',
    dark: '#705746',
    steel: '#B7B7CE'
}

const fetchPokemon = async (pokemon) =>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)   
    
    if (APIResponse.status == 200){
    const data = await APIResponse.json();
    return data;
    }
}


const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = "Carregando...";
    pokemonNumber.innerHTML = "";
    pokemonType.innerHTML = "";

    const data = await fetchPokemon(pokemon);

    if (data){

    pokemonImage.style.display = "block";
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = `#${data.id}`;
    
    const tiposDosPokemons = data.types.map(type => type.type.name);
    const coresDosTipos = tiposDosPokemons.map(tipo => colors[tipo]); 
    pokemonType.innerHTML = tiposDosPokemons.join(', ');  
    pokemonType.style.color = 'white'; 
    pokemonType.innerHTML = tiposDosPokemons.map((tipo, index) => {
        return `<span style="color: ${coresDosTipos[index]}">${tipo}</span>`;
    }).join(' / ');

    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = "";
    searchPokemon = data.id;
    } else {
        pokemonImage.style.display = "none";
        pokemonName.innerHTML = "Not found";
        pokemonNumber.innerHTML = "";
        pokemonType.innerHTML = "";
    }
}

form.addEventListener("submit", (event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});


buttonPrev.addEventListener("click", () =>{
    if (searchPokemon > 1){
    searchPokemon--;
    renderPokemon(searchPokemon);}
    
});

buttonNext.addEventListener("click", () =>{
    searchPokemon++;
    renderPokemon(searchPokemon);    
});


renderPokemon(searchPokemon);
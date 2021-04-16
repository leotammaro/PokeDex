const $listadoPokemons = document.querySelector(".lista");
const pokemonDetallado = document.querySelector(".pokemon-detallado");

async function mostrarListadoPokemones(pagina){ 
        const pokemons = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${pagina*20}`)
        .then(response=>response.json())
        .then(data=> data.results);
        pokemons.forEach(pokemon=>{
            const $pokemonDiv = document.createElement("div");
            $pokemonDiv.classList.add("pokemon");
            const {url} = pokemon;
            fetch(url).then(responseURL=>responseURL.json())
                .then(dataURL=>{
                    const NOMBRE_POKEMON = dataURL.forms[0].name
                    const $img = document.createElement("img");
                    const $span = document.createElement("span");
                    const $divTiposPokemon = document.createElement("div");
                    $divTiposPokemon.classList.add("tipos-pokemons");
                    $span.classList.add("nombre-pokemon");
                    $span.textContent = NOMBRE_POKEMON;
                    $img.src=dataURL.sprites.front_default;
                    $img.classList.add("imagen-pokemon");
                    $pokemonDiv.appendChild($img);
                    $pokemonDiv.appendChild($span);
                    dataURL.types.forEach(tipos=>{
                        const $spanTipoPokemon = document.createElement("p");
                        $spanTipoPokemon.textContent = tipos.type.name;
                        $spanTipoPokemon.classList.add("tipo-pokemon");
                        $spanTipoPokemon.classList.add(tipos.type.name)
                        $divTiposPokemon.appendChild($spanTipoPokemon);
                        $pokemonDiv.appendChild($divTiposPokemon);
                    
                    })
                    mostrarInfoPokemonAlClickear($pokemonDiv,dataURL,$img,$span);
                })
                
            $listadoPokemons.appendChild($pokemonDiv);
        });
    
}
mostrarListadoPokemones(0);

function limpiarHTML(){
    $listadoPokemons.innerHTML = "";
}

function agregarPokemonsAlScrollear(scroll=true){
    if(scroll==true){
        let mostrarPagina = 1;
    window.addEventListener("scroll",()=>{
          if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
            mostrarListadoPokemones(mostrarPagina);
            mostrarPagina++;
        }
    })
    }
    
}
agregarPokemonsAlScrollear()

function mostrarInfoPokemonAlClickear(pokemon,infoPokemon,imagen,nombre){
    agregarPokemonsAlScrollear(false);
        pokemon.addEventListener("click",()=>{
            crearInfoPokemon(infoPokemon,imagen,nombre);
        });       
}

function volverALaPokedex(boton){
    boton.addEventListener("click",()=>{
    pokemonDetallado.innerHTML = "";
    $listadoPokemons.innerHTML = "";
    pokemonDetallado.style.display = "none";
    $listadoPokemons.style.display = "flex";
    mostrarListadoPokemones(0);
    agregarPokemonsAlScrollear(true); 
    })
}
function buscarPokemon(event){
    event.preventDefault();
    const nombreOIdPokemonBuscado = document.getElementsByTagName("input")[0].value
    fetch(`https://pokeapi.co/api/v2/pokemon/${nombreOIdPokemonBuscado}`)
    .then(response=>response.json())
    .then(data=>{crearInfoPokemon(data)});
}

function crearInfoPokemon(infoPokemon){
    const $divPokemon= document.querySelector(".pokemon-detallado");
    $divPokemon.innerHTML = "";
    const $spanNombrePokemon = document.createElement("span");
    $spanNombrePokemon.textContent = infoPokemon.name
    const $imgPokemon = document.createElement("img");
    $imgPokemon.src = infoPokemon.sprites.front_default;
    $imgPokemon.className = "imagen-pokemon-grande"
    $spanNombrePokemon.className = "nombre-pok";
    $listadoPokemons.style.display = "none";
    const habilidadPokemon = infoPokemon.abilities[0].ability.name;
    const pesoPokemon = infoPokemon.weight;
    const alturaPokemon = infoPokemon.height;
    const $divInfoPokemon = document.createElement("div");
    const detallesPokemon = document.createElement("div");
    detallesPokemon.className = "habilidades-peso-altura";
    const $divImagenDetalles = document.createElement("div");
    detallesPokemon.innerHTML = `<p>Habilidad : ${habilidadPokemon}</p>
                                 <p>Peso : ${pesoPokemon} kg</p>                          
                                 <p>Altura : ${alturaPokemon} m</p>
                                                                `
    const $buttonVolverInicio = document.createElement("button");
    $buttonVolverInicio.className = "boton-inicio-pokedex";
    $buttonVolverInicio.innerText = "Volver a la pokedex";
    volverALaPokedex($buttonVolverInicio);
    $divInfoPokemon.classList.add("info-pokemon");
    $divInfoPokemon.appendChild($spanNombrePokemon);
    $divImagenDetalles.appendChild($imgPokemon);
    $divImagenDetalles.appendChild(detallesPokemon);
    $divImagenDetalles.className = "detalles-pokemon";
    $divInfoPokemon.appendChild($divImagenDetalles);
    $divInfoPokemon.appendChild($buttonVolverInicio);
    pokemonDetallado.appendChild($divInfoPokemon);
    pokemonDetallado.style.display = "flex";
}

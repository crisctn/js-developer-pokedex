const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const detailButton = document.getElementById('btnDetail')
const pokemonDetail = document.getElementById('pokemonDetail')

const maxRecords = 151
let offset = 0;
const limit = 10

function convertPokemonToLi(pokemon) {
    return 
    `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
            <button class="detailButton" 
                    id="btnDetail"
                    type="button"
                    onclick="detalharPokemon('${pokemon.name}')" >
                Detail
            </button>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

function detalharPokemon(namePokemon) {
    alert(namePokemon)
    // pokeApi.getPokemonByName(namePokemon)
    //     .then((pokemon) => {

    //         const newHtml = 
    //         `
    //             <span class="number">#${pokemon.number}</span>
    //             <span class="name">${pokemon.name}</span>
    //         `

    //         pokemonDetail.innerHTML += newHtml

    //     })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
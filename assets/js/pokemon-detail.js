const pokemonDetails =
    document.getElementById('pokemonDetails');

const params =
    new URLSearchParams(window.location.search);

const pokemonId =
    params.get('id');

async function buscarPokemon(id) {

    const resposta = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${id}`
    );

    if (!resposta.ok) {
        throw new Error('Pokémon não encontrado');
    }

    return await resposta.json();
}

function mostrarPokemon(pokemon) {

    const tipos = pokemon.types
        .map((tipo) => tipo.type.name)
        .join(' / ');

    pokemonDetails.innerHTML = `

        <section class="pokemon-detail ${pokemon.types[0].type.name}">

            <header class="pokemon-header">

                <a href="./index.html" class="back">
                    ←
                </a>

                <h1>
                    ${pokemon.name}
                </h1>

                <span class="number">
                    #${String(pokemon.id).padStart(3, '0')}
                </span>

            </header>


            <div class="pokemon-image">

                <img
                    src="${pokemon.sprites.other['official-artwork'].front_default}"
                    alt="${pokemon.name}"
                >

            </div>


            <div class="pokemon-info">

                <div class="types">

                    ${pokemon.types.map((tipo) => `
                        <span class="type">
                            ${tipo.type.name}
                        </span>
                    `).join('')}

                </div>


                <h2>Informações</h2>

                <div class="info-grid">

                    <div>
                        <strong>Altura</strong>
                        <span>
                            ${pokemon.height / 10} m
                        </span>
                    </div>

                    <div>
                        <strong>Peso</strong>
                        <span>
                            ${pokemon.weight / 10} kg
                        </span>
                    </div>

                    <div>
                        <strong>Experiência</strong>
                        <span>
                            ${pokemon.base_experience}
                        </span>
                    </div>

                    <div>
                        <strong>Tipos</strong>
                        <span>
                            ${tipos}
                        </span>
                    </div>

                </div>


                <h2>Status Base</h2>

                <div class="stats">

                    ${pokemon.stats.map((stat) => `

                        <div class="stat">

                            <span class="stat-name">
                                ${traduzirStatus(stat.stat.name)}
                            </span>

                            <span class="stat-value">
                                ${stat.base_stat}
                            </span>

                            <div class="stat-bar">

                                <div
                                    class="stat-progress"
                                    style="width: ${Math.min(stat.base_stat, 100)}%"
                                ></div>

                            </div>

                        </div>

                    `).join('')}

                </div>

            </div>

        </section>
    `;
}

function traduzirStatus(status) {

    const nomes = {

        hp: 'HP',

        attack: 'Ataque',

        defense: 'Defesa',

        'special-attack': 'Ataque Especial',

        'special-defense': 'Defesa Especial',

        speed: 'Velocidade'

    };

    return nomes[status] || status;
}


buscarPokemon(pokemonId)
    .then(mostrarPokemon)
    .catch((erro) => {

        pokemonDetails.innerHTML = `
            <div class="error">
                <h1>Pokémon não encontrado</h1>

                <a href="./index.html">
                    Voltar para a Pokédex
                </a>
            </div>
        `;

        console.error(erro);

    });
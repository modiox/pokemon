// fetch("https://jsonplaceholder.typicode.com/todos", {
//   method: "POST",
//   headers: {
//     "Content-type": "applications/json",
//   },
//   body: JSON.stringify({
//     id: "1",
//     title: "delectus aut autem",
//   }),
// })
//   .then((res) => {
//     return res.json();
//   })

//   .then((data) => console.log(data))
//   .catch((error) => console.log("ERROR"));

//this works :)

async function fetchData() {
  try {
    const pokeName = document.getElementById("pokemon-name").value.toLowerCase();
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
    if (!res.ok) {
      throw new Error("could not fetch resource");
    }

    const data = await res.json();
    const getPokemon = data.sprites.front_default;
    const imgElement = document.getElementById("pokemon-sprite");

    imgElement.src = getPokemon;
    imgElement.style.display = "block";
  } catch (error) {
    console.error(error);
  }
}

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission behavior
  fetchData(); // Call fetchData function when form is submitted
});

async function fetchPokemon() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=200"); // Fetch list of Pokémon
    const data = await response.json();
    const pokemons = data.results; // Extract Pokémon data from the response

    const gridContainer = document.getElementById("pokemon-grid");

    pokemons.forEach((pokemon) => {
      const pokemonName = pokemon.name;
      const pokemonUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        pokemons.indexOf(pokemon) + 1
      }.png`;

      const pokemonDiv = document.createElement("div");
      pokemonDiv.classList.add("pokemon-item");

      const img = document.createElement("img");
      img.src = pokemonUrl;
      img.alt = pokemonName;

      const name = document.createElement("p");
      name.textContent = pokemonName;

      pokemonDiv.appendChild(img);
      pokemonDiv.appendChild(name);

      gridContainer.appendChild(pokemonDiv);
    });
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
  }
}

fetchPokemon();

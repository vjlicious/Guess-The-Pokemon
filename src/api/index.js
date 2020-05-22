import axios from "axios";

export async function loadPokedata() {
  let result;
  await axios
    .get("https://pokeapi.co/api/v2/pokemon/?limit=792")
    .then((res) => (result = res.data));
  //   console.log("in api", result);
  return result;
}
export const indiPoke = async (pokemon) => {
  let result2;
  // console.log("in indiURL", pokemon.url);
  await axios
    .get(pokemon.url)
    .then((res) => {
      result2 = res.data.sprites.front_shiny;
    })
    .then();

  return result2;
};

export function getPokemon({ url }) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });
}

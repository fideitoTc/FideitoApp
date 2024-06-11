import { API_HOST, API_KEY, LANG, BASE_PATH_IMG } from "./config.js";

let page = 1;
const loadMoreBtn = document.getElementById("loadMoreBtn");

function redirectToMovieDetails(movieId) {
  const movieDetailsUrl = `./movie-details.html?id=${movieId}`;

  // Redirigir a la página de detalles de la película
  window.location.href = movieDetailsUrl;
}

function makeCard(movies) {
  const { id, poster_path, title } = movies;
  const cardsContainer = document.querySelector(".cards-container");

  const cardContainer = document.createElement("div");
  cardContainer.className =
    "max-w-md mx-auto overflow-hidden rounded-lg shadow-lg";

  // Crear la imagen de la película
  const moviesImage = document.createElement("img");
  moviesImage.className = "object-cover w-full h-50 cursor-pointer";
  moviesImage.src = `${BASE_PATH_IMG}/w600_and_h900_bestv2${poster_path}`;
  moviesImage.alt = "Imagen de la película";

  // Agregar evento de clic a la imagen
  moviesImage.addEventListener("click", () => {
    redirectToMovieDetails(id);
  });

  // Titulo de la imagen
  const movieTitle = document.createElement("span");
  movieTitle.textContent = `${title}`;

  // Añadir la imagen al contenedor de la tarjeta
  cardContainer.appendChild(moviesImage);
  //   cardContainer.appendChild(movieTitle);

  // Añadir la tarjeta al contenedor de tarjetas
  cardsContainer.appendChild(cardContainer);
}

async function getNewsMoviesApi(page = 1) {
  const url = `${API_HOST}/movie/now_playing?api_key=${API_KEY}&language=${LANG}&page=${page}`;

  try {
    const response = await fetch(url);
    const { results } = await response.json();

    for (let i = 0; i < results.length; i++) {
      makeCard(results[i]);
    }
  } catch (error) {
    console.log(error);
  }
}

function loadMoreMovies() {
  page++;
  getNewsMoviesApi(page);
}

// Asocia el controlador de eventos al botón "Cargar más"
loadMoreBtn.addEventListener("click", loadMoreMovies);

getNewsMoviesApi();

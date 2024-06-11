import { API_HOST, API_KEY, LANG, BASE_PATH_IMG } from "./config.js";

// Extraer el ID de la película de la URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

// Verificar si el ID está presente en la URL
if (movieId) {
  // Llamar a la función getMovieIdApi con el ID de la película
  getMovieIdApi(movieId);
  getVideoMovieApi(movieId);
} else {
  console.log("ID de película no encontrado en la URL.");
}

function makeCard(movies) {
  const { id, overview, poster_path, title, runtime, genres, release_date } =
    movies;
  const cardsContainer = document.querySelector(".cards-container");

  const imageContainer = document.createElement("div");
  imageContainer.className = "w-100";

  const moviesImage = document.createElement("img");
  moviesImage.className = "object-cover w-full rounded-lg shadow-lg";
  moviesImage.src = `${BASE_PATH_IMG}/w500${poster_path}`;
  moviesImage.alt = "Imagen de la película";

  const movieContainer = document.createElement("div");
  movieContainer.className = "w-full pl-8";

  const movieTitle = document.createElement("h1");
  movieTitle.textContent = `${title}`;
  movieTitle.className = "text-3xl font-bold mb-4";

  const movieDescription = document.createElement("p");
  movieDescription.textContent = `${overview}`;
  movieDescription.className = "text-gray-400 mb-4";

  const movieEtiqueta = document.createElement("div");
  movieEtiqueta.className = "mb-4";

  const movieDuration = document.createElement("span");
  movieDuration.textContent = `Duracion: ${runtime}`;
  movieDuration.className = "flex items-center text-gray-400";

  const movieGenero = document.createElement("span");
  movieGenero.textContent = `Genero: ${genres[0].name}`;
  movieGenero.className = "flex items-center text-gray-400";

  const movieEstreno = document.createElement("span");
  movieEstreno.textContent = `Fecha de estreno: ${release_date}`;
  movieEstreno.className = "flex items-center text-gray-400";

  imageContainer.appendChild(moviesImage);

  movieContainer.appendChild(movieTitle);
  movieContainer.appendChild(movieDescription);
  movieContainer.appendChild(movieEtiqueta);
  //   movieContainer.appendChild(movieTrailer);

  movieEtiqueta.appendChild(movieDuration);
  movieEtiqueta.appendChild(movieGenero);
  movieEtiqueta.appendChild(movieEstreno);

  // Añadir contenido
  cardsContainer.appendChild(imageContainer);
  cardsContainer.appendChild(movieContainer);
}

function makeVideo(video) {
  const id = video;

  // Crear el elemento iframe
  const iframe = document.createElement("iframe");
  iframe.className = "absolute top-0 left-0 w-full h-full";
  iframe.src = `https://www.youtube.com/embed/${id}?controls=0&showinfo=0`;
  iframe.title = "Video de YouTube";
  iframe.frameborder = "0";
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowfullscreen = true;

  // Obtener el contenedor y agregar el iframe
  const videoContainer = document.getElementById("videoContainer");
  videoContainer.appendChild(iframe);
}

async function getMovieIdApi(movieId) {
  const url = `${API_HOST}/movie/${movieId}?api_key=${API_KEY}&language=${LANG}`;

  try {
    const response = await fetch(url);
    const result = await response.json();

    makeCard(result);
  } catch (error) {
    console.log(error);
  }
}

async function getVideoMovieApi(idMovie) {
  const url = `${API_HOST}/movie/${idMovie}/videos?api_key=${API_KEY}&language=${LANG}`;

  try {
    const response = await fetch(url);
    const { results } = await response.json();

    let idVideo = null;

    for (let i = 0; i < results.length; i++) {
      const video = results[i];
      if (video.site === "YouTube" && !idVideo) {
        idVideo = video.key;
        makeVideo(idVideo);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

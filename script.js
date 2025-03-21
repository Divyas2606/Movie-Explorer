const API_KEY = "thewdb";  // Free key, no signup needed
const BASE_URL = "https://www.omdbapi.com/";

async function searchMovies() {
    const query = document.getElementById("searchInput").value.trim();

    if (query === "") {
        alert("Please enter a movie name!");
        return;
    }

    const url = `${BASE_URL}?s=${encodeURIComponent(query)}&apikey=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Search) {
            displayMovies(data.Search);
        } else {
            document.getElementById("moviesContainer").innerHTML = "<p>No movies found.</p>";
        }

    } catch (error) {
        console.error("Error fetching movies:", error);
        document.getElementById("moviesContainer").innerHTML = "<p>Failed to load movies. Try again!</p>";
    }
}

function displayMovies(movies) {
    const container = document.getElementById("moviesContainer");
    container.innerHTML = "";  // Clear previous results

    movies.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");

        movieElement.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h2>${movie.Title} (${movie.Year})</h2>
        `;

        container.appendChild(movieElement);
    });
}

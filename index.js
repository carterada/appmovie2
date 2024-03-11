const apiKey = ' d22ba237';
const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&`;
 
async function searchMovies(searchTerm) {
    try {
        const response = await fetch(apiUrl + 's=' + searchTerm);
        const data = await response.json();
 
        if (data.Response === 'True') {
            return data.Search;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}
 
// Fonction pour afficher les films
function displayMovies(movies) {
    moviesContainer.innerHTML = '';
 
    if (movies.length > 0) {
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
 
            const titleElement = document.createElement('h2');
            titleElement.textContent = movie.Title;
            movieElement.appendChild(titleElement);
 
            if (movie.Poster !== 'N/A') {
                const posterElement = document.createElement('img');
                posterElement.src = movie.Poster;
                movieElement.appendChild(posterElement);
            }
 
            const yearElement = document.createElement('p');
            yearElement.textContent = 'Released: ' + movie.Year;
            movieElement.appendChild(yearElement);
 
            moviesContainer.appendChild(movieElement);
        });
    } else {
        moviesContainer.innerHTML = 'No movies found';
    }
}
 
// Continuation du script.js
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const moviesContainer = document.getElementById('moviesContainer');
const favoritesContainer = document.getElementById('favoritesContainer');
 
searchButton.addEventListener('click', async () => {
    const searchTerm = searchInput.value;
    const movies = await searchMovies(searchTerm);
    displayMovies(movies);
});
 
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
 
function toggleFavorite(movie) {
    const index = favorites.findIndex(fav => fav.id === movie.id);
    if (index !== -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(movie);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
}
 
function displayFavorites() {
    favoritesContainer.innerHTML = '';
    favorites.forEach(favorite => {
        const favElement = document.createElement('div');
        favElement.textContent = favorite.title;
        favoritesContainer.appendChild(favElement);
    });
}
 
displayFavorites();
const OMDB_API_KEY = "612c3338";
const API_KEY = '772550390f45ddb8fbac999e8b90ad9e';

const loadMoviesDataOMDb = async (imdb_id) => {
    return fetch(`http://www.omdbapi.com/?i=${imdb_id}&apikey=${OMDB_API_KEY}`)
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(myJson => { return myJson });
}

const loadMoviesData = async (type, query, page) => {
    if (type === "popular" || query === "") {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`;
        return fetch(url)
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(myJson => { return myJson.results });
    } else if (type === "search") {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`;
        return fetch(url)
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(myJson => { return myJson.results });
    } else if (type === "recommended") {
        const url = `https://api.themoviedb.org/3/movie/${query}/recommendations?api_key=${API_KEY}&page=${page}`;
        return fetch(url)
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(myJson => { return myJson.results });
    } else if (type === "movie") {
        const url = `https://api.themoviedb.org/3/movie/${query}?api_key=${API_KEY}&language=en-US`;
        return fetch(url)
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(myJson => { return myJson });
    } else if (type === "movie similar") {
        const url = `https://api.themoviedb.org/3/movie/${query}/similar?api_key=${API_KEY}&language=en-US&page${page}`;
        return fetch(url)
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(myJson => { return myJson.results });
    } else if (type === "movie video") {
        const url = `https://api.themoviedb.org/3/movie/${query}/videos?api_key=${API_KEY}&language=en-US`;
        return fetch(url)
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(myJson => { return myJson.results });
    } else if (type === "movie reviews") {
        const url = `https://api.themoviedb.org/3/movie/${query}/reviews?api_key=${API_KEY}&language=en-US`;
        return fetch(url)
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(myJson => { return myJson.results });
    }
}

const loadSessionData = async () => {
    const url = `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${API_KEY}`;
    return fetch(url)
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(myJson => { return myJson.guest_session_id });
}

class MovieService {
    static getPopularMovies = async (query = "", page = 1) => {
        try {
            var res = await loadMoviesData("popular", query, page);
            console.log("popular: ", res);
            return res;
        } catch (err) {
            console.log(err);
        }
    }

    static getSearchMovies = async (query, page = 1) => {
        try {
            var res = await loadMoviesData("search", query, page);
            console.log("search: ", res);
            return res;
        } catch (err) {
            console.log(err);
        }
    }

    static getRecommendedMovies = async (query, page = 1) => {
        try {
            var res = await loadMoviesData("recommended", query, page);
            return res;
        } catch (err) {
            console.log(err);
        }
    }

    static getSingleMovie = async (movie_id) => {
        try {
            var res = await loadMoviesData("movie", movie_id, "nopage");
            return res;
        } catch (err) {
            console.log(err);
        }
    }

    static getSingleMovieOMDb = async (imdb_id) => {
        try {
            var res = await loadMoviesDataOMDb(imdb_id);
            return res;
        } catch (err) {
            console.log(err);
        }
    }

    static getSimilarMovies = async (movie_id, page = 1) => {
        try {
            var res = await loadMoviesData("movie similar", movie_id, page);
            return res;
        } catch (err) {
            console.log(err);
        }
    }

    static getMovieVideos = async (movie_id) => {
        try {
            var res = await loadMoviesData("movie video", movie_id, "nopage");
            return res;
        } catch (err) {
            console.log(err);
        }

    }

    static getMovieReviews = async (movie_id) => {
        try {
            var res = await loadMoviesData("movie reviews", movie_id, "nopage");
            return res;
        } catch (err) {
            console.log(err);
        }
    }

    static getSessionId = async () => {
        try {
            var res = await loadSessionData();
            return res;
        } catch (err) {
            console.log(err);
        }
    }

    static postRating = async (rating, movie_id, guest_session_id) => {
        try {
            var data = JSON.stringify({
                "value": rating
            });
            const url = `https://api.themoviedb.org/3/movie/${movie_id}/rating?guest_session_id=${guest_session_id}&api_key=${API_KEY}`;
            return fetch(url, {
                method: 'post',
                body: data,
                headers: {
                    'Content-Type': 'application/json'
                },
            })  
                .then(response => response.json())
                .catch(error => console.error('Error:', error))
                .then(data => {console.log(data);});
        } catch (err) {
            console.log(err);
        }
    }
}

export default MovieService;

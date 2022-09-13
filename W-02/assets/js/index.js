const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = "d7dc23509dd748e9f87cbfa08fe60eae";
const imageBaseUrl = "https://image.tmdb.org/t/p/original";

const FetchMovie = (movieId) => {
    const Movie = fetch(apiBaseUrl + "/movie" + "/" + movieId + "?api_key=" + apiKey + "&language=tr")
        .then((response) => response.json())
        .then((movie) => {
            try {
                return movie;
            }
            catch (err) {
                alert(err);
            }
        });

    return Movie;
}

const GetMovie = async (movieId) => {
    const Movie = await FetchMovie(movieId);
    return Movie;
}

const FetchPopularMovies = fetch(apiBaseUrl + "/movie/popular?api_key=" + apiKey)
    .then((response) => response.json())
    .then((movies) => {
        try {
            return movies.results.slice(0, 4);
        }
        catch (err) {
            alert(err);
        }
    });

const GetPopularMovies = async () => {
    const popularFilmList = await FetchPopularMovies;
    return popularFilmList;
}

const FectTrendingMovies = fetch(apiBaseUrl + "/trending/movie/week?api_key=" + apiKey)
    .then((response) => response.json())
    .then((movies) => {
        try {
            return movies.results.slice(0, 4);
        }
        catch (err) {
            alert(err);
        }
    });

const GetTrendingMovies = async () => {
    const trendingMovieList = await FectTrendingMovies;
    return trendingMovieList;
}

const FetchCastActors = (movieId) => {
    const castActors = fetch(apiBaseUrl + "/movie" + "/" + movieId + "/credits?api_key=" + apiKey)
        .then((response) => response.json())
        .then((actors) => {
            try {
                return actors.cast.slice(0,13);
            }
            catch (err) {
                alert(err);
            }
        });

    return castActors;
}

const GetCastActors = async (movieId) => {
    const castActors = await FetchCastActors(movieId);
    return castActors;
}

const RenderPopularMovieList = () => {
    GetPopularMovies().then(movies => {
        movies.forEach(movie => {
            
            GetMovie(movie.id).then(movies => {
                document.getElementById("popular-films").innerHTML += `
                    <article class="popular-film">
                        <figure>
                            <a href="detail-movie.html?id=${movie.id}-${movies.title.toLowerCase().replace(/[ş]/g,"s").replace(/[ö]/g,"o").replace(/[ü]/g, "u").replace(/[ç]/g, "c").split(" ").join("-")}">
                                <img src="${imageBaseUrl + movies.poster_path}" loading="lazy" alt="${movies.title}">
                                <img src="${imageBaseUrl + movies.poster_path}" loading="lazy" alt="${movies.title}" class="img-filter">
                            </a>
                        </figure>

                        <div class="description">
                            <figcaption>
                                <a href="detail-movie.html?id=${movie.id}-${movies.title.toLowerCase().replace(/[ş]/g,"s").replace(/[ö]/g,"o").replace(/[ü]/g, "u").replace(/[ç]/g, "c").split(" ").join("-")}">${movies.title}</a>
                            </figcaption>
                            <div class="rating">
                                <span>${movies.vote_average.toFixed(1)}/10 IMDb</span>
                            </div>
                            <div class="genres">${RenderPopularMovieGenres(movies.genres)}</div>
                            <time>
                                <span>${AdditionToRuntimeContent(movies.runtime)}</span>
                            </time>
                        </div>
                    </article>`
            })
        });
    });
}

const RenderTrendingMovieList = () => {
    GetTrendingMovies().then(movies => {
        movies.forEach(movie => {
            
            GetMovie(movie.id).then(movies => {
                document.getElementById("trend-films").innerHTML += `
                    <article class="trend-film">
                        <figure>
                            <a href="detail-movie.html?id=${movie.id}-${movies.title.toLowerCase().replace(/[ş]/g,"s").replace(/[ö]/g,"o").replace(/[ü]/g, "u").replace(/[ç]/g, "c").split(" ").join("-")}">
                                <img src="${imageBaseUrl + movies.poster_path}" loading="lazy" alt="${movies.title}">
                                <img src="${imageBaseUrl + movies.poster_path}" loading="lazy" alt="${movies.title}" class="img-filter">
                            </a>
                        </figure>

                        <div class="description">
                            <figcaption>
                                <a href="detail-movie.html?id=${movie.id}-${movies.title.toLowerCase().replace(/[ş]/g,"s").replace(/[ö]/g,"o").replace(/[ü]/g, "u").replace(/[ç]/g, "c").split(" ").join("-")}">${movies.title}</a>
                            </figcaption>
                            <div class="rating">
                                <span>${movies.vote_average.toFixed(1)}/10 IMDb</span>
                            </div>
                            <div class="genres">${RenderPopularMovieGenres(movies.genres)}</div>
                            <time>
                                <span>${AdditionToRuntimeContent(movies.runtime)}</span>
                            </time>
                        </div>
                    </article>`
            })
        });
    });
}

const AdditionToRuntimeContent = (runtime) => {
   let result;
   let strRuntime = runtime.toString();

    if(strRuntime.length === 3){
        result = strRuntime.slice(0,1) + "s " + strRuntime.slice(1) + "dk";
    }
    else {
        result = strRuntime + "dk";
    }
    return result;
}

const RenderPopularMovieGenres = (genres) => {

    let popularMovieGenres = "";

    genres.forEach(genre => {
        popularMovieGenres += `<span class="genre">${genre.name}</span>`
    })

    return popularMovieGenres;
}

const RenderMovieSpokenLanguages = (languages) => {

    let movieLanguage = "";

    languages.forEach(language => {
        movieLanguage += `<dd class="language">${language.english_name}</dd>`
    })

    return movieLanguage;
}

const RenderDetailMovie = () => {
    let movieId = Number(location.href.split("=")[1].split("-")[0]);

    GetMovie(movieId).then(movie => {
        document.getElementById("container-movie").style.backgroundImage = `url(${imageBaseUrl + movie.backdrop_path})`;

        document.getElementById("page-title").innerText += movie.title;

        document.getElementById("icon-bookmark").setAttribute("onclick", `AddToFavoriteMoviesList(${movie.id})`)

        document.getElementById("movie-title").innerText = movie.title;

        document.getElementById("rating").innerHTML = `<span>${movie.vote_average.toFixed(1)}/10 IMDb</span>`;

        document.getElementById("genres").innerHTML += RenderPopularMovieGenres(movie.genres);

        document.getElementById("runtime").innerText = AdditionToRuntimeContent(movie.runtime);

        document.getElementById("languages").innerHTML += RenderMovieSpokenLanguages(movie.spoken_languages);

        document.getElementById("overview").innerText = movie.overview;

        GetCastActors(movieId).then(actors => {
            actors.forEach(actor => {
                document.getElementById("cats-actors").innerHTML += `

                <figure class="cast-actor">
                    <img src="${(actor.profile_path ? imageBaseUrl + actor.profile_path : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg")}" loading="lazy" alt="${actor.name}">
                    <figcaption>${actor.name}</figcaption>
                </figure>
                
                `;
            })
        })

    })
}

const RenderFavoriteMovies = () => {

    if(ValidateIsEmptyStored()){
        return;
    }
    document.getElementById("favorite-films").innerHTML = ""
    JSON.parse(localStorage.getItem('movie')).forEach((movie, index) => {
        document.getElementById("favorite-films").innerHTML += `
                    <article class="favorite-film" id="${movie.id}">
                        <figure>
                            <a href="detail-movie.html?id=${movie.id}-${movie.title.toLowerCase().replace(/[ş]/g,"s").replace(/[ö]/g,"o").replace(/[ü]/g, "u").replace(/[ç]/g, "c").split(" ").join("-")}" style='background-image: url("${imageBaseUrl + movie.poster_path}")'>
                            </a>
                        </figure>

                        <div class="description">
                            <figcaption>
                                <a href="detail-movie.html?id=${movie.id}-${movie.title.toLowerCase().replace(/[ş]/g,"s").replace(/[ö]/g,"o").replace(/[ü]/g, "u").replace(/[ç]/g, "c").split(" ").join("-")}">${movie.title}</a>
                            </figcaption>
                            <div class="rating">
                                <span>${movie.vote_average.toFixed(1)}/10 IMDb</span>
                            </div>
                            <div class="genres">${RenderPopularMovieGenres(movie.genres)}</div>
                            <time>
                                <span>${AdditionToRuntimeContent(movie.runtime)}</span>
                            </time>
                        </div>

                        <a class="see-more" id="remove-item" onclick="RemoveMovieItem(${index}, ${movie.id});">Sil</a>

                    </article>`
    })
}

const AddToFavoriteMoviesList = (movieId) => {

    if(ValidateIsThereMovie(movieId)){
        alert("Listede Var!");
        return;
    }

    GetMovie(movieId).then(movie => {

        let FavoriteMoviesList = {
            id: movie.id,
            poster_path: movie.poster_path,
            title: movie.title,
            vote_average: movie.vote_average,
            genres: movie.genres,
            runtime: movie.runtime
        }

        const storedList = JSON.parse(localStorage.getItem('movie')) || [];
        storedList.push(FavoriteMoviesList);
        localStorage.setItem('movie', JSON.stringify(storedList));

        alert(movie.title + " Favorilere Eklendi!");
    })
}

const ValidateIsThereMovie = (movieId) => {

    let result = false;

    if(ValidateIsEmptyStored()){
        return;
    }

    JSON.parse(localStorage.getItem('movie')).forEach(movie => {
        if(movieId === movie.id){
            result = true;
        }
    })
    return result;
}

const ValidateIsEmptyStored = () => {
    let result = false;

    if(!JSON.parse(localStorage.getItem('movie'))){
        result = true;
    }
    return result;
}

const RemoveMovieItem = (movieId) => {

    const storedList = JSON.parse(localStorage.getItem('movie')) || [];

     let findMovie = storedList.filter((movie) => {
       if(movie.id !== movieId){
          return movie;
       }
    })

    localStorage.setItem('movie', JSON.stringify(findMovie));
    document.getElementById(movieId).remove();
}

const RemoveAllFavoriteMovie = () => {
    localStorage.clear();
    document.getElementById("favorite-films").innerHTML = "";
}
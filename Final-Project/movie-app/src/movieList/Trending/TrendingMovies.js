import { useTrendingAPI } from "../../context/APITrendingContext";
// import { imageBaseUrl } from "../../APIUrl";
import { Outlet, Link } from 'react-router-dom';
import Genres from "../../components/Genres";
import RunTime from "../../components/RunTime";

function TrendMovies(){
    const { trendMovie } = useTrendingAPI();
    return(
        <>
            {
                trendMovie.map(movie => (
                    <article className="trend-film" key={movie.id}>
                        <figure>
                            <Link to={`movie/trend/`+ movie.id}>
                                <img src={process.env.React_App_ImageBaseUrl + movie.poster_path} alt={movie.title} />
                            </Link>
                        </figure>
                        <div className="description">
                            <figcaption>
                                <Link to={`movie/trend/`+ movie.id}>{movie.title}</Link>
                            </figcaption>
                            <div className="rating">
                                <span>{movie.vote_average}/10 IMDb</span>
                            </div>
                            <div className="genres">
                                <Genres movieId={movie.id}/>
                            </div>
                            <RunTime movieId={movie.id}/>
                        </div>
                    </article>
                ))
            }
            <Outlet/>
        </>
    );
}

export default TrendMovies;
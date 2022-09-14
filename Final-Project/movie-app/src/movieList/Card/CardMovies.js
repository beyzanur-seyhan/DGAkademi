import { Link } from 'react-router-dom';
import { CardContext } from "../../context/CardContext";
import { useContext } from "react";
// import { imageBaseUrl } from '../../APIUrl';
import Genres from '../../components/Genres';
import RunTime from '../../components/RunTime';

function CardMovies({cardCount}) {
    const {setCount} = useContext(CardContext);
    const RemoveItemFromCard = (index) => {
        
        const storedList = JSON.parse(localStorage.getItem('movie')) || [];
        storedList.splice(index, 1);
        localStorage.setItem('movie', JSON.stringify(storedList));

        setCount(JSON.parse(localStorage.getItem('movie')));
    }
    return (
        <>
            {
               cardCount &&
                cardCount.map((movie, index) => (
                        <article className="card" key={movie.id}>
                            <figure>
                                <Link to={`/movie/` + movie.id} style={{ backgroundImage: `url(${process.env.React_App_ImageBaseUrl + movie.poster_path})` }} />
                            </figure>
                            <div className="description">
                                <figcaption>
                                    <Link to={`/movie/` + movie.id}>{movie.title}</Link>
                                </figcaption>
                                <div className="rating">
                                    <span>{movie.vote_average}/10 IMDb</span>
                                </div>
                                <div className="genres">
                                    <Genres movieId={movie.id} />
                                </div>
                                <RunTime movieId={movie.id} />
                            </div>
                            <span className='btn-outline-gray remove-item' onClick={() => RemoveItemFromCard(index)}>Sil</span>
                        </article>
                    ))
            }
        </>
    );
}

export default CardMovies;
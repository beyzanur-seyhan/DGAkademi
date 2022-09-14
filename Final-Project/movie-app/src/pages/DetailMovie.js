import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CardContext } from "../context/CardContext";
import axios from "axios";
import playBtn from "../assets/img/icons/play-btn-icon.svg";
import Genres from "../components/Genres";
import RunTime from "../components/RunTime";
import Cast from "../components/Cast";
import "../assets/css/detail-movie.css";
import BuyNowMovie from "./BuyNow";

function DetailMovie() {
    const { id } = useParams();
    const { setCount } = useContext(CardContext);
    const [movie, setMovie] = useState([]);
    const [display, setDisplay] = useState("msg-box-hide");
    
    const AddItemToStorage = () => {
        if(ValidateIsThereMovie()){
            alert("Sepette Mevcut!");
            return;
        }

        const cardItem = {
            id: movie.id,
            poster_path: movie.poster_path,
            title: movie.title,
            vote_average: movie.vote_average,
            genres: movie.genres,
            runtime: movie.runtime  
        };
        
        const storedList = JSON.parse(localStorage.getItem('movie')) || [];
        storedList.push(cardItem);
        localStorage.setItem('movie', JSON.stringify(storedList));
        setCount(JSON.parse(localStorage.getItem('movie')))

        if(document.getElementsByClassName("add-to-cart-active")[0]){
            document.getElementsByClassName("add-to-cart-active")[0].classList.replace("d-none",undefined);
        }

        document.getElementsByClassName("add-to-cart")[0].className += " d-none"
        alert(movie.title + " Sepete Eklendi!");
    }

    const ValidateIsThereMovie = () => {

        let result = false;
    
        if(ValidateIsEmptyStored()){
            return;
        }
    
        JSON.parse(localStorage.getItem('movie')).forEach(Movie => {
            if(movie.id === Movie.id){
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

    const OpenPaymentPage = () => {
       setDisplay("open");
    }

    useEffect(() => {
        async function fetchData() {
            const { data } = await axios.get(`${process.env.React_App_ApiBaseUrl}/movie/${id}?api_key=${process.env.React_App_ApiKey}&language=tr`);
            setMovie(data);
        }
        fetchData();
    }, [id]);

    if (!document.getElementById("root")) {
        console.log("null");
    }
    else {
        document.getElementById("root").classList.add("container-movie");
        document.getElementById("root").style.backgroundImage = `url(${movie.backdrop_path && process.env.React_App_ImageBaseUrl + movie.backdrop_path})`;
    }
    return (
        <>
            <div className={`buy-now ` + display}>
                <BuyNowMovie setDisplay={setDisplay}/>
            </div>

            <div className="play-video">
                <figure className="icon icon-play-btn">
                    <img src={playBtn} alt="Play Button Icon" />
                </figure>
                <figcaption>Fragmanı Oynat</figcaption>
            </div>
            <main>
                <section className="content">
                        <header>
                        <div className="movie-info">
                            <h1 id="movie-title">{movie.title}</h1>
                            <div className="rating" id="rating">
                                <span>{Number(movie.vote_average).toFixed(1)}/10 IMDb</span>
                            </div>
                        </div>
                        <span className={!ValidateIsThereMovie() ? "btn-outline-gray add-to-cart" : "btn-outline-gray add-to-cart d-none"} onClick={AddItemToStorage}>Sepete Ekle</span>
                        
                        <span className={ValidateIsThereMovie() ? "btn-outline-gray add-to-cart-active" : "btn-outline-gray add-to-cart-active d-none"}onClick={OpenPaymentPage}>Satın Al</span>

                    </header>
                    <div className="genres">
                        <Genres movieId={movie.id}/>
                    </div>
                    <div className="facts">
                        <dl>
                            <dt>Süre</dt>
                            <dd>
                                <RunTime movieId={movie.id}/>
                            </dd>
                        </dl>
                        <dl>
                        <dt>Dil</dt>
                            {movie.spoken_languages && movie.spoken_languages.map((language, index) => <dd key={index}>{language.english_name}</dd>)}
                        </dl>
                        <dl>
                            <dt>Değerlendirme</dt>
                            <dd>PG-13</dd>
                        </dl>
                    </div>
                    <div className="overview">
                        <header className="title">
                            <h2>Açıklama</h2>
                        </header>
                        <p className="overview-content">
                            {movie.overview}
                        </p>
                    </div>
                    <div className="cast">
                    <header className="title">
                        <h2>Cast</h2>
                        <span className="btn-outline-gray">Devamı</span>
                    </header>
                    <Cast/>
                    </div>
                </section>
            </main>
        </>
    );
}

export default DetailMovie;
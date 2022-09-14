// import { apiBaseUrl, apiKey } from "../APIUrl";
import { useEffect, useState } from "react";
import axios from "axios";

function Genres({ movieId }) {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        async function fetchData() {
           if(movieId){
            const { data } = await axios.get(`${process.env.React_App_ApiBaseUrl}/movie/${movieId}?api_key=${process.env.React_App_ApiKey}&language=tr`);
            setGenres(data.genres);
           }
        }
        fetchData();
    }, [movieId]);

    return (
        <>
            {
                genres.map(genre => (<span className="genre" key={genre.id}>{genre.name}</span>))
            }
        </>
    );
}

export default Genres;
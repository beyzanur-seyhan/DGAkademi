import { apiBaseUrl, apiKey } from "../APIUrl";
import { useEffect, useState } from "react";
import axios from "axios";

function Genres({ movieId }) {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        async function fetchData() {
           if(movieId){
            const { data } = await axios.get(`${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}&language=tr`);
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
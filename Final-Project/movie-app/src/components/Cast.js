// import { apiBaseUrl, apiKey, imageBaseUrl } from "../APIUrl";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

function Cast(){
    const { id } = useParams();
    const [actors, setActors] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const { data } = await axios.get(`${process.env.React_App_ApiBaseUrl}/movie/${id}/credits?api_key=${process.env.React_App_ApiKey}&language=tr`);
            setActors(data.cast.slice(0,13));
        }
        fetchData();
    }, [actors.length]);

    return(
        <>
            { actors.length === 0 && <div>Yükleniyor...</div> }

            { actors.length > 0 && <div className="cast-actors">{actors.map(actor => (
                <figure className="cast-actor" key={actor.id}>
                    <img src={actor.profile_path ? process.env.React_App_ImageBaseUrl + actor.profile_path : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"} alt={actor.name} loading="lazy" />
                    <figcaption>{actor.name}</figcaption>
                </figure>
            ))}</div> }
        </>
    );

}

export default Cast;
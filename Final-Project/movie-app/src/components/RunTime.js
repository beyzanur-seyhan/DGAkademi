import { apiBaseUrl, apiKey } from "../APIUrl";
import { useEffect, useState } from "react";
import axios from "axios";

function RunTime({ movieId }) {
    const [runTime, setRunTime] = useState();

    useEffect(() => {
        async function fetchData() {
           if(movieId){
            const { data } = await axios.get(`${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}&language=tr`);
            setRunTime(data.runtime);
           }
        }
        fetchData();
    }, [movieId]);

    const AdditionToRuntimeContent = () => {
        let result;
        let strRuntime = runTime.toString();
     
         if(strRuntime.length === 3){
             result = strRuntime.slice(0,1) + "s " + strRuntime.slice(1) + "dk";
         }
         else {
             result = strRuntime + "dk";
         }
         return result;
     }

    return (
        <time>
            <span>{runTime && AdditionToRuntimeContent()}</span>
        </time>
    );
}

export default RunTime;
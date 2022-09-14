import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const APIPopularContext = createContext();

export default function APIContextProvider({children}) {
    
    const [popularMovie, setPopularMovie] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            const {data} = await axios.get(process.env.React_App_ApiBaseUrl + "/movie/popular?api_key=" + process.env.React_App_ApiKey);
            setPopularMovie(data.results.slice(0,4));
        }
        fetchData();
    }, []);

    return (
        <APIPopularContext.Provider value={{popularMovie}}>{children}</APIPopularContext.Provider>
    );
}

export function usePopularAPI() {
    const context = useContext(APIPopularContext);

    if(context === undefined) {
        throw new Error("Context must be used within a Provider");
    }
    return context;
}
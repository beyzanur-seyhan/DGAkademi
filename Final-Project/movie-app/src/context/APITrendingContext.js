import { apiBaseUrl, apiKey } from "../APIUrl";
import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const APITrendingContext = createContext();

export default function APIContextProvider({children}) {
    
    const [trendMovie, setTrendingMovie] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            const {data} = await axios.get(apiBaseUrl + "/trending/movie/week?api_key=" + apiKey);
            setTrendingMovie(data.results.slice(0,4));
        }
        fetchData();
    }, []);

    return (
        <APITrendingContext.Provider value={{trendMovie}}>{children}</APITrendingContext.Provider>
    );
}

export function useTrendingAPI() {
    const context = useContext(APITrendingContext);

    if(context === undefined) {
        throw new Error("Context must be used within a Provider");
    }
    return context;
}
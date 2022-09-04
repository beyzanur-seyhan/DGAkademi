import { createContext, useState } from "react";

export const CardContext = createContext();

export const CardProvider = ({children}) => {
    const [cardCount, setCount] = useState(JSON.parse(localStorage.getItem('movie')) && JSON.parse(localStorage.getItem('movie')));

    const values = {cardCount, setCount}

    return <CardContext.Provider value={values}>{children}</CardContext.Provider>
}
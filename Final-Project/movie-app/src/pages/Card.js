import {Outlet} from 'react-router-dom';
import { CardContext } from "../context/CardContext";
import { useContext } from "react";
import CardMovies from '../movieList/Card/CardMovies';

function Card(){
    const {cardCount, setCount} = useContext(CardContext);

    const RemoveAllMovie = () => {
        localStorage.clear();
        setCount();
    }

    if(!document.getElementById("root")){
        console.log("null");
     }
     else{
         document.getElementById("root").classList.remove("container-movie");
         
         document.getElementById("root").removeAttribute("style");
     }
     
    return(
        <main className='main-card'>
            <section className="content">
                    <header className="title">
                        <h1>Sepettekiler</h1>
                        <span className="btn-outline-gray">Devamı</span>
                        <span className="btn-outline-gray remove-all" onClick={RemoveAllMovie}>Hepsini Temizle</span>
                    </header>
                   <article>
                        <CardMovies cardCount={cardCount}/>
                   </article>
            </section>
            <Outlet/>
        </main>
    );
}

export default Card;
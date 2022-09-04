import { Outlet, Link } from 'react-router-dom';
import { CardContext } from "../context/CardContext";
import { useContext } from "react";
import PopularContextProvider from "../context/APIPopularContext";
import TrendContextProvider from "../context/APITrendingContext";
import PopularMovies from "../movieList/Popular/PopularMovies";
import TrendMovies from "../movieList/Trending/TrendingMovies"; 
import CardMovies from "../movieList/Card/CardMovies";

function Home() {
    const {cardCount} = useContext(CardContext);

    if(!document.getElementById("root")){
       console.log("null");
    }
    else{
        document.getElementById("root").classList.remove("container-movie");
        
        document.getElementById("root").removeAttribute("style");
    }
    return (
        <>
            <main>
                <section className="content">
                    <section className="popular-films">
                        <header className="title">
                            <h1>Popüler</h1>
                            <span className="btn-outline-gray">Devamı</span>
                        </header>
                        <article className='popular-films-content'>
                            <PopularContextProvider>
                                <PopularMovies />
                            </PopularContextProvider>
                        </article>
                    </section>
                    <section className="trend-films">
                        <header className="title">
                            <h1>Trendler</h1>
                            <span className="btn-outline-gray">Devamı</span>
                        </header>
                        <article className='trend-films-content'>
                            <TrendContextProvider>
                                <TrendMovies />
                            </TrendContextProvider>
                        </article>
                    </section>
                </section>
                <aside className="card-films">
                    <header className="title">
                        <h1>Sepetteki Filmler</h1>
                        {cardCount && cardCount.length > 4 && <Link to="/card" className="btn-outline-gray">Devamı</Link>}
                    </header>
                    <article>
                        <CardMovies cardCount={cardCount && cardCount.slice(0,4)}/>
                    </article>
                <Outlet/>
                </aside>
            </main>
        </>
    );
}

export default Home;
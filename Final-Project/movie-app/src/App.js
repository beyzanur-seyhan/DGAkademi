import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import PopularMovies from './movieList/Popular/PopularMovies';
import DetailMovie from "./pages/DetailMovie";
import Card from './pages/Card';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { CardProvider } from './context/CardContext';

function App() {
  return (
      <div className="container">
        <CardProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Layout/>}>
                <Route path='/' element={<Home/>}>
                    <Route path='popularMovies' element={<PopularMovies/>}/>
                </Route>
                <Route path='movie/popular/:id' element={<DetailMovie/>}></Route>
                <Route path='movie/trend/:id' element={<DetailMovie/>}></Route>
                <Route path='card' element={<Card/>}></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </CardProvider>
      </div>
  );
}

export default App;

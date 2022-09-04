import { useContext } from "react";
import { CardContext } from "../context/CardContext";
import { Outlet, Link, NavLink, useParams } from 'react-router-dom';
import imgMenuIcon from "../assets/img/icons/menu-icon.svg";
import imgNotifIcon from "../assets/img/icons/notif-bold-icon.svg";
import imgHomeActiveIcon from "../assets/img/icons/home-active-icon.svg";
import imgHomeInactiveIcon from "../assets/img/icons/home-inactive-icon.svg";
import imgCardActiveIcon from "../assets/img/icons/shopping-cart-active.svg";
import imgCardInactiveIcon from "../assets/img/icons/shopping-cart-inactive.svg";
import imgBackPageIcon from "../assets/img/icons/back-page-icon.svg";
import imgMenuThreeDotIcon from "../assets/img/icons/menu-three-dot-icon.svg";
import imgDeskCardActiveIcon from "../assets/img/icons/desk-shopping-cart-active.svg";
import imgDeskCardInActiveIcon from "../assets/img/icons/desk-shopping-cart-inactive.svg";
import imgDeskNotifInActiveIcon from "../assets/img/icons/notif-regular-icon.svg";

function Layout() {
    const { id } = useParams();
    const {cardCount} = useContext(CardContext);

    return (
        <>
            <header className='header'>
                <nav>
                    <ul>
                        <li className='icon'>
                            <Link to="/">
                                <img src={!id ? imgMenuIcon : imgBackPageIcon} alt="Nav Icon" />
                            </Link>
                        </li>
                        <li className='logo'>
                            {!id && <Link to="/">Dgcinema</Link>}
                            {id && <Link to="/" className='logo-white desk-nav'>Dgcinema</Link>}
                        </li>
                        <li className='icon'>
                            <img src={!id ? imgNotifIcon : imgMenuThreeDotIcon} alt="Nav Icon" />
                        </li>
                        <li className='icon desk-nav-card-icon'>
                            <NavLink to="/card" style={({ isActive }) => isActive ? { backgroundImage: `url(${imgDeskCardActiveIcon})` } : { backgroundImage: `url(${imgDeskCardInActiveIcon})` }}>
                                <span className='shopping-cart'>{cardCount && cardCount.length > 0 && <span>{cardCount.length}</span>}</span>
                            </NavLink>
                        </li>
                        <li className='icon desk-nav-notif-icon'>
                            <img src={imgDeskNotifInActiveIcon} alt="Notification Icon" />
                        </li>
                        <li className='avatar desk-nav'></li>
                    </ul>
                </nav>
            </header>

            <footer>
                <nav>
                    <ul>
                        <li className='icon'>
                            <NavLink to="/" style={({ isActive }) => isActive ? { backgroundImage: `url(${imgHomeActiveIcon})` } : { backgroundImage: `url(${imgHomeInactiveIcon})` }} />
                        </li>
                        <li className='icon'>
                            <NavLink to="/card" style={({ isActive }) => isActive ? { backgroundImage: `url(${imgCardActiveIcon})` } : { backgroundImage: `url(${imgCardInactiveIcon})` }} >
                                <span className='shopping-cart'>{cardCount && cardCount.length > 0 && cardCount.length}</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </footer>

            <Outlet />
        </>
    );
}

export default Layout;
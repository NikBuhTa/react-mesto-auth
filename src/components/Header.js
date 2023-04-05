import React from "react";
import logo from '../images/logo.svg'
import { Link, useLocation } from "react-router-dom";

function Header({loggedIn, userEmail, onLogout}) {
    const location = useLocation();
    return (
        <header className="header">
            <img src={logo} className="header__image" alt="Лого сайта" />
            <div className="header__info">
                {loggedIn && <>
                    <p className="header__email">{userEmail}</p>
                    <button className="header__button" type='button' onClick={onLogout}>Выйти</button>
                </>}
                {location.pathname === '/sign-in' && <Link to='/sign-up' className='header__link' replace>Зарегистрироваться</Link>}
                {location.pathname === '/sign-up' && <Link to='/sign-in' className='header__link' replace>Войти</Link>}
            </div>
        </header>
    )
}

export default Header;
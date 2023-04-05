import React, { useState } from "react";
import { Navigate } from "react-router-dom";

function Login({loggedIn, onLogin}) {
    const [userData, setUserData] = useState({email: '', password: ''});

    function handleChange(e) {
        const {type, value} = e.target;
        setUserData({...userData, [type] : value});
    }

    function handleLogin(e) {
        e.preventDefault();
        onLogin(userData);
    }

    if (loggedIn) {
        return (<Navigate to='/' />)
    }

    return(
        <div className='auth-page'>
            <form className='auth-page__form' onSubmit={handleLogin}>
                <h2 className='auth-page__title'>
                    Вход
                </h2>
                <label className="auth-page__label">
                    <input className='auth-page__input' type='email' onChange={handleChange} name="authEmail" required placeholder="Email"></input>
                    <span className='auth-page__error'></span>
                </label>
                <label className="auth-page__label">
                    <input className='auth-page__input' type='password' onChange={handleChange} name='authPass' required placeholder="Пароль"></input>
                    <span className='auth-page__error'></span>
                </label>
                <button className="auth-page__button" type="submit">Войти</button>
            </form>
        </div>
    );
}

export default Login;
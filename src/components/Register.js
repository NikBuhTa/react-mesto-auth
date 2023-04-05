import React from "react";
import { Link, NavLink } from "react-router-dom";

function Register({onSubmit}) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');


    function handleEmailInput(e) {
        setEmail(e.target.value);
    }

    function handlePasswordInput(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({
            email: email,
            password: password
        });
    }

    return(
        <div className='auth-page'>
            <form className='auth-page__form' onSubmit={handleSubmit}>
                <h2 className='auth-page__title'>
                    Регистрация
                </h2>
                <label className="auth-page__label">
                    <input className='auth-page__input' value={email} type='email' onChange={handleEmailInput} name="authEmail" required placeholder="Email"></input>
                    <span className='auth-page__error'></span>
                </label>
                <label className="auth-page__label">
                    <input className='auth-page__input' value={password} type='password' onChange={handlePasswordInput} name='authPass' required placeholder="Пароль"></input>
                    <span className='auth-page__error'></span>
                </label>
                <button className="auth-page__button" type="submit">Зарегистрироваться</button>
                <span className='auth-page__text'>Уже зарегистрированы? <Link to='/sign-in' className="auth-page__link">Войти!</Link></span>
            </form>
        </div>
    );
}

export default Register;
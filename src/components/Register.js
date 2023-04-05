import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register({onRegister}) {
    const [userData, setUserData] = useState({email: '', password: ''});

    function handleChange(e) {
        const {type, value} = e.target;
        setUserData({...userData, [type] : value});
    }

    function handleRegister(e) {
        e.preventDefault();
        onRegister(userData);
    }

    return(
        <AuthForm
            text={
                {
                    title: 'Регистрация',
                    button: 'Зарегистрироваться',
                }
            }
            children={
                <span className='auth-page__text'>Уже зарегистрированы? <Link to='/sign-in' className="auth-page__link">Войти!</Link></span>
            }
            onSubmit={handleRegister}
            onChange={handleChange}
            userData={userData}
        />
    );
}

export default Register;
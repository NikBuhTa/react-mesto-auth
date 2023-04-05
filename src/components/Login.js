import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import AuthForm from "./AuthForm";

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
        <AuthForm
            text={
                {
                    title: 'Вход',
                    button: 'Войти',
                }
            }
            children={null}
            onSubmit={handleLogin}
            onChange={handleChange}
            userData={userData}
        />
    );
}

export default Login;
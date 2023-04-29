import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function Login({loggedIn, onLogin}) {

    const { values, handleChange, errors, isValid, resetForm, setValues} = useFormAndValidation({
        email: '', password: '',
    });

    useEffect(() => {
        resetForm();
        setValues({
            email: '', password: '',
        })
    }, []);

    function handleLogin(e) {
        e.preventDefault();
        onLogin(values);
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
            userData={values}
            vldProps={{errors, isValid}}
        />
    );
}

export default Login;
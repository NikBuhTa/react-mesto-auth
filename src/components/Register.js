import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function Register({onRegister}) {
    const { values, handleChange, errors, isValid, resetForm, setValues} = useFormAndValidation({
        email: '', password: '',
    });

    useEffect(() => {
        resetForm();
        setValues({
            email: '', password: '',
        })
    }, []);

    function handleRegister(e) {
        e.preventDefault();
        onRegister(values);
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
            userData={values}
            vldProps={{errors, isValid}}
        />
    );
}

export default Register;
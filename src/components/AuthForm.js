import React from "react";

function AuthForm({text, children, onSubmit, onChange, userData, vldProps}) {

    return(
        <div className='auth-page'>
            <form className='auth-page__form' onSubmit={onSubmit}>
                <h2 className='auth-page__title'>
                    {text.title}
                </h2>
                <label className="auth-page__label">
                    <input className='auth-page__input' type='email' name='email' onChange={onChange} value={userData?.email} required placeholder="Email"></input>
                    <span className='auth-page__error'>{!vldProps.isValid && vldProps.errors.email}</span>
                </label>
                <label className="auth-page__label">
                    <input className='auth-page__input' type='password' name='password' onChange={onChange} value={userData?.password} required placeholder="Пароль"></input>
                    <span className='auth-page__error'>{!vldProps.isValid && vldProps.errors.password}</span>
                </label>
                <button className="auth-page__button" type="submit">{text.button}</button>
                {children}
            </form>
        </div>
    );
}

export default AuthForm;
import React from "react";

function PopupWithForm({title, name, buttonText, isOpen, onClose, children, onSubmit}) {
    return(
        <div className={`popup ${isOpen ? 'popup_open' : ''}`} id={`${name}`}> 
            <div className="popup__button-place">
                <button type="button" className="popup__button" aria-label="закрыть" onClick={onClose}></button>
            </div>
            <div className="popup__container">
                <form onSubmit={onSubmit} className="form" name={`${name}`}>
                    <h2 className="form__title">{title}</h2>
                    {children}
                    <button className="form__button" type="submit">{buttonText}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
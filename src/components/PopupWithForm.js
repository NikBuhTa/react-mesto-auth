import React, { useEffect } from "react";
import {escString} from '../utils/constants.js';

function PopupWithForm({title, name, buttonText, isOpen, onClose, children, onSubmit}) {
    useEffect(() => {
        const handleEscClick = (e) => {
            if (e.key === escString) {
                onClose();
            }
        }
        document.addEventListener('keydown', handleEscClick);
        return() => {
            document.removeEventListener('keydown', handleEscClick);
        }
    }, [isOpen]);

    const handleOverlayClk = (e) => {
            if(e.target === e.currentTarget && isOpen) {
                onClose();
            }
    }

    return(
        <div className={`popup ${isOpen ? 'popup_open' : ''}`} id={`${name}`} onMouseDown={handleOverlayClk}> 
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
import React from "react";

function InfoToolTip({isOpen, onClose, info}) {
    return(
        <div className={`popup ${isOpen ? 'popup_open' : ''}`}> 
            <div className="popup__button-place">
                <button type="button" className="popup__button" aria-label="закрыть" onClick={onClose}></button>
            </div>
            <div className="popup__container popup__container_background_white">
                <div className="popup__pic" style={{backgroundImage: `url(${info.imagePath})`}}></div>
                <p className='popup__text'>{info.text}</p>
            </div>
        </div>
    );
}

export default InfoToolTip;
import React from "react";

function ImagePopup({card, isOpen, onClose}) {

    const handleOverlayClk = (e) => {
        if(e.target === e.currentTarget && isOpen) {
            onClose();
        }
    }

    return(
        <div className={`popup popup_opacity_image ${isOpen ? 'popup_open' : ''}`} id="fullCardImage" onMouseDown={handleOverlayClk}>
            <figure className="popup__image-container">
                <div className="popup__button-image">
                    <button type="button" className="popup__button" aria-label="закрыть" onClick={onClose} ></button>
                </div>
                <img className="popup__image" src={card.link} alt={card.name}/>
                <figcaption className="popup__subtitle">{card.name}</figcaption>
            </figure>
        </div>
    )
}

export default ImagePopup;
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = currentUser._id === card.owner._id;
    const isLiked = card.likes.some(item => item._id === currentUser._id);

    function handleDeleteClick() {
        onCardDelete();
    }

    function handleLikeClick() {
        onCardLike();
    }

    function handleClick() {
        onCardClick();
    }

    return(
        <li className="card">
            <img src={card.link} className="card__image" alt={card.name} onClick={handleClick} />
            {isOwn && <button type="button" onClick={handleDeleteClick} className="card__delete-button" name="delete" aria-label="удалить" />}
            <div className="card__info">
                <h2 className="card__name">{card.name}</h2>
                <div className="card__container">
                    <button type="button" onClick={handleLikeClick} className={`card__button ${isLiked && 'card__button_active'}`} name="like" aria-label="лайк"></button>
                    <span className="card__like-counter">{card.likes.length}</span>
                </div>
            </div>
        </li>
    );
}

export default Card;
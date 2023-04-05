import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";
import Spinner from "./Spinner";


function Main({onEditProfile, onEditAvatar, onAddPlace, onCardClick, cards, onCardLike, onCardDelete, isCardsLoading, isProfileLoading}) {

    const positions ={
        positionCards: 'cards',
        positionProfile: 'profile',
    }

    const currentUser = React.useContext(CurrentUserContext);

    return(
        <main className="main">
            <section className="profile">
                <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})`}} onClick={onEditAvatar} >
                    {isProfileLoading ? (
                    <Spinner position={positions.positionProfile}/>
                    ) : (
                    <button type="button" className="profile__image" aria-label="обновить" ></button>
                    )}
                </div>
                <div className="profile__info">
                    <div className="profile__text">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <p className="profile__status">{currentUser.about}</p>
                    </div>
                    <button type="button" className="profile__button-edit" aria-label="редактировать" onClick={onEditProfile} ></button>
                </div>
                <button type="button" className="profile__button-add" aria-label="добавить" onClick={onAddPlace} ></button>
            </section>
            <section className="section">
                <ul className="cards">
                    {isCardsLoading 
                    ? <Spinner position={positions.positionCards}/> 
                    : cards.map((item) => 
                        (<Card key={item._id} card={item} onCardDelete={() => {onCardDelete(item)}} onCardLike={() => {onCardLike(item)}} onCardClick={() => onCardClick(item)} />)
                    )}
                </ul>
            </section>
        </main>
    )
}

export default Main;
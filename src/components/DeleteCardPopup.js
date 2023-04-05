import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({onClose, isOpen, onDeleteCard, selectedCard, isLoading}) {
    function handleDeleteCard(e) {
        e.preventDefault();

        onDeleteCard(selectedCard);
    }

    return(
        <PopupWithForm onSubmit={handleDeleteCard} title='Вы&nbsp;уверены?' name='confirmPopup' buttonText={isLoading ? 'Удаление...' : 'Да'} isOpen={isOpen} onClose={onClose} children={
            <></>
        } />
    );
}

export default DeleteCardPopup;
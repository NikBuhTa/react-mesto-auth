import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({onClose, isOpen, onAddPlace, isLoading}) {
    
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen])

    function handleSumbit(e) {
        e.preventDefault();

        onAddPlace({name, link});
    }

    function handleTitleInput(e) {
        setName(e.target.value);
    }

    function handleUrlInput(e) {
        setLink(e.target.value);
    }


    return(
        <PopupWithForm onSubmit={handleSumbit} title='Новое место' name='newCard' buttonText={isLoading ? 'Добавление...' : 'Новое место'} isOpen={isOpen} onClose={onClose} children={
            <>
                <label className="form__label form__label_position_top">
                    <input className="form__input" type="text" id="title-input" name="title" value={name} onChange={handleTitleInput} placeholder="Название" required minLength="2" maxLength="30"/>
                    <span className="form__input-error title-input-error"></span>
                </label>
                <label className="form__label">
                    <input className="form__input" type="url" id="url-input" name="url" value={link} onChange={handleUrlInput} placeholder="Ссылка на картинку" required/>
                    <span className="form__input-error url-input-error"></span>
                </label>
            </>
        } />
    );
}

export default AddPlacePopup;
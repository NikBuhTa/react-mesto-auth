import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({onClose, isOpen, onUpdateUser, isLoading}) {
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name || '');
        setDescription(currentUser.about || '');
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: description,
        });
    }

    function handleInputName(e) {
        setName(e.target.value);
    } 

    function handleInputDescription(e) {
        setDescription(e.target.value);
    }

    return(
        <PopupWithForm onSubmit={(e) =>handleSubmit(e)} title='Редактировать профиль' name='aboutProfile' buttonText={isLoading ? 'Обновление...' : 'Сохранить'} isOpen={isOpen} onClose={() => onClose()} children={
                <>
                    <label className="form__label form__label_position_top">
                        <input className="form__input form__input_class_name" type="text" id="name-input" name="name" value={name} onChange={handleInputName} placeholder="Имя" required minLength="2" maxLength="40"/>
                        <span className="form__input-error name-input-error"></span>
                    </label>
                    <label className="form__label">
                        <input className="form__input form__input_class_status" type="text" id="status-input" name="status" value={description} onChange={handleInputDescription} placeholder="Статус" required minLength="2" maxLength="200"/>
                        <span className="form__input-error status-input-error"></span>
                    </label>
                </>
            } />
        );
}

export default EditProfilePopup;
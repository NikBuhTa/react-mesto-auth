import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({onClose, isOpen, onUpdateAvatar, isLoading}) {

    const linkInput = React.useRef();

    React.useEffect(() => {
        linkInput.current.value ='';
    }, [isOpen])

    function handleSumbit(e) {
        e.preventDefault();

        onUpdateAvatar(linkInput.current.value);
    }

    return(
        <PopupWithForm onSubmit={handleSumbit} title='Обновить аватар' name='updateAvatar' buttonText={isLoading ? 'Обновление...' : 'Сохранить'} isOpen={isOpen} onClose={onClose} children={
            <>
                <label className="form__label form__label_position_top">
                    <input ref={linkInput} className="form__input" type="url" id="avatar" name="link" placeholder="Ссылка на картинку" required/>
                    <span className="form__input-error avatar-error"></span>
                </label>
            </>
        } />
    );
}

export default EditAvatarPopup;
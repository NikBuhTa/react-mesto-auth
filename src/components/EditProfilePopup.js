import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditProfilePopup({onClose, isOpen, onUpdateUser, isLoading}) {
    const currentUser = React.useContext(CurrentUserContext);

    const { values, handleChange, errors, isValid, resetForm, setValues} = useFormAndValidation({
        name: '',
        status: '',
    });

    React.useEffect(() => {
        resetForm();
        setValues({
            name: currentUser.name || '',
            status: currentUser.about || '',
        })
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: values.name,
            about: values.status,
        });
    }

    return(
        <PopupWithForm onSubmit={(e) =>handleSubmit(e)} title='Редактировать профиль' name='aboutProfile' buttonText={isLoading ? 'Обновление...' : 'Сохранить'} isOpen={isOpen} onClose={() => onClose()} children={
                <>
                    <label className="form__label form__label_position_top">
                        <input className="form__input form__input_class_name" type="text" id="name-input" name="name" value={values.name} onChange={handleChange} placeholder="Имя" required minLength="2" maxLength="40"/>
                        <span className="form__input-error name-input-error">{!isValid && errors.name}</span>
                    </label>
                    <label className="form__label">
                        <input className="form__input form__input_class_status" type="text" id="status-input" name="status" value={values.status} onChange={handleChange} placeholder="Статус" required minLength="2" maxLength="200"/>
                        <span className="form__input-error status-input-error">{!isValid && errors.status}</span>
                    </label>
                </>
            } />
        );
}

export default EditProfilePopup;
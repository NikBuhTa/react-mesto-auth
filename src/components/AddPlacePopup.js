import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function AddPlacePopup({onClose, isOpen, onAddPlace, isLoading}) {

    const { values, handleChange, errors, isValid, resetForm, setValues} = useFormAndValidation({
        name: '',
        link: '',
    });

    React.useEffect(() => {
        resetForm();
        setValues({
            name: '',
            link: '',
        });
    }, [isOpen])

    function handleSumbit(e) {
        e.preventDefault();

        onAddPlace({name: values.name , link: values.link});
     }

    return(
        <PopupWithForm onSubmit={handleSumbit} title='Новое место' name='newCard' buttonText={isLoading ? 'Добавление...' : 'Новое место'} isOpen={isOpen} onClose={onClose} children={
            <>
                <label className="form__label form__label_position_top">
                    <input className="form__input" type="text" id="title-input" name="name" value={values?.name} onChange={handleChange} placeholder="Название" required minLength="2" maxLength="30"/>
                    <span className="form__input-error title-input-error">{!isValid && errors.name}</span>
                </label>
                <label className="form__label">
                    <input className="form__input" type="url" id="url-input" name="link" value={values?.link} onChange={handleChange} placeholder="Ссылка на картинку" required/>
                    <span className="form__input-error url-input-error">{!isValid && errors.link}</span>
                </label>
            </>
        } />
    );
}

export default AddPlacePopup;
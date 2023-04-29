import {useState, useCallback} from 'react';

export function useFormAndValidation(inputValues) {
    const [values, setValues] = useState(inputValues);
    const [ errors, setErrors ] = useState({});
    const [ isValid, setIsValid ] = useState(true);

    const handleChange = (e) => {
        const {name, value} = e.target
        setValues({...values, [name]: value });
        setErrors({...errors, [name]: e.target.validationMessage});
        setIsValid(e.target.closest('form').checkValidity());
    };

    const resetForm = useCallback((newErrors = {}, newIsValid = false) => {
        setErrors(newErrors);
        setIsValid(newIsValid);
    }, [setErrors, setIsValid]);

    return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
}
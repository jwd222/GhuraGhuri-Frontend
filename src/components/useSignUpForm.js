import { useState, useEffect } from "react";
import validateInfoSignUp from "./validateInfoSignUp";

const useSignUpForm = validateInfoSignUp => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
    })

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = (e, type) => {
        type = type;
        values.usertype = type;
        e.preventDefault();
        setErrors(validateInfoSignUp(values));
        setIsSubmitted(true);
    }


    return { handleChange, values, handleSubmit, errors };

};

export default useSignUpForm;
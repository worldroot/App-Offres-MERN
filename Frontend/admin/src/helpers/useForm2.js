import { useState } from "react";

const useForm2 = (initialFieldValues,setCurrentIdS2) => {

    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const resetForm =() =>{
        setValues(initialFieldValues)
        setErrors({})
        setCurrentIdS2(0)
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    };
}

export default useForm2;
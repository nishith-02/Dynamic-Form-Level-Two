import { useState } from 'react';

const useJobForm = (callback, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: prevValues[name] ? [...prevValues[name], value] : [value],
      }));
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      callback(values);
    }
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};

export default useJobForm;

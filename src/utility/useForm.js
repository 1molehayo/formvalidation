import { useEffect } from 'react';
import { isObjectEmpty } from 'utility';

export function useForm(formState, setForm, validate) {
  const form = { ...formState };
  useEffect(() => {
    validate
      ? setForm(item => ({ ...item, invalid: true }))
      : setForm(item => ({ ...item, invalid: false }));
  }, [validate, setForm]);

  const updateForm = (value, fieldName) => {
    form[fieldName] = {
      touched: true,
      value
    };
    if (validate) {
      const errors = validate(form);
      form[fieldName].error = errors[fieldName];

      if (errors[fieldName]) {
        form.invalid = true;
      }

      if (isObjectEmpty(errors)) {
        form.invalid = false;
      }
    }
    setForm(form);
  };

  return updateForm;
}

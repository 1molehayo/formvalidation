export const formatCreditCardNumber = value => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = v.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || '';
  const parts = [];
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  if (parts.length) {
    return parts.join(' ');
  }
  return value;
};

export const formatExpiryDate = value => {
  return value
    .replace(
      /[^0-9]/g,
      '' // To allow only numbers
    )
    .replace(
      /^([2-9])$/g,
      '0$1' // To handle 3 > 03
    )
    .replace(
      /^(1{1})([3-9]{1})$/g,
      '0$1/$2' // 13 > 01/3
    )
    .replace(
      /^0{1,}/g,
      '0' // To handle 00 > 0
    )
    .replace(
      /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g,
      '$1/$2' // To handle 113 > 11/3
    );
};

export const isArrayEmpty = arr => !arr || arr.length === 0;

export const isEmpty = str => !str || str.length === 0;

export const isFormEmpty = form => {
  const errors = [];

  // eslint-disable-next-line no-unused-vars
  for (const key in form) {
    if (!form[key].value) {
      errors.push(key);
    }
  }

  return !isArrayEmpty(errors);
};

export const isInputValid = (errors, name) => {
  if (errors.length) {
    return errors.some(e => e.includes(name));
  }
  return false;
};

export const isObjectEmpty = obj => {
  if (!obj) {
    return true;
  }

  // eslint-disable-next-line no-unused-vars
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }

  return true;
};

export const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties
});

export const validateCardNumber = n => {
  const regex = /^[\d\s]+$/;
  return n.length === 19 && regex.test(n);
};

export const validateEmail = email => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

export const validateExpiryDate = value => {
  const regex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
  return regex.test(value);
};

export const validateName = name => {
  const regex = /\s*(?:\S\s*){2,}$/;
  return name.length > 1 && regex.test(name);
};

export const validateNumber = n => {
  const regex = /^\d+$/;
  return regex.test(n);
};

export const validatePassword = password => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  return regex.test(password);
};

export const validatePhone = n => {
  const num = parseInt(n, 10);
  const isNumber = /^\d+$/.test(n);
  const str = `${num}`;

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(num) || !isNumber || str.substring(0, 3) === '234') {
    return false;
  }

  const phone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return str.match(phone);
};

export const validatePin = n => {
  return validateNumber(n) && n.length === 4;
};

export const checkFieldValidity = form => {
  const errors = {};

  // eslint-disable-next-line no-unused-vars
  for (const key in form) {
    if (!form[key].value) {
      errors[key] = `Please fill the ${key} field`;
    }
  }

  if (form.email.value && !validateEmail(form.email.value)) {
    errors.email = 'Your email address is invalid. Try again';
  }

  if (form.fullName.value && !validateName(form.fullName.value)) {
    errors.fullName = 'Full name is invalid. Try again';
  }

  if (form.phoneNumber.value && !validatePhone(form.phoneNumber.value)) {
    errors.phoneNumber = 'phone is invalid. Try again';
  }

  if (form.password.value && !validatePassword(form.password.value)) {
    errors.password = 'password is invalid. Try again';
  }

  if (
    form.confirmPassword.value &&
    form.confirmPassword.value !== form.password.value
  ) {
    errors.confirmPassword = `password doesn't match`;
  }

  if (form.cardNumber.value && !validateCardNumber(form.cardNumber.value)) {
    errors.cardNumber = `card number is invalid`;
  }

  if (
    form.expirationDate.value &&
    !validateExpiryDate(form.expirationDate.value)
  ) {
    errors.expirationDate = `expiry date is invalid`;
  }

  if (form.pin.value && !validatePin(form.pin.value)) {
    errors.pin = `pin is invalid`;
  }

  return errors;
};

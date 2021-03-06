const Validator=require('validator');
const isEmpty=require('./is-empty');


module.exports = function validateProfileInput(data){
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';

    if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Handle needs to between 2 and 40 characters';
      }
    
      if (Validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required';
      }

      if (!isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
          errors.website = 'Not a valid URL';
        }
      }

      if (!isEmpty(data.phoneNumber)) {
      if (!Validator.isMobilePhone(data.phoneNumber)) {
        errors.phoneNumber = 'Not a valid phone number'
        }
      }

      return {
        errors,
        isValid: isEmpty(errors)
      };
};
const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function ValidatePostInput(data) {
  let errors = {};

  data.image = !isEmpty(data.image) ? data.image : "";
  data.caption = !isEmpty(data.caption) ? data.caption : "";

  if (!Validator.isURL(data.image)) {
    errors.image = "Valid image URL is required";
  }

  if (Validator.isEmpty(data.image)) {
    errors.image = "Image field is required";
  }

  if (!Validator.isLength(data.caption, { min: 2, max: 300 })) {
    errors.caption = "Caption must be between 2 and 300 characters";
  }

  if (Validator.isEmpty(data.caption)) {
    errors.caption = "Caption field is required";
  }

  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

// Email validation
export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// Mobile number validation (numeric only)
export const validateMobile = (mobile) => {
  const re = /^[0-9]{10}$/;
  return re.test(String(mobile));
};

// Image file validation (jpg/png only)
export const validateImageFile = (file) => {
  if (!file) return false;
  
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  return validTypes.includes(file.type);
};

// Form validation for employee
export const validateEmployeeForm = (values) => {
  const errors = {};
  
  if (!values.name) {
    errors.name = 'Name is required';
  }
  
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(values.email)) {
    errors.email = 'Invalid email format';
  }
  
  if (!values.mobile) {
    errors.mobile = 'Mobile number is required';
  } else if (!validateMobile(values.mobile)) {
    errors.mobile = 'Mobile number must be 10 digits';
  }
  
  if (!values.designation) {
    errors.designation = 'Designation is required';
  }
  
  if (!values.gender) {
    errors.gender = 'Gender is required';
  }
  
  if (!values.course) {
    errors.course = 'Course is required';
  }
  
  if (!values.image && !values.existingImage) {
    errors.image = 'Image is required';
  } else if (
    values.image && 
    !validateImageFile(values.image)
  ) {
    errors.image = 'Only JPG/PNG files are allowed';
  }
  
  return errors;
};

// Login form validation
export const validateLoginForm = (values) => {
  const errors = {};
  
  if (!values.username) {
    errors.username = 'Username is required';
  }
  
  if (!values.password) {
    errors.password = 'Password is required';
  }
  
  return errors;
};
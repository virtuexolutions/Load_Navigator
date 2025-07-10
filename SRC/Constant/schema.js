import * as Yup from 'yup';
// export const loginSchema = Yup.object({
//     email: Yup.string().email('Invalid email format').required('Email is required'),
//     password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//   });

export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is requried !'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(8, 'Password must be at least 8 characters')
    .required('Password is required !'),
});

// export const SignupSchema = Yup.object().shape({
//   name: Yup.string().required('Business name is required'),
//   email: Yup.string().email('Invalid email').required('Email is required'),
//   contact: Yup.string()
//     .matches(/^[0-9]{10}$/, 'Enter valid 10-digit number')
//     .required('Phone number is required'),
//   address: Yup.string().required('Address is required'),
//   password: Yup.string()
//     .min(8, 'Password must be at least 8 characters')
//     .max(8, 'Password must be at least 8 characters')
//     .required('Password is required !'),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref('password'), null], 'Passwords must match')
//     .required('Confirm Password is required'),
// });

export const SignupSchema = Yup.object().shape({
  first_name: Yup.string().trim().required('First name is required.'),

  last_name: Yup.string().trim().required('Last name is required.'),

  email: Yup.string()
    .email('Enter a valid email.')
    .required('Email is required.'),

  contact: Yup.string()
    .matches(/^\d{10,15}$/, 'Contact must be 10-15 digits.')
    .required('Contact is required.'),

  company_name: Yup.string().trim().required('Company name is required.'),

  address: Yup.string().trim().required('Address is required.'),

  dot_number: Yup.string()
    .matches(/^\d+$/, 'DOT number must be numeric.')
    .required('DOT number is required.'),

  mc_number: Yup.string()
    .matches(/^\d+$/, 'MC number must be numeric.')
    .required('MC number is required.'),

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters.')
    .required('Password is required.'),

  confirm_password: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match.')
    .required('Please confirm your password.'),

  hear_about_us: Yup.string().required('Please select how you heard about us.'),

  agree_to_terms: Yup.boolean().oneOf([true], 'You must agree to the terms.'),
});
// export const SignupSchema = Yup.object({
//   name: Yup.string().required('Name is required !'),
//   address: Yup.string().required('Address is required !'),
//   email: Yup.string()
//     .email('Invalid email address !')
//     .required('Email is requried !'),
//   contact: Yup.number()
//     // .matches(/^\d+$/, 'Mobile number must contain only digits')
//     // .min(10, 'Mobile number must be at least 10 digits')
//     // .max(15, 'Mobile number cannot exceed 15 digits')
//     .required('Mobile number is required'),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref('password'), null], 'Passwords must match !')
//     .required('Confirm Password is required !'),
//   password: Yup.string()
//     .min(8, 'Password must be at least 8 characters !')
//     .max(8, 'Password must be at least 8 characters ! ')
//     .required('Password is required !'),
//   termsAccepted: Yup.boolean()
//     .oneOf([true], 'You must accept the terms and conditions ! ')
//     .required('Required !'),
//   // modal: Yup.boolean().required('Car number is required'),
//   // number: Yup.boolean().required('Car number is required'),
//   // seat: Yup.bool().required('Seat is required'),
//   // category: Yup.string().required('Category is Requried'),
//   // image: Yup.object().required('Image of car is required'),
// });

export const forgotpasswordSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address !')
    .required('Email is requried !'),
});

export const forgotpassword = Yup.object({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(8, 'Password must be at least 8 characters')
    .required('Password is required !'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});
export const changePasswordSchema = Yup.object({
  currentPassword: Yup.string().required('Currrent Password is Requried'),
  newPassword: Yup.string()
    .required('New password is required')
    .min(8, 'New password is must be 8 charcters long')
    .max(8, 'New password is must be 8 charcters long'),
  confirmNewPassword: Yup.string()
    .required('Confirm password is requried')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});

export const editProfileSchema = Yup.object({
  userName: Yup.string(),
  email: Yup.string(),
  phoneNumber: Yup.number(),
});

export const addYourCarSchema = Yup.object({
  carName: Yup.string().required('Car Name is required'),
  carModel: Yup.string().required('Car Model is required'),
  carNumber: Yup.string().required('Car Number is required'),
  carSeats: Yup.string().required('Car Seat is required'),
});

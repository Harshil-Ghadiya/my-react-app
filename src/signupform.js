import React,  {useState} from 'react';
import './signupform.css';

const signupForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors ] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState('');

const handleChalange = (e) => {
  const {name, value} = e.target;
  setFormData({...formData, [name]: value});

  if(name === 'password')
  {
    checkStrength(value);
  }
};
const checkStrength = (password) => {
  if(password.length < 6) {
    setStrength('Weak');
  } else if (password.length < 10) {
    setStrength('Medium');
  } else {
    setStrength('Strong');
}
  // setFormData({
  //   ...formData,
  //   [e.target.name]: e.target.value
  // });
};

  const validate = () => {
    let newErrors = {};
    if(!formData.fullName) {
      newErrors.fullName = 'Full Name is required';
    }
    if(!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if(!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

   if(!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
  
  return newErrors;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const validationErrors = validate();

  if(Object.keys(validationErrors).length === 0) {
    alert('Form submitted successfully');
    console.log('Form submitted successfully', formData);
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
    setStrength('');
  } else {
    setErrors(validationErrors);
  }
};
return (
  <div style={{ maxWidth: '400px', margin:  '0 auto'}}className="signup-form">
    <h2>Sign Up</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChalange}
          class= "animate__input"
        />
        {errors.fullName && <p style={{ color: 'red' }}>{errors.fullName}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChalange}
          className='animate__input'
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChalange}
          className='animate__input'
        />

        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? 'Hide' : 'Show'}
          </button>
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        {formData.password && (
          <p className={`strength ${strength.toLowerCase()}`}>strength: {strength}</p>
        )}
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChalange}
        />
        {errors.confirmPassword && (
          <p style={{ color: 'red' }}>{errors.email}</p>
        )}
      </div>
      <button type="submit">Sign Up</button>
    </form>
  </div>
);
};
export default signupForm;
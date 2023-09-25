import React, { useEffect, useState } from 'react';
import Navbar from '../subComponents/Navbar';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import login from '../images/login.png'


export default function Login(props) {
  const initialValues = { email: "", password: "" }
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const location = useLocation();
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  }

  useEffect(() => {

    const token = localStorage.getItem('token')
    if (token) {
      navigate("/dashboard")
    }
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      onLogin();
    }
    else {
      if (location.pathname === '/login/verified') {
        setConfirmMessage("User successfully verified");
      }
    }
  }, [formErrors, isSubmit]);

  const validate = (values) => {
    const errors = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexspaces = /^[^\s]+$/;
    if (!values.email) {
      errors.email = "Email is required"
    }
    else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format"
    }
    if (!values.password) {
      errors.password = "Password is required"
    }
    else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters"
    }
    return errors;
  }
  const onLogin = async () => {
    await axios.post("http://localhost:8080/auth/login", {
      email: formValues.email, password: formValues.password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      const { jwtToken } = response.data;
      localStorage.setItem('token', jwtToken);
      navigate("/dashboard");
    }).catch((error) => {
      setErrorMessage("Credentials Invalid")
      setConfirmMessage("")
    })
  }
  return (
    <>
      <Navbar />
      <div className='container-fluid' style={{ marginTop: '40px' }}>
        {confirmMessage.length !== 0 ? (
          <div class="alert alert-success mx-auto text-center fw-bold" role="alert" style={{ width: '40%' }}>
            {confirmMessage}
          </div>
        ) : (
          null
        )}
        {errorMessage.length !== 0 ? (
          <div class="alert alert-danger mx-auto text-center fw-bold" role="alert" style={{ width: '40%' }}>
            {errorMessage}
          </div>
        ) : (
          null
        )}
        <form className='mx-auto p-3 bg-white rounded shadow-lg' style={{ width: '40%' }}>
          <h2 className='text-center'><img src={login} alt="dashboard" style={{ width: '30px', marginRight: "10px" }} />Login</h2>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" name='email' class="form-control" id="email" value={formValues.email} onChange={handleChange} />
            <p className='text-danger'>{formErrors.email}</p>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" name='password' class="form-control" id="password" value={formValues.password} onChange={handleChange} />
            <p className='text-danger'>{formErrors.password}</p>
          </div>
          <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Submit</button>
          <p className='mt-3'>Don't have an account? <Link to="/signup">Signup</Link></p>
        </form>
      </div>
    </>
  )
}

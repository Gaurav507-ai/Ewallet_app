import React, { useEffect, useState } from 'react'
import Navbar from '../subComponents/Navbar'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import signup from '../images/signup.png'

export default function Signup() {
  const initialValues = { username: "", email: "", password: "" }
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
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
      onRegister();
    }
  }, [formErrors, isSubmit]);

  const validate = (values) => {
    const errors = {}
    const regexemail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const regexinitial = /^[^\s]+$/
    const regexnumber = /^[a-zA-Z]+$/i;
    if (!values.username) {
      errors.username = "Username is required"
    }
    else if (!regexinitial.test(values.username)) {
      errors.username = "Username must not contain spaces"
    }
    else if(!regexnumber.test(values.username)){
      errors.username = "Username must not contain numbers";
    }
    if (!values.email) {
      errors.email = "Email is required"
    }
    else if (!regexemail.test(values.email)) {
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
  const onRegister = async () => {
    setConfirmMessage("Please wait while we are processing your request");
    setErrorMessage("");
    await axios.post("http://localhost:8080/auth/register", {
      name: formValues.username, email: formValues.email, password: formValues.password
    }).then((response) => {
      setConfirmMessage("")
      setConfirmMessage("Please check your email to verify your account")
      setErrorMessage("");
    }).catch((error) => {
      setConfirmMessage("")
      setErrorMessage("User is already a member of ewallet")
    })
  }
  return (
    <>
      <Navbar />
      <div className='container-fluid' style={{ marginTop: '40px' }}>
        {confirmMessage.length !== 0 ? (
          <div className="alert alert-success mx-auto text-center fw-bold" role="alert" style={{ width: '40%' }}>
            {confirmMessage}
          </div>
        ) : (
          null
        )}
        {errorMessage.length !== 0 ? (
          <div className="alert alert-danger mx-auto text-center fw-bold" role="alert" style={{ width: '40%' }}>
            {errorMessage}
          </div>
        ) : (
          null
        )}
        <form className='mx-auto p-3 rounded bg-white shadow-lg' style={{ width: '40%' }}>
          <h2 className='text-center'><img src={signup} alt="dashboard" style={{ width: '30px', marginRight: "10px" }} />Signup</h2>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control rounded" id="username" name='username' value={formValues.username} onChange={handleChange} />
            <p className='text-danger'>{formErrors.username}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" name='email' className="form-control rounded" id="email" value={formValues.email} onChange={handleChange} />
            <p className='text-danger'>{formErrors.email}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" name='password' className="form-control rounded" id="password" value={formValues.password} onChange={handleChange} />
            <p className='text-danger'>{formErrors.password}</p>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
          <p className='mt-3'>Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </>
  )
}

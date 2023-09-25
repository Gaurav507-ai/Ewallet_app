import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function WithdrawLayout() {
    const initialValues = { value: null }
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

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
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            const token = localStorage.getItem('token');
            onWithdraw(token);
        }
    }, [formErrors, isSubmit]);

    const validate = (values) => {
        const errors = {}
        if (!values.value) {
            errors.value = "Amount is required"
        }
        return errors;
    }

    const onWithdraw = async (token) => {
        setMessage("Please wait while we are processing your request")
        setErrorMessage("")
        const amount = formValues.value;
        await axios.put(`http://localhost:8080/wallet/withdraw?value=${amount}`, null, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            setMessage("")
            setMessage("Money withdraw successfull")
            setErrorMessage("")
        }).catch((error) => {
            if (error.response.data === 'Amount not available') {
                setMessage("")
                setErrorMessage("Amount not available")
            }
        })
    }
    return (
        <>
            <div className="container rounded ms-2 shadow-lg" style={{ width: '90%', backgroundColor: '#f0f8ff' }}>
                <h2 className='mb-5 mt-4'>Withdraw</h2>
                <hr />
                {message.length !== 0 ? (
                    <div class="alert alert-success mx-auto text-center fw-bold" role="alert" style={{ width: '50%' }}>
                        {message}
                    </div>
                ) : (
                    null
                )}
                {errorMessage.length !== 0 ? (
                    <div class="alert alert-danger mx-auto text-center fw-bold" role="alert" style={{ width: '50%' }}>
                        {errorMessage}
                    </div>
                ) : (
                    null
                )}
                <form>
                    <div class="mb-3">
                        <label for="exampleInputValue" class="form-label">Amount</label>
                        <input type="number" class="form-control" id="exampleInputValue" name='value' value={formValues.value} onChange={handleChange} style={{ border: "1px solid black", width: '50%' }} />
                    </div>
                    <p className='text-danger'>{formErrors.value}</p>
                    <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Withdraw to bank</button>
                </form>
            </div>
        </>
    )
}

import { useEffect, useState } from "react"
import React from 'react'
import axios from "axios";

export default function TransferLayout() {
    const initialValues = { email: "", amount: null }
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
            onTransfer(token);
        }
    }, [formErrors, isSubmit]);

    const validate = (values) => {
        const errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
            errors.email = "Email is required"
        }
        else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format"
        }
        if (!values.amount) {
            errors.amount = "Amount is required"
        }
        return errors;
    }

    const onTransfer = async (token) => {
        setMessage("Please wait while we are processing your request")
        setErrorMessage("")
        await axios.post("http://localhost:8080/wallet/transfer", {
            email: formValues.email, amount: formValues.amount
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.data === `Insert receiver's email`) {
                setMessage("")
                setErrorMessage("Insert receiver's email")
            }
            else {
                setMessage("")
                setMessage("Money transfer successfully")
                setErrorMessage("")
            }
        }).catch((error) => {
            if (error.response.data === 'Amount not available in wallet') {
                setMessage("")
                setErrorMessage("Amount not available")
            }
            else {
                setMessage("")
                setErrorMessage("User not found")
            }
        })
    }

    return (
        <>
            <div className="container rounded ms-2 shadow-lg" style={{ width: '90%', backgroundColor: '#f0f8ff' }}>
                <h2 className='mb-5 mt-4'>Transfer</h2>
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
                        <label for="exampleInputEmail1" class="form-label">Receiver's email</label>
                        <input type="email" name="email" class="form-control" id="exampleInputEmail1" value={formValues.email} onChange={handleChange} style={{ border: "1px solid black", width: '50%' }} />
                    </div>
                    <p className='text-danger'>{formErrors.email}</p>
                    <div class="mb-3">
                        <label for="exampleInputInteger" class="form-label">Amount</label>
                        <input type="number" name="amount" class="form-control" id="exampleInputInteger" value={formValues.amount} onChange={handleChange} style={{ border: "1px solid black", width: '50%' }} />
                    </div>
                    <p className='text-danger'>{formErrors.amount}</p>
                    <button type="submit" onClick={handleSubmit} class="btn btn-primary">Transfer</button>
                </form>
            </div>
        </>
    )
}

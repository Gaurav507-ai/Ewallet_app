import React, { useEffect, useState } from 'react'
import wallet from '../images/wallet1.jpg'
import { Link } from 'react-router-dom'
import drop from '../images/Drop.png'
import user from '../images/user.png'
import axios from 'axios'


export default function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState("")
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            userDetail(token)
        }
        else {
            setIsAuthenticated(false);
        }
    })

    const userDetail = (token) => {
        axios.get("http://localhost:8080/users/currentUser", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            const { name } = response.data;
            setUserName(name);
        }).catch((error) => {
            setUserName("");
        })
    }


    return (
        <>
            <nav className="navbar navbar-expand-lg sticky-top" style={{ height: '100px', backgroundColor: '#f0f8ff' }}>
                <div className="container d-flex justify-content-between">
                    <div>
                        <Link className="navbar-brand" to="/" style={{ fontWeight: 'bold', fontSize: '29px', lineHeight: '40px', color: 'rgb(99, 121, 244)' }}><img src={wallet} alt="Wallet" width='80px' />Ewallet</Link>
                    </div>
                    {isAuthenticated === true ? (
                        <div className='me-4'>
                            <Link to="/dashboard">
                                <img src={user} className="rounded-circle me-2" style={{ width: '32px', height: '32px' }} />
                            </Link>
                            <strong className='text-black text-decoration-none'>{userName}</strong>
                        </div>
                    ) : (
                        <div>
                            <Link to="/login"><button className='btn mx-3' style={{ backgroundColor: 'transparent', border: '1px solid rgb(99, 121, 244)', color: 'rgb(99, 121, 244)', padding: '15px' }}>Login</button></Link>
                            <Link to="/signup"><button className='btn' style={{ backgroundColor: 'rgb(99, 121, 244)', color: 'white', border: '0px', padding: '15px' }}>Sign Up</button></Link>
                        </div>
                    )}
                </div>
            </nav>
        </>
    )
}

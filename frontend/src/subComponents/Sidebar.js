import React, { useEffect, useState } from 'react'
import Wallet_logo from '../images/Wallet_logo.png';
import Dashboard from '../images/dashboard.png';
import moneytransfer from '../images/money-transfer.png';
import money from '../images/money.png'
import cashback from '../images/cashback.png'
import { useNavigate, useLocation } from 'react-router-dom';
import topup from '../images/top-up.png'
import withdraw from '../images/withdraw.png'
import logout from '../images/logout.png'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    const location = useLocation();
    const [url, setUrl] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        setUrl(location.pathname);
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/')
        }
    }, [location]);
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }
    return (
        <>
            <div className="d-flex flex-column p-3 shadow-lg rounded" style={{ width: '300px', backgroundColor: '#f0f8ff' }}>
                <img className="ms-2" src={Wallet_logo} alt="Alternative pic" width='80px' />
                <hr />
                <ul className='nav nav-pills flex-column' style={{ marginBottom: '80px' }}>
                    <li className='nav-item'>
                        <Link to="/dashboard" className={"nav-link " + (url === "/dashboard" ? " bg-primary " : "") + " text-black"}>
                            <img src={Dashboard} alt="dashboard" style={{ marginRight: '10px', width: '24px' }} />
                            <b>Dashboard</b>
                        </Link>
                    </li>
                    <li>
                        <Link to="/transaction" className={"nav-link " + (url === "/transaction" ? " bg-primary " : "") + " text-black"}>
                            <img src={moneytransfer} alt="dashboard" style={{ marginRight: '10px', width: '24px' }} />
                            <b>Transactions</b>
                        </Link>
                    </li>
                    <li>
                        <Link to="/transfer" className={"nav-link " + (url === "/transfer" ? " bg-primary " : "") + " text-black"}>
                            <img src={money} alt="dashboard" style={{ marginRight: '10px', width: '24px' }} />
                            <b>Transfer</b>
                        </Link>
                    </li>
                    <li>
                        <Link to="/topup" className={"nav-link " + (url === "/topup" ? " bg-primary " : "") + " text-black"}>
                            <img src={topup} alt="dashboard" style={{ marginRight: '10px', width: '24px' }} />
                            <b>Top up</b>
                        </Link>
                    </li>
                    <li>
                        <Link to="/withdraw" className={"nav-link " + (url === "/withdraw" ? " bg-primary " : "") + " text-black"}>
                            <img src={withdraw} alt="dashboard" style={{ marginRight: '10px', width: '24px' }} />
                            <b>Withdraw</b>
                        </Link>
                    </li>
                    <li>
                        <Link to="/cashback" className={"nav-link " + (url === "/cashback" ? " bg-primary " : "") + " text-black"}>
                            <img src={cashback} alt="dashboard" style={{ marginRight: '10px', width: '24px' }} />
                            <b>Cashbacks</b>
                        </Link>
                    </li>
                </ul>
                <hr />
                <ul className='nav nav-pills flex-column'>
                    <li className='nav-item'>
                        <Link to="#" className='nav-link text-black' onClick={handleLogout}>
                            <img src={logout} alt="dashboard" style={{ marginRight: '10px', marginLeft: '10px', width: '24px' }} />
                            <b>Logout</b>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

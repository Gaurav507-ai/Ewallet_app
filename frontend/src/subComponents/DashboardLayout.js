import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import money from '../images/money.png'
import topup from '../images/top-up.png'
import axios from 'axios';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function DashboardLayout() {
  const [balance, setBalance] = useState(null);
  const [inc, setInc] = useState(null);
  const [exp, setExp] = useState(null);
  const [cback, setCback] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    userDetail(token);
  })

  const data = {
    labels: ['Income', 'Expense', 'Cashback'],
    datasets: [
      {
        label: 'Amount',
        data: [inc, exp, cback],
        backgroundColor: ['aqua', 'violet', 'orange'],
        borderColor: ['black', 'purple', 'red']
      }
    ]
  };

  const options = {

  }

  const userDetail = (token) => {
    axios.get("http://localhost:8080/users/currentUser", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      const { walletBalance, income, expenses,cashback } = response.data;
      setBalance(walletBalance.toFixed(2));
      if (income === 0 && expenses === 0 && cashback === 0) {
        setInc(1);
        setExp(1);
        setCback(1);
      }
      else {
        setInc(income);
        setExp(expenses);
        setCback(cashback);
      }
    }).catch((error) => {
    })
  }
  return (
    <>
      <div className="container rounded ms-2 shadow-lg" style={{ width: '90%', backgroundColor: '#f0f8ff' }}>
        <div className="container d-flex justify-content-between rounded" style={{ height: '130px', marginTop: '15px', backgroundColor: 'rgb(99, 121, 244)' }}>
          <div className='d-flex flex-column text-light mt-3 ms-2'>
            <p>Wallet Balance</p>
            <p className='h1'>₹ {balance} </p>
          </div>
          <div className="d-flex flex-column me-3 mt-3">
            <Link to="/topup"><button className='btn text-center' style={{ border: '1px solid white', color: 'white', width: '120px' }}>
              <span className='text-white'><img src={topup} alt="dashboard" style={{ width: '24px', marginRight: '5px' }} />
                Top Up</span>
            </button></Link>
            <Link to="/transfer"><button className='btn mt-2 text-center' style={{ color: 'light', border: '1px solid white', width: '120px' }}>
              <span className='text-white'><img src={money} alt="dashboard" style={{ width: '24px' }} />Transfer</span>
            </button></Link>
          </div>
        </div>
        <div className='mx-auto' data-testid='doughnut-chart' style={{ width: '50%', height: '70%' }}>
          <Doughnut data={data} options={options} >

          </Doughnut>
        </div>
      </div>
    </>
  )
}

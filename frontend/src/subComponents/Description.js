import React from 'react'
import Wallet from '../images/Wallet.gif'

export default function Description() {
  return (
    <>
    <div className="container-fluid bg-white position-fixed" style={{height: '100vh'}}>
        <div className="row">
            <div className="col" style={{marginLeft: '80px'}}>
                <h1 style={{marginTop: '70px'}}>Simplify your finances with our <span style={{color: 'rgb(99, 121, 244)'}}>Ewallet</span> app with the following features: </h1>
                <ul style={{fontWeight: 'bold', marginTop: '20px'}}>
                    <li>A dashboard provide overview of account balance and transactions.</li>
                    <li>Ewallet employs top-notch security measures.</li>
                    <li>Users can easily transfer funds to the other Ewallet user.</li>
                    <li>A detailed transaction history is provided which enable users to review transactions.</li>
                    <li>Users can download their detailed transaction history.</li>
                    <li>User will get maximum 150 rupees cashback on every recharge.</li>
                </ul>
            </div>
            <div className="col">
                <img src={Wallet} alt='Wallet' width='90%' height='110%'/>
            </div>
        </div>
    </div>
    </>
  )
}

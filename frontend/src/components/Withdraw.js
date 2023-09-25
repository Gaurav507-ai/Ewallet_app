import React from 'react'
import Navbar from '../subComponents/Navbar'
import WithdrawLayout from '../subComponents/WithdrawLayout'
import Sidebar from '../subComponents/Sidebar'

export default function Withdraw() {
  return (
    <>
      <Navbar />
      <div className="container d-flex mt-2">
        <Sidebar />
        <WithdrawLayout />
      </div>
    </>
  )
}

import React from 'react'
import TransactionLayout from '../subComponents/TransactionLayout'
import Navbar from '../subComponents/Navbar'
import Sidebar from '../subComponents/Sidebar'

export default function Transaction() {
  return (
    <>
      <Navbar />
      <div className="container d-flex mt-2">
        <Sidebar />
        <TransactionLayout />
      </div>
    </>
  )
}

import React from 'react'
import Navbar from '../subComponents/Navbar'
import Sidebar from '../subComponents/Sidebar'
import TopupLayout from '../subComponents/TopupLayout'

export default function Topup() {
  return (
    <>
      <Navbar />
      <div className="container d-flex mt-2">
        <Sidebar />
        <TopupLayout />
      </div>
    </>
  )
}

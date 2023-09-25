import React from 'react'
import Navbar from '../subComponents/Navbar'
import Sidebar from '../subComponents/Sidebar'
import DashboardLayout from '../subComponents/DashboardLayout'

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="container d-flex mt-2">
        <Sidebar />
        <DashboardLayout />
      </div>
    </>
  )
}

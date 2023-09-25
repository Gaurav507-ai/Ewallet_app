import React from 'react'
import Navbar from '../subComponents/Navbar'
import Sidebar from '../subComponents/Sidebar'
import CashbackLayout from '../subComponents/CashbackLayout'

export default function Cashback() {
    return (
        <>
            <Navbar />
            <div className="container d-flex mt-2">
                <Sidebar />
                <CashbackLayout />
            </div>
        </>
    )
}

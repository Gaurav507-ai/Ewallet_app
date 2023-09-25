import React from 'react'
import TransferLayout from '../subComponents/TransferLayout'
import Navbar from '../subComponents/Navbar'
import Sidebar from '../subComponents/Sidebar'

export default function Transfer() {
    return (
        <>
            <Navbar />
            <div className="container d-flex mt-2">
                <Sidebar />
                <TransferLayout />
            </div>
        </>
    )
}

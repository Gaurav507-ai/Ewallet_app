import React from 'react'
import Navbar from '../subComponents/Navbar'
import Description from '../subComponents/Description'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate("/dashboard")
    }
  })

  return (
    <>
      <Navbar />
      <Description />
    </>
  )
}

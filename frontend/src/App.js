import React from "react";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Transaction from "./components/Transaction";
import Transfer from "./components/Transfer";
import Topup from "./components/Topup";
import Withdraw from "./components/Withdraw";
import Cashback from "./components/Cashback";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Landing />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/login/verified" element={<Login/>}/>
            <Route path="/login/unverified" element={<Login/>}/>
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/transaction" element={<Transaction/>}/>
            <Route path="/transfer" element={<Transfer/>}/>
            <Route path="/topup" element={<Topup/>}/>
            <Route path="/withdraw" element={<Withdraw/>}/>
            <Route path="/cashback" element={<Cashback/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

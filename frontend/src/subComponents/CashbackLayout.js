import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { CSVLink } from 'react-csv';
import { Link } from 'react-router-dom'

export default function CashbackLayout() {
  const [cashbacks, setCashbacks] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = cashbacks.slice(firstIndex, lastIndex);
  const npage = Math.ceil(cashbacks.length / recordsPerPage);

  const headers = [
    {
      label: "Tid", key: "id"
    },
    {
      label: "Amount", key: "amount"
    },
    {
      label: "Description", key: "description"
    },
    {
      label: "Date", key: "date"
    }
  ]

  const csvLink = {
    filename: "Cashback.csv",
    headers: headers,
    data: cashbacks
  }
  useEffect(() => {
    const token = localStorage.getItem('token');
    getCashbacks(token);
  }, [])

  const getCashbacks = async (token) => {
    await axios.get("http://localhost:8080/wallet/cashback", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      const myList = response.data;
      setCashbacks(myList);
    }).catch((error) => {
    })

  }

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);

    }
  }

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);

    }
  }
  return (
    <>
      <div className="container rounded ms-2 shadow-lg" style={{ width: '90%', backgroundColor: '#f0f8ff' }}>
        <h2 className='mb-5 mt-4'>Cashbacks</h2>
        <hr />
        {cashbacks.length !== 0 ? (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" style={{ backgroundColor: 'rgb(99, 121, 244)' }}>Cid</th>
                  <th scope="col" style={{ backgroundColor: 'rgb(99, 121, 244)' }}>Amount</th>
                  <th scope='col' style={{ backgroundColor: 'rgb(99, 121, 244)' }}>Description</th>
                  <th scope='col' style={{ backgroundColor: 'rgb(99, 121, 244)' }}>Date</th>
                  <th scope='col' style={{ backgroundColor: 'rgb(99, 121, 244)' }}>Type</th>
                </tr>
              </thead>
              <tbody>
                {records.map((cashback) => (
                  <tr key={cashback.id}>
                    <td style={{ backgroundColor: '#D3D3D3' }}>{cashback.id}</td>
                    <td style={{ backgroundColor: '#D3D3D3' }}>₹ {cashback.amount.toFixed(2)}</td>
                    <td style={{ backgroundColor: '#D3D3D3' }}>{cashback.description}</td>
                    <td style={{ backgroundColor: '#D3D3D3' }}>{cashback.date}</td>
                    <td style={{ backgroundColor: '#D3D3D3' }}>Cashback</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <nav>
              <div className="container d-flex justify-content-between">
                <div>
                  <ul className="pagination">
                    <li className="page-item">
                      <a href="#" className='page-link text-white' onClick={prevPage} style={{ backgroundColor: 'rgb(99, 121, 244)' }}>Prev</a>
                    </li>
                    <li className='page-item'>
                      <a href="#" className='page-link text-white' onClick={nextPage} style={{ backgroundColor: 'rgb(99, 121, 244)' }}>Next</a>
                    </li>
                  </ul>
                </div>
                {currentPage === 1 ? (
                  <ul className="pagination">
                    <li className="page-item">
                      <CSVLink className='page-link text-white text-decoration-none' style={{ backgroundColor: 'green' }} {...csvLink}>Download</CSVLink>
                    </li>
                  </ul>
                ) : (
                  null
                )}
              </div>
            </nav>
          </>
        ) : (
          <h2>No Cashbacks Found !!</h2>
        )}
      </div>
    </>
  )
}

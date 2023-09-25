import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { CSVLink } from 'react-csv';

export default function TransactionLayout() {
  const [transactions, setTransactions] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = transactions.slice(firstIndex, lastIndex);
  const npage = Math.ceil(transactions.length / recordsPerPage);

  const headers = [
    {
      label: "Tid", key: "tid"
    },
    {
      label: "Amount", key: "amount"
    },
    {
      label: "Description", key: "description"
    },
    {
      label: "Date", key: "date"
    },
    {
      label: "Type", key: "type"
    }
  ]

  const csvLink = {
    filename: "Transaction.csv",
    headers: headers,
    data: downloads
  }
  useEffect(() => {
    const token = localStorage.getItem('token');
    getTransactions(token);
  }, [])

  const getTransactions = async (token) => {
    await axios.get("http://localhost:8080/wallet/transactions", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      const myList = response.data;
      setTransactions(myList);
    }).catch((error) => {
    })

    await axios.get("http://localhost:8080/wallet/download", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      const myList = response.data;
      console.log(myList);
      setDownloads(myList);
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
        <h2 className='mb-5 mt-4'>Transactions</h2>
        <hr />
        {transactions.length !== 0 ? (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" style={{ backgroundColor: 'rgb(99, 121, 244)' }}>Tid</th>
                  <th scope="col" style={{ backgroundColor: 'rgb(99, 121, 244)' }}>Amount</th>
                  <th scope='col' style={{ backgroundColor: 'rgb(99, 121, 244)' }}>Description</th>
                  <th scope='col' style={{ backgroundColor: 'rgb(99, 121, 244)' }}>Date</th>
                  <th scope='col' style={{ backgroundColor: 'rgb(99, 121, 244)' }}>Type</th>
                </tr>
              </thead>
              <tbody>
                {records.map((transaction) => (
                  <tr>
                    <td style={{ backgroundColor: '#D3D3D3' }}>{transaction.id}</td>
                    <td style={{ backgroundColor: '#D3D3D3' }}>Rs. {transaction.amount}</td>
                    <td style={{ backgroundColor: '#D3D3D3' }}>{transaction.description}</td>
                    <td style={{ backgroundColor: '#D3D3D3' }}>{transaction.date}</td>
                    <td style={{ backgroundColor: '#D3D3D3' }}>{transaction.type}</td>
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
                      <CSVLink className='page-link text-white text-decoration-none' style={{ backgroundColor: 'green' }} {...csvLink}>Generate CSV File</CSVLink>
                    </li>
                  </ul>
                ) : (
                  null
                )}
              </div>
            </nav>
          </>
        ) : (
          <h2>No Transactions Found !!</h2>
        )}
      </div>
    </>
  )
}

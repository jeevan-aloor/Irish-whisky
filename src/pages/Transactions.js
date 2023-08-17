import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_URL } from '../constants/userConstants';
import { useSelector } from 'react-redux';
import moment from 'moment';

const Transactions = () => {
    const [transactions, setTransactions] = useState([])
    const user = useSelector(state => state.user.user)

    const getTransactions = async () => {
        try {
          const { data } = await axios.get(`${API_URL}/transaction-data/${user._id}`)
          if (data && data.status === "Success") {
            setTransactions(data.transactions)
          } else {
            setTransactions([])
          }
        } catch (error) {
          console.log(error);
        }
      };
    useEffect(() => {
        getTransactions()
    }, [])

  return (
    <>
    <div style={{color:"whitesmoke", margin:"3rem"}} className='table-box'>
        <h3>My Transactions</h3>
        <table>
            <tr>
                <th>Email</th>
                <th>Currency</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Date</th>
                <th>Status</th>
            </tr>
            {transactions && transactions.map((transaction) => (
                <tr>
                    <td>{transaction.email}</td>
                    <td>{transaction.currency.toUpperCase()}</td>
                    <td>$ {transaction.amount / 100}</td>
                    <td>{transaction.payment_mode}</td>
                    <td>{moment(transaction.date).format("DD/MM/YYYY h:mm a")}</td>
                    <td>{transaction.status === 'succeeded' ? 'Success' : null }</td>
                </tr>
            ))}
        </table>
    </div>
    </>
  )
}

export default Transactions
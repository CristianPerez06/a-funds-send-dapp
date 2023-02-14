import React from 'react'
import './List.module.css'
import moment from 'moment'
import { ethers } from 'ethers'

// TO DO - Add transaction types
interface Transaction {
  address: any
  amount: any
  timestamp: any
}

interface ListProps {
  transactions: Transaction[]
}

type Component = (props: ListProps) => JSX.Element

const List: Component = (props) => {
  const { transactions } = props

  return (
    <div className="container">
      <h2>Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions found</p>
      ) : (
        <div className="grid-container">
          {transactions.map((txn, index) => {
            return (
              <div key={index} className="transactions">
                <p>Receiver: {txn.address}</p>
                <p>Amount: {ethers.utils.formatUnits(txn.amount.toString(), 'ether')} eth</p>
                <p>Date: {moment(txn.timestamp.toString()).format('MM/DD/YYYY')}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default List

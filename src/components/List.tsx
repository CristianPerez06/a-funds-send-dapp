import React, { useState, useEffect } from 'react'
import moment from 'moment'

import { ethers } from 'ethers'
import abi from '../abi/SendFunds.json'

import './List.module.scss'

// TO DO - Add transaction types
interface Transaction {
  address: any
  amount: any
  timestamp: any
}

type Component = () => JSX.Element

const List: Component = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [error, setError] = useState('')

  const contractAddress = '0x0FB172Db7Ab332f3ea5189C4A3659720124880Bc'
  const contractABI = abi.abi

  const getAllTransactions = async () => {
    setError('')

    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const sendFundsContract = new ethers.Contract(contractAddress, contractABI, signer)
        const result = await sendFundsContract.getAllTxn()
        // eslint-disable-next-line no-debugger
        debugger
        const txns: Transaction[] = result.map((t: any) => {
          return {
            address: t.reciever, // TO DO - Update reciever to receiver
            amount: t.amount,
            timestamp: new Date(t.timestamp * 1000),
          }
        })

        setTransactions(txns)
      } else {
        setError('Oops... something went wrong.')
      }
    } catch (error) {
      setError('Oops... something went wrong.')
    }
  }

  useEffect(() => {
    getAllTransactions()
  }, [])

  return (
    <div className="container">
      <h2>Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions found</p>
      ) : (
        <div className="grid-container">
          {transactions.map((txn, index) => {
            console.log({ ...txn })
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
      {error && <p>{error}</p>}
    </div>
  )
}

export default List

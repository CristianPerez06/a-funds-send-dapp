import React, { FormEvent, useState } from 'react'
import { ethers } from 'ethers'
import abi from '../abi/SendFunds.json'
import { parseEther } from 'ethers/lib/utils'
import './Form.module.scss'

const Form = () => {
  const [walletAddress, setWalletAddress] = useState('')
  const [amount, setAmount] = useState('')

  const contractAddress = '0x0FB172Db7Ab332f3ea5189C4A3659720124880Bc'
  const contractABI = abi.abi

  const sendFunds = async () => {
    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const sendFundsContract = new ethers.Contract(contractAddress, contractABI, signer)
        const sendFundsTxn = await sendFundsContract.sendFunds(walletAddress, ethers.utils.parseEther(amount), {
          gasLimit: 300000,
          value: parseEther(amount),
        })
        await sendFundsTxn.wait()
        setWalletAddress('')
        setAmount('')
      } else {
        console.log('ethereum object does not exist!')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendFunds()
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <p>
          <input
            type="text"
            name=""
            id=""
            placeholder="Enter Wallet Address"
            required
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
        </p>
        <p>
          <input
            type="number"
            name=""
            id=""
            placeholder="Enter Amount"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="any"
            min="0"
          />
        </p>
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default Form

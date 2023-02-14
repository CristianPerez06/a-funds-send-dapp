import React, { useCallback, useEffect, useState } from 'react'
import './Main.module.scss'
import UserConnected from './UserConnected'
import UserNotConnected from './UserNotConnected'

type Component = () => JSX.Element

const Home: Component = () => {
  const [walletDetected, setWalletDetected] = useState(false)
  const [currentAccount, setCurrentAccount] = useState('')
  const [error, setError] = useState('')

  // Check wallet
  const checkWallet = async () => {
    setError('')

    try {
      const { ethereum } = window

      // Check if wallet is installed
      if (!ethereum) {
        return
      }
      setWalletDetected(true)

      // Check if wallet is connected
      const accounts = await ethereum.request({ method: 'eth_accounts' })
      if (accounts.length !== 0) {
        setCurrentAccount(accounts[0])
      } else {
        setError('No authorized account found.')
      }
    } catch (error) {
      setError('Oops... something went wrong.')
    }
  }

  // Connect wallet
  const connectWallet = useCallback(async () => {
    setError('')

    try {
      const { ethereum } = window

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      })

      setCurrentAccount(accounts[0])
    } catch (error) {
      setError('Oops... something went wrong.')
    }
  }, [])

  useEffect(() => {
    checkWallet()
  }, [currentAccount])

  return (
    <div className="main">
      <h1>SendFunds</h1>

      {!walletDetected && <p>You need to install Metamask.</p>}

      {currentAccount.length === 0 ? (
        <div className="user-not-connected">
          <UserNotConnected isDisabled={!walletDetected} onConnect={() => connectWallet()} />
        </div>
      ) : (
        <div className="user-connected">
          <UserConnected account={currentAccount} />
        </div>
      )}

      {error && <p>{error}</p>}
    </div>
  )
}

export default Home

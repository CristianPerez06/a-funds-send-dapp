import Form from './Form'

interface UserConnectedProps {
  account: string
}

type Component = (props: UserConnectedProps) => JSX.Element

const UserConnected: Component = (props) => {
  const { account } = props

  // Truncate wallet address
  const truncateAddress = (input: string) => {
    return input.substring(0, 5) + '...' + input.substring(38)
  }

  return (
    <div className="container">
      <div className="nav flex">
        <p className="wallet-address">{truncateAddress(account)}</p>
      </div>
      <Form />
    </div>
  )
}

export default UserConnected

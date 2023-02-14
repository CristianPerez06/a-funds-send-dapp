interface UserNotConnectedProps {
  isDisabled: boolean
  onConnect: () => void
}

type Component = (props: UserNotConnectedProps) => JSX.Element

const UserNotConnected: Component = (props) => {
  const { isDisabled = false, onConnect } = props

  return (
    <div className="container">
      <button className="connect-btn" onClick={onConnect} disabled={isDisabled}>
        Connect Wallet
      </button>
    </div>
  )
}

export default UserNotConnected

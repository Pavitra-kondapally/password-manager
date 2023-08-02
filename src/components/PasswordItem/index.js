import './index.css'

const PasswordItem = props => {
  const {passwordDetails, deletePassword, isBoxChecked} = props
  const {website, username, password, initialClassName, id} = passwordDetails
  const onDelete = () => {
    deletePassword(id)
  }
  return (
    <li className="each-password-item">
      <div className={initialClassName}>
        <p className="profile-text">{username.slice(0, 1)}</p>
      </div>
      <div className="username-password-container">
        <p className="profile-text">{website}</p>
        <p className="profile-text">{username}</p>
        {isBoxChecked ? (
          <p className="profile-text">{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            className="star-img"
            alt="stars"
          />
        )}
      </div>
      <button
        className="delete-btn"
        type="button"
        onClick={onDelete}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default PasswordItem

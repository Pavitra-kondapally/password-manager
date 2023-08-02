import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'

const profileContainerBackgroundColorClassNames = [
  'mustard',
  'green',
  'orange',
  'sky-blue',
  'wine-red',
]

class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordList: [],
    searchInput: '',
    isBoxChecked: false,
  }

  onTogglingCheckBox = () => {
    this.setState(prevState => ({
      isBoxChecked: !prevState.isBoxChecked,
    }))
  }

  onAddPassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state

    const profileColorClassName = `profile-container ${
      profileContainerBackgroundColorClassNames[
        Math.ceil(
          Math.random() * profileContainerBackgroundColorClassNames.length - 1,
        )
      ]
    }`

    const newPassword = {
      id: uuidv4(),
      website,
      username,
      password,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPassword],
      website: '',
      username: '',
      password: '',
      initialClassName: profileColorClassName,
    }))
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  deletePassword = id => {
    const {passwordList} = this.state
    const filteredPasswordList = passwordList.filter(each => each.id !== id)
    this.setState({
      passwordList: filteredPasswordList,
    })
  }

  render() {
    const {
      website,
      username,
      password,
      passwordList,
      searchInput,
      isBoxChecked,
    } = this.state
    const searchList = passwordList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <div className="container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="app-logo-image"
          alt="app logo"
        />
        <div className="password-input-card">
          <form
            className="input-password-container"
            onSubmit={this.onAddPassword}
          >
            <h1 className="heading-style">Add New Password</h1>
            <div className="search-container">
              <div className="image-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-image"
                />
              </div>
              <input
                type="text"
                className="input-box"
                placeholder="Enter Website"
                onChange={this.onChangeWebsite}
                value={website}
              />
            </div>
            <div className="search-container">
              <div className="image-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-image"
                />
              </div>
              <input
                type="text"
                className="input-box"
                placeholder="Enter Username"
                onChange={this.onChangeUsername}
                value={username}
              />
            </div>
            <div className="search-container">
              <div className="image-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-image"
                />
              </div>
              <input
                type="password"
                className="input-box"
                placeholder="Enter Password"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>
            <button className="add-btn" type="submit">
              Add
            </button>
          </form>

          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="login-image-lg"
          />
        </div>
        <div className="passwords-list-card">
          <div className="top-row">
            <div className="top-left">
              <h1 className="heading-style">Your Passwords</h1>
              <div className="password-count-container">
                <p className="password-count">{passwordList.length}</p>
              </div>
            </div>
            <div className="search-container">
              <div className="image-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  className="search-image"
                  alt="search"
                />
              </div>
              <input
                type="search"
                className="input-box"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
            </div>
          </div>
          <hr className="hr-line" />
          <div className="show-password-container">
            <input type="checkbox" onClick={this.onTogglingCheckBox} />
            <p className="show-password-text">Show Passwords</p>
          </div>
          {searchList.length === 0 ? (
            <div className="no-password-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-password-image"
              />
              <p className="no-password-text">No Passwords</p>
            </div>
          ) : (
            <ul className="passwords-list">
              {searchList.map(eachItem => (
                <PasswordItem
                  passwordDetails={eachItem}
                  key={eachItem.id}
                  deletePassword={this.deletePassword}
                  isBoxChecked={isBoxChecked}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager

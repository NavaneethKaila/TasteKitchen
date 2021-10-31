import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  render() {
    const {username, password, showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="app-container">
        <div className="login-container">
          <form className="login-input-card" onSubmit={this.onSubmitForm}>
            <img
              src="https://res.cloudinary.com/di6osww3h/image/upload/v1635381651/Frame_274_lmbl28.png"
              alt="website logo"
              className="logo"
            />
            <h1 className="title">Tasty Kitchens</h1>
            <h1 className="heading">Login</h1>
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="input"
              value={username}
              onChange={this.onChangeUsername}
            />
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="input"
              value={password}
              onChange={this.onChangePassword}
            />
            {showError && <p className="error-msg">{errorMsg}</p>}
            <button type="submit" className="log-in-button">
              Login
            </button>
          </form>
        </div>
        <img
          src="https://res.cloudinary.com/di6osww3h/image/upload/v1635380570/Rectangle_1456_fgwqbt.png"
          alt="website login"
          className="login-image"
        />
      </div>
    )
  }
}

export default Login

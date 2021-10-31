import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <div className="logo-container">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/di6osww3h/image/upload/v1635381651/Frame_274_lmbl28.png"
            alt="website logo"
            className="logo"
          />
        </Link>
        <h1 className="title">Tasty Kitchen</h1>
      </div>
      <ul className="header-options">
        <Link to="/" className="link-item">
          <li className="option">Home</li>
        </Link>
        <Link to="/cart" className="link-item">
          <li className="option">Cart</li>
        </Link>
        <li className="option">
          <button
            type="button"
            className="log-out-button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)

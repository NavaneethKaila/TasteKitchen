import {Link} from 'react-router-dom'
import './index.css'
import Header from '../Header'

const NotFound = () => (
  <div>
    <Header />
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/di6osww3h/image/upload/v1635504835/erroring_1_l24gsf.png"
        alt="not found"
      />
      <h1>Page Not Found</h1>
      <p>we are sorry, the page you requested could not be found</p>
      <Link to="/">
        <button type="button" className="log-out-button">
          Home Page
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound

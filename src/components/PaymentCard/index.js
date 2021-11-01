import {AiFillCheckCircle} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const PaymentCard = () => (
  <>
    <Header />
    <div className="payment-container">
      <AiFillCheckCircle />
      <h1>Payment Successful</h1>
      <p>Thank you for ordering Your payment is successfully completed.</p>
      <Link to="/">
        <button type="button" className="log-out-button">
          Go To Home
        </button>
      </Link>
    </div>
  </>
)

export default PaymentCard

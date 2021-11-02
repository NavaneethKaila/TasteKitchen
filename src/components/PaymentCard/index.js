import {AiFillCheckCircle} from 'react-icons/ai'
import {Link} from 'react-router-dom'

import './index.css'

const PaymentCard = () => (
  <div className="payment-container">
    <AiFillCheckCircle color="#22C55E" size={30} />
    <h1>Payment Successful</h1>
    <p>Thank you for ordering Your payment is successfully completed.</p>
    <Link to="/">
      <button type="button" className="log-out-button">
        Go To Home
      </button>
    </Link>
  </div>
)

export default PaymentCard

import {BiRupee} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import Header from '../Header'
import CartItem from '../CartItem'
import './index.css'
import Footer from '../Footer'
import PaymentCard from '../PaymentCard'

const Cart = () => {
  const stringifiedCartList = localStorage.getItem('CartData')
  const cartList = JSON.parse(stringifiedCartList)
  console.log(cartList)
  console.log(typeof cartList)
  const shouldShowCartListProducts = cartList.length !== 0

  const onPlaceOrder = () => <PaymentCard />

  const renderTotalPrice = () => {
    let totalPrice = 0

    cartList.forEach(eachCartItem => {
      totalPrice += eachCartItem.price * eachCartItem.quantity
    })

    return (
      <div>
        <div className="total-price-container">
          <BiRupee />
          <p testid="total-price">{totalPrice}</p>
        </div>
        <button type="button" className="log-in-button" onClick={onPlaceOrder}>
          Place Order
        </button>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <Header />
      <div>
        {shouldShowCartListProducts ? (
          <div className="cart-item-products-price-container">
            <ul className="cart-item-products-container">
              {cartList.map(eachCartItem => (
                <CartItem key={eachCartItem.id} details={eachCartItem} />
              ))}
            </ul>
            <hr className="hr-line" />
            <div className="cart-summary-container">
              <h1>Order Total:</h1>
              <div>{renderTotalPrice()}</div>
            </div>
          </div>
        ) : (
          <div className="empty-cart-container">
            <img
              src="https://res.cloudinary.com/di6osww3h/image/upload/v1635655658/cooking_1_vhrlmy.png"
              alt="empty cart"
            />
            <h1>No Order Yet!</h1>
            <p>Your cart is empty. Add something from the menu.</p>
            <Link to="/">
              <button type="button" className="log-out-button">
                Order now
              </button>
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Cart

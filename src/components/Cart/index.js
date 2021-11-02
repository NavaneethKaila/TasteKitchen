import {BiRupee} from 'react-icons/bi'
import {AiFillCheckCircle} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import Header from '../Header'
import CartItem from '../CartItem'
import './index.css'
import Footer from '../Footer'

// import PaymentCard from '../PaymentCard'

const Cart = () => {
  const getCartDataListFromLocalStorage = () => {
    const cartDataList = JSON.parse(localStorage.getItem('CartData'))
    if (cartDataList === null) {
      return []
    }
    return cartDataList
  }

  const cartDataList = getCartDataListFromLocalStorage()

  const onPlaceOrder = () => (
    // localStorage.removeItem('CartData')

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

  const removeCartItem = id => {
    const updatedCartDataList = cartDataList.filter(
      eachCartItem => eachCartItem.id !== id,
    )
    localStorage.setItem('CartData', JSON.stringify(updatedCartDataList))
  }

  const decrementCartItemQuantity = id => {
    const productObject = cartDataList.find(
      eachCartItem => eachCartItem.id === id,
    )
    if (productObject > 1) {
      const updatedCartDataList = cartDataList.map(eachCartItem => {
        if (eachCartItem.id === id) {
          return {...eachCartItem, quantity: eachCartItem.quantity + 1}
        }
        return eachCartItem
      })
      localStorage.setItem('CartData', JSON.stringify(updatedCartDataList))
    } else {
      removeCartItem(id)
    }
  }

  const incrementCartItemQuantity = id => {
    const updatedCartDataList = cartDataList.map(eachCartItem => {
      if (eachCartItem.id === id) {
        return {...eachCartItem, quantity: eachCartItem.quantity + 1}
      }
      return eachCartItem
    })
    localStorage.setItem('CartData', JSON.stringify(updatedCartDataList))
  }

  const renderCartItemProducts = () => (
    <ul className="cart-item-products-container">
      {cartDataList.map(eachCartItem => (
        <CartItem
          key={eachCartItem.id}
          details={eachCartItem}
          incrementCartItemQuantity={incrementCartItemQuantity}
          decrementCartItemQuantity={decrementCartItemQuantity}
        />
      ))}
    </ul>
  )

  const renderTotalPrice = () => {
    let totalPrice = 0
    cartDataList.forEach(eachCartItem => {
      totalPrice += eachCartItem.quantity + eachCartItem.cost
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

  const shouldShowCartListProducts = cartDataList.length !== 0
  return (
    <div className="cart-container">
      <Header />
      <div>
        {shouldShowCartListProducts ? (
          <div className="cart-item-products-price-container">
            {renderCartItemProducts()}
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

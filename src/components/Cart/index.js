import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import Header from '../Header'
import CartItem from '../CartItem'
import './index.css'
import Footer from '../Footer'

import PaymentCard from '../PaymentCard'

class Cart extends Component {
  state = {isPaid: false, cartDataList: []}

  componentDidMount() {
    this.getCartDataListFromLocalStorage()
  }

  getCartDataListFromLocalStorage = () => {
    const updatedCartDataList = JSON.parse(localStorage.getItem('cartData'))
    this.setState({cartDataList: updatedCartDataList})
  }

  onPlaceOrder = () => {
    this.setState({isPaid: true})
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartDataList: prevState.cartDataList.filter(
        eachCartItem => eachCartItem.id !== id,
      ),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartDataList} = this.state
    const productObject = cartDataList.find(
      eachCartItem => eachCartItem.id === id,
    )
    if (productObject.quantity > 1) {
      this.setState(prevState => ({
        cartDataList: prevState.cartDataList.map(eachCartItem => {
          if (eachCartItem.id === id) {
            return {...eachCartItem, quantity: eachCartItem.quantity - 1}
          }
          return eachCartItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartDataList: prevState.cartDataList.map(eachCartItem => {
        if (eachCartItem.id === id) {
          return {...eachCartItem, quantity: eachCartItem.quantity + 1}
        }
        return eachCartItem
      }),
    }))
  }

  renderTotalPrice = () => {
    const {cartDataList} = this.state
    let totalPrice = 0
    cartDataList.forEach(eachCartItem => {
      totalPrice += eachCartItem.quantity * eachCartItem.cost
    })

    return (
      <div>
        <div className="total-price-container">
          <BiRupee />
          <p testid="total-price">{totalPrice}</p>
        </div>
        <button
          type="button"
          className="log-in-button"
          onClick={this.onPlaceOrder}
        >
          Place Order
        </button>
      </div>
    )
  }

  renderEmptyCartView = () => (
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
  )

  renderCartListView = () => {
    const {cartDataList} = this.state
    const shouldShowCartListProducts = cartDataList.length !== 0
    return shouldShowCartListProducts ? (
      <div className="cart-item-products-price-container">
        <ul className="cart-item-products-container">
          {cartDataList.map(eachCartItem => (
            <CartItem
              key={eachCartItem.id}
              details={eachCartItem}
              incrementCartItemQuantity={this.incrementCartItemQuantity}
              decrementCartItemQuantity={this.decrementCartItemQuantity}
            />
          ))}
        </ul>
        <hr className="hr-line" />
        <div className="cart-summary-container">
          <h1>Order Total:</h1>
          <div>{this.renderTotalPrice()}</div>
        </div>
      </div>
    ) : (
      this.renderEmptyCartView()
    )
  }

  render() {
    const {isPaid} = this.state
    return (
      <div className="cart-container">
        <Header />
        <div>{isPaid ? <PaymentCard /> : this.renderCartListView()}</div>
        <Footer />
      </div>
    )
  }
}

export default Cart

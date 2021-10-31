import Header from '../Header'
import CartItem from '../CartItem'
import './index.css'
import Footer from '../Footer'

const Cart = () => {
  const stringifiedCartList = localStorage.getItem('CartData')
  console.log(stringifiedCartList)
  const cartList = JSON.parse(stringifiedCartList)
  console.log(typeof cartList)
  const shouldShowCartListProducts = cartList.length !== 0
  console.log(shouldShowCartListProducts)
  return (
    <div className="cart-container">
      <Header />
      <div>
        {shouldShowCartListProducts ? (
          <ul>
            {cartList.map(eachCartItem => (
              <CartItem key={eachCartItem.id} details={eachCartItem} />
            ))}
          </ul>
        ) : (
          <div className="empty-cart-container">
            <img
              src="https://res.cloudinary.com/di6osww3h/image/upload/v1635655658/cooking_1_vhrlmy.png"
              alt="empty cart"
            />
            <h1>No Order Yet!</h1>
            <p>Your cart is empty. Add something from the menu.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Cart

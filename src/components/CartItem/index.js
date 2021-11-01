import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {BiRupee} from 'react-icons/bi'
import './index.css'

const CartItem = props => {
  const {details, incrementCartItemQuantity, decrementCartItemQuantity} = props
  const {id, imageUrl, name, quantity, cost} = details

  const onClickDecrement = () => {
    decrementCartItemQuantity(id)
  }

  const onClickIncrement = () => {
    incrementCartItemQuantity(id)
  }

  const renderPriceOfItem = () => {
    const price = cost * quantity
    return (
      <div className="price-container">
        <BiRupee />
        <p>{price}</p>
      </div>
    )
  }

  return (
    <li className="item" testid="cartItem">
      <div className="item-image-container">
        <img src={imageUrl} alt={name} className="cart-item-image" />
        <h1 className="cart-item-name">{name}</h1>
      </div>
      <div className="item-quantity-container">
        <button
          type="button"
          className="quantity-controller-button"
          testid="decrement-quantity"
          onClick={onClickDecrement}
        >
          <BsDashSquare color="#52606D" size={20} />
        </button>
        <p className="cart-quantity" testid="item-quantity">
          {quantity}
        </p>
        <button
          type="button"
          className="quantity-controller-button"
          testid="increment-quantity"
          onClick={onClickIncrement}
        >
          <BsPlusSquare color="#52606D" size={20} />
        </button>
      </div>
      <div>{renderPriceOfItem()}</div>
    </li>
  )
}

export default CartItem

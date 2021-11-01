import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import './index.css'

class FoodItemCard extends Component {
  state = {quantity: 0}

  addProductItem = () => {
    const {details, onAddProduct} = this.props
    const {quantity} = this.state
    onAddProduct({...details, quantity})
    console.log(quantity)
  }

  addItemBtn = () => {
    this.setState(
      prevState => ({
        quantity: prevState.quantity + 1,
      }),
      this.addProductItem,
    )
  }

  onClickIncrement = () => {
    const {incrementProductQuantity, details} = this.props
    const {id} = details
    this.setState(
      prevState => ({
        quantity: prevState.quantity + 1,
      }),
      incrementProductQuantity(id),
    )
  }

  onClickDecrement = () => {
    const {decrementProductQuantity, details} = this.props
    const {id} = details
    this.setState(
      prevState => ({
        quantity: prevState.quantity - 1,
      }),
      decrementProductQuantity(id),
    )
  }

  render() {
    const {quantity} = this.state
    const {details} = this.props
    const {imageUrl, name, cost, rating} = details

    return (
      <li className="food-item" testid="foodItem">
        <img src={imageUrl} alt="" className="food-item-image" />
        <div>
          <h1 className="food-name">{name}</h1>
          <div className="cost-container">
            <BiRupee />
            <p>{cost}</p>
          </div>
          <p>
            <AiFillStar className="star" /> {rating}
          </p>
          {quantity === 0 ? (
            <button
              type="button"
              className="add-button"
              onClick={this.addItemBtn}
            >
              Add
            </button>
          ) : (
            <div className="item-quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                testid="decrement-count"
                onClick={this.onClickDecrement}
              >
                <BsDashSquare color="#52606D" size={20} />
              </button>
              <p className="cart-quantity" testid="active-count">
                {quantity}
              </p>
              <button
                type="button"
                className="quantity-controller-button"
                testid="increment-count"
                onClick={this.onClickIncrement}
              >
                <BsPlusSquare color="#52606D" size={20} />
              </button>
            </div>
          )}
        </div>
      </li>
    )
  }
}

export default FoodItemCard

import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const FoodItemCard = props => {
  const {details, onAddProduct} = props
  const {id, imageUrl, name, cost, rating} = details

  const addItem = () => {
    const product = {cost, id, imageUrl, name}
    console.log(product)
    onAddProduct(product)
  }
  return (
    <li className="food-item" testid="foodItem">
      <img src={imageUrl} alt="" className="food-item-image" />
      <div>
        <h1 className="food-name">{name}</h1>
        <div className="price-container">
          <BiRupee />
          <p>{cost}</p>
        </div>
        <p>
          <AiFillStar className="star" /> {rating}
        </p>
        <button type="button" className="add-button" onClick={addItem}>
          Add
        </button>
      </div>
    </li>
  )
}

export default FoodItemCard

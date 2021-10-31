import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const RestaurantCard = props => {
  const {details} = props
  const {id, imageUrl, name, cuisine, userRating} = details
  const {rating, totalReviews} = userRating
  return (
    <Link to={`/restaurant/${id}`} className="item">
      <li>
        <div className="restaurant">
          <img src={imageUrl} alt="restaurant" className="restaurant-image" />
          <div className="content-container">
            <h1 className="name">{name}</h1>
            <p className="menu-type">{cuisine}</p>
            <div className="star-reviews-container">
              <p className="rating">
                <AiFillStar className="star" /> {rating}
              </p>
              <p className="review">({totalReviews} rating)</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantCard

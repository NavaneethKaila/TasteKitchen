import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import FoodItemCard from '../FoodItemCard'
import './index.css'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    restaurantDetailsData: {},
    cartList: [],
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getFormattedData = data => ({
    rating: data.rating,
    id: data.id,
    name: data.name,
    costForTwo: data.cost_for_two,
    cuisine: data.cuisine,
    imageUrl: data.image_url,
    reviewsCount: data.reviews_count,
    opens_at: data.opens_at,
    location: data.location,
    itemsCount: data.items_count,
    foodItems: data.food_items.map(item => ({
      name: item.name,
      cost: item.cost,
      foodType: item.food_type,
      imageUrl: item.image_url,
      rating: item.rating,
      id: item.id,
    })),
  })

  getRestaurantDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData)
      this.setState({
        restaurantDetailsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  removeProduct = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(
        eachCartItem => eachCartItem.id !== id,
      ),
    }))
  }

  decrementProductQuantity = id => {
    const {cartList} = this.state
    const productObject = cartList.find(eachCartItem => eachCartItem.id === id)
    if (productObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (eachCartItem.id === id) {
            const updatedQuantity = eachCartItem.quantity - 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      this.removeProduct(id)
    }
  }

  incrementProductQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (eachCartItem.id === id) {
          const updatedQuantity = eachCartItem.quantity + 1
          return {...eachCartItem, quantity: updatedQuantity}
        }
        return eachCartItem
      }),
    }))
  }

  onAddProduct = product => {
    this.setState(prevState => ({
      cartList: [...prevState.cartList, product],
    }))
  }

  renderRestaurantDetailsView = () => {
    const {restaurantDetailsData} = this.state
    const {
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      reviewsCount,
      costForTwo,
      foodItems,
    } = restaurantDetailsData
    return (
      <div>
        <div className="bg-container">
          <img
            src={imageUrl}
            alt="restaurant"
            className="specific-restaurant-image"
          />
          <div className="content-container">
            <h1 className="restaurant-name">{name}</h1>
            <p>{cuisine}</p>
            <p>{location}</p>
            <div className="rating-price-container">
              <div>
                <p>
                  <AiFillStar /> {rating}
                </p>
                <p>{reviewsCount}+ Ratings</p>
              </div>
              <hr className="vr-line" />
              <div>
                <p>
                  <BiRupee /> {costForTwo}
                </p>
                <p>Cost For Two</p>
              </div>
            </div>
          </div>
        </div>
        <ul className="food-items-container">
          {foodItems.map(eachItem => (
            <FoodItemCard
              key={eachItem.id}
              details={eachItem}
              onAddProduct={this.onAddProduct}
              incrementProductQuantity={this.incrementProductQuantity}
              decrementProductQuantity={this.decrementProductQuantity}
            />
          ))}
        </ul>
        <Footer />
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="list-loader" testid="restaurant-details-loader">
      <Loader type="TailSpin" height={50} width={50} />
    </div>
  )

  renderRestaurantDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderRestaurantDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {cartList} = this.state
    console.log(JSON.stringify(cartList))
    localStorage.setItem('cartData', JSON.stringify(cartList))
    return (
      <div>
        <Header />
        {this.renderRestaurantDetails()}
      </div>
    )
  }
}

export default RestaurantDetails

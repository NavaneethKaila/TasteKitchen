import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdSort} from 'react-icons/md'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import RestaurantCard from '../RestaurantCard'
import Footer from '../Footer'
import ReactSlider from '../ReactSlider'
import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    activeOptionValue: sortByOptions[1].value,
    apiStatus: apiStatusConstants.initial,
    restaurantsData: [],
  }

  componentDidMount() {
    this.getRestaurantsOffersList()
  }

  getFormattedData = data => ({
    hasOnlineDelivery: data.has_online_delivery,
    userRating: {
      ratingText: data.user_rating.rating_text,
      ratingColor: data.user_rating.rating_color,
      totalReviews: data.user_rating.total_reviews,
      rating: data.user_rating.rating,
    },
    name: data.name,
    hasTableBooking: data.has_table_booking,
    isDeliveringNow: data.is_delivering_now,
    costForTwo: data.cost_for_two,
    cuisine: data.cuisine,
    imageUrl: data.image_url,
    id: data.id,
    menuType: data.menu_type,
    location: data.location,
    opensAt: data.opens_at,
    groupByTime: data.group_by_time,
  })

  getRestaurantsOffersList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeOptionValue} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=0&limit=9&sort_by_rating=${activeOptionValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.restaurants.map(eachRestaurant =>
        this.getFormattedData(eachRestaurant),
      )
      this.setState({
        restaurantsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  onChangeOptionValue = event => {
    this.setState(
      {activeOptionValue: event.target.value},
      this.getRestaurantsOffersList,
    )
  }

  renderRestaurantsOffersList = () => {
    const {restaurantsData} = this.state
    return (
      <ul className="restaurants-list-container">
        {restaurantsData.map(eachItem => (
          <RestaurantCard key={eachItem.id} details={eachItem} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="list-loader" testid="restaurants-list-loader">
      <Loader type="TailSpin" height={50} width={50} />
    </div>
  )

  renderRestaurants = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderRestaurantsOffersList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {activeOptionValue} = this.state
    return (
      <div className="home-container">
        <Header />
        <ReactSlider />
        <div className="restaurants-offers">
          <h1 className="home-heading">Popular Restaurants</h1>
          <div className="paragraph-options-container">
            <p className="home-paragraph">
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
            <div className="sort-by-container">
              <MdSort className="sort-by-icon" />
              <p>Sort By</p>
              <select
                value={activeOptionValue}
                className="select-option"
                onChange={this.onChangeOptionValue}
              >
                {sortByOptions.map(eachOption => (
                  <option value={eachOption.value} key={eachOption.id}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <hr className="hr-line" />
          {this.renderRestaurants()}
          <Footer />
        </div>
      </div>
    )
  }
}

export default Home

import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ReactSlider extends Component {
  state = {carouselData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCarouselData()
  }

  getCarouselData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
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
      const updatedData = fetchedData.offers.map(eachOffer => ({
        imageUrl: eachOffer.image_url,
        id: eachOffer.id,
      }))
      this.setState({
        carouselData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderCarouselView = () => {
    const {carouselData} = this.state
    const settings = {
      dots: true,
    }
    return (
      <ul className="container">
        <Slider {...settings}>
          {carouselData.map(eachOffer => {
            const {id, imageUrl} = eachOffer
            return (
              <li key={id}>
                <img src={imageUrl} alt="offer" className="offer-image" />
              </li>
            )
          })}
        </Slider>
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="list-loader" testid="restaurants-offers-loader">
      <Loader type="TailSpin" height={50} width={50} />
    </div>
  )

  renderCarousel = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCarouselView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderCarousel()}</div>
  }
}

export default ReactSlider

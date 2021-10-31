// import {Component} from 'react'
import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-bg-container">
    <img
      src="https://res.cloudinary.com/di6osww3h/image/upload/v1635381651/Frame_274_lmbl28.png"
      alt="website-footer-logo"
      className="footer-logo"
    />
    <h1 className="footer-heading">Tasty Kitchen</h1>
    <p className="footer-content">
      The only thing we are serious about is food. Contact us on
    </p>
    <div className="icons-container">
      <FaPinterestSquare
        className="social-icon"
        testid="pintrest-social-icon"
      />
      <FaInstagram className="social-icon" testid="instagram-social-icon" />
      <FaTwitter className="social-icon" testid="twitter-social-icon" />
      <FaFacebookSquare className="social-icon" testid="facebook-social-icon" />
    </div>
  </div>
)

export default Footer

// export default function Footer() {
//   return (
//     <div>
//       <h1>Footer </h1>
//     </div>
//   )
// }

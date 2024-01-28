import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './navbar.styles.css'

function Navbar() {
    return (
        <div className='navbar-cont'>
            <div className='navbar-cont-img'>
                <Link to='/'>
                    <img src="https://cdn-4.motorsport.com/images/amp/68ey3q40/s1000/f1-abu-dhabi-gp-2017-f1-logo-6614911.webp" alt="Logo F1" />
                </Link>
            </div>
            <div className='navbar-cont-links'>
                <Link className='navbar-link' to='/home'><p>Home</p></Link>
                <Link className='navbar-link' to='/create'><p>Form</p></Link>
            </div>
            
        </div>
    );
}

export default Navbar;
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './navbar.styles.css'

function Navbar() {
    return (
        <div className='navbar-box'>
            
            <Link className='navbar-link' to='/home'><p>Home</p></Link>
            <Link className='navbar-link' to='/create'><p>Form</p></Link>
            
        </div>
    );
}

export default Navbar;
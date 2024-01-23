import Navbar from '../../components/navbar/navbar.component';
import Cards from '../../components/cards/cards.component';

import './home.styles.css'

function Home() {
    return (
        <div className='home'>
            <h1 className='home-title'>Home page</h1>
            <Navbar/>
            <Cards/>
        </div>
    );
}

export default Home;
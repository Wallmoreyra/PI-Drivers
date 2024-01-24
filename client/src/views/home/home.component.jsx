import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getDrivers } from '../../redux/actions';

import Navbar from '../../components/navbar/navbar.component';
import Cards from '../../components/cards/cards.component';

import './home.styles.css'

function Home() {
    const dispatch = useDispatch();
    const allDrivers = useSelector((state) => state.allDrivers);

    useEffect(() => {
        dispatch(getDrivers())
        // return (() => {
        //     cllearDetail()
        // })
    },[dispatch])

    return (
        <div className='home'>
            <h1 className='home-title'>Home page</h1>
            <Navbar/>
            <Cards allDrivers = {allDrivers} />
        </div>
    );
}

export default Home;
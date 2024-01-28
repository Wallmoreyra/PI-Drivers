import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getByName, getDrivers } from '../../redux/actions/actions';

import Navbar from '../../components/navbar/navbar.component';
import Searchbar from '../../components/serchBar/searchbar.component';
import Cards from '../../components/cards/cards.component';

import './home.styles.css'

function Home() {
    const dispatch = useDispatch();
    const allDrivers = useSelector((state) => state.allDrivers);
    const [searchString, setSearchString] = useState("");

    function handleChange(e){
        e.preventDefault(); //sirve para que la pag no se re-renderice
        setSearchString(e.target.value)
    }

    //* Filtro con el backend

    function handleSubmit (e){
        e.preventDefault();
        dispatch(getByName(searchString))
    }

    

    //* Filtro sobre el estado!!!!!
    // const [filtered, setFiltered] = useState(allDrivers);
    // const [searchString, setSearchString] = useState("");

    // function handleChange(e){
    //     e.preventDefault(); //sirve para que la pag no se re-renderice
    //     setSearchString(e.target.value)
    // }

    // function handleSubmit(e){
    //     e.preventDefault();
    //     const filtered = allDrivers.filter((driver) => 
    //         driver.name.includes(searchString)
    //     );
    //     setFiltered(filtered);
    // }

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
            <Searchbar handleChange={handleChange} handleSubmit={handleSubmit}/>
            <Cards  allDrivers = {allDrivers}/>
        </div>
    );
}

export default Home;
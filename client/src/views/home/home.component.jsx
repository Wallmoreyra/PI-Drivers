import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getByName, getDrivers, page, driversFilter, resetDrivers, driverByTeam } from '../../redux/actions/actions';

import Navbar from '../../components/navbar/navbar.component';
import Searchbar from '../../components/serchBar/searchbar.component';
import Cards from '../../components/cards/cards.component';

import './home.styles.css'

function Home() {
    const dispatch = useDispatch();
    const allDrivers = useSelector(state => state.allDrivers);
    const [searchString, setSearchString] = useState("");

    // HOOKS
    useEffect(() => {
        dispatch(getDrivers())
    },[dispatch])

    function handleChange(e){
        e.preventDefault(); //sirve para que la pag no se re-renderice
        setSearchString(e.target.value)
    }

    //* Filtro con el backend

    function handleSubmit (e){
        e.preventDefault();
        dispatch(getByName(searchString))
    }


    const pagination = (e) => {
        dispatch(page(e.target.name))
    }
    const filters = (e) => {
        dispatch(driversFilter(e.target.name))
    }
    const reset = (e) => {
        dispatch(resetDrivers())
    }
    const teamsSearch = () => {
        const teamInput = document.getElementsByName('teamInput')[0];
        const teamValue = teamInput.value;
        dispatch((driverByTeam(teamValue)));
    }

    return (
        <div className='home'>
            <Navbar/>      
            <Searchbar handleChange={handleChange} handleSubmit={handleSubmit}/>
            <div>
                <label>Busqueda por team</label>
                <input name='teamInput' placeholder='Team'  type='search' />
                <button type='submit' onClick={teamsSearch}>Buscar</button>
            </div>
            <div>
                <button onClick={reset}>Resetear las cards</button>
            </div>
            <div>
                <label>Filtros</label>
                <button name='AZ' onClick={filters}>A-Z</button>
                <button name='ZA' onClick={filters}>Z-A</button>
                <button name='API' onClick={filters}>API</button>
                <button name='DB' onClick={filters}>DB</button>
                <button name='DOBUP' onClick={filters}>DoB UP</button>
                <button name='DOBDOWN' onClick={filters}>DoB DOWN</button>
            </div>
            <div>
                <label>Paginado</label>
                <button name='prev' onClick={pagination}>Prev</button>
                <button name='next' onClick={pagination}>Next</button>
            </div>
            <div className='container-cards'>
                <Cards  allDrivers = {allDrivers}/>
            </div>
        </div>
    );
}

export default Home;
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
            <div className='home-cont-opciones'>
                <div className='home-cont-barras-busqueda'>
                    <p>Busqueda</p>
                    <Searchbar handleChange={handleChange} handleSubmit={handleSubmit}/>
                    <div className='home-cont-barras-busq-team'>
                        <label>Por Team:</label>
                        <input name='teamInput' placeholder='Team'  type='search' />
                        <button className='home-cont-barras-busq-team-botton' type='submit' onClick={teamsSearch}>Buscar</button>
                    </div>
                </div>      
                <div className='home-cont-pag-reset'>
                    <button className='home-cont-pag-boton-reset' onClick={reset}>Reset</button>
                    <div className='home-cont-pag'>
                        <button className='home-cont-pag-boton' name='prev' onClick={pagination}>Prev</button>
                        <label>Paginado</label>
                        <button className='home-cont-pag-boton' name='next' onClick={pagination}>Next</button>
                    </div>
                </div>
                <div className='home-cont-filtros'>
                    <div className='home-cont-filtros-alfa'>
                        <label>Filtro Alfa </label>
                        <button name='AZ' onClick={filters}>A-Z</button>
                        <button name='ZA' onClick={filters}>Z-A</button>
                    </div>
                    <div className='home-cont-filtros-info'>
                        <label>Filtro Info </label>
                        <button name='API' onClick={filters}>API</button>
                        <button name='DB' onClick={filters}>DB</button>
                    </div>
                    <div className='home-cont-filtros-fecha'>
                        <label>Filtro fecha </label>
                        <button name='DOBUP' onClick={filters}>DoB UP</button>
                        <button name='DOBDOWN' onClick={filters}>DoB DOWN</button>
                    </div>
                </div>
            </div>
            <div>
                <div className='container-cards'>
                    <Cards  allDrivers = {allDrivers}/>
                </div>
            </div>
            
            
        </div>
    );
}

export default Home;
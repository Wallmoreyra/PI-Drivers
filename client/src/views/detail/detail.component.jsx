import './detail.styles.css'


import { useEffect } from 'react';
import { cleanDetail, getById } from '../../redux/actions/actions';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/navbar/navbar.component';

function Detail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const driver = useSelector((state) => state.driver);

    useEffect(() => {
        dispatch(getById(id));
        return () => dispatch(cleanDetail());
    }, [dispatch, id]);



    
    let driverTeams = driver.teams || [];
    //console.log(driver.teams ? driver.teams.length : 0)
    driverTeams = (driverTeams.length > 1) ? driverTeams.join(', ') : driverTeams;

    return (
        <>
            <div>
                <Navbar/>
            </div>
            <div className='detail-container'>
                <div className='detail-image'>
                    <img src={driver.image} alt={`${driver.name} ${driver.surname}`}></img>
                </div>
                <div className='detail-info'>
                    <h3 className='detail-title'>Nombre: {driver.name}</h3>
                    <h5 className='detail-title'>Apellido: {driver.surname}</h5>
                    <h5 className='detail-subtitle'>ID: {driver.id}</h5>
                    <p className='detail-text'>Nacionalidad: {driver.nationality}</p>
                    <p className='detail-text'>Descripcion: {driver.description}</p>
                    <p className='detail-text'>Fecha de Nacimiento: {driver.birthdate}</p>
                    <p className='detail-text'>Escuderias: {`${driverTeams}.`}</p>
                </div>
            </div>
        </>
        
    );
}

export default Detail;
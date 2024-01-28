import { Link } from 'react-router-dom';
import './card.styles.css'

function Card({driver}) {
    //console.log(driver)
    const {id, name, surname, birthdate, teams} = driver

    let equipos = teams || [];
    //console.log(driver.teams ? driver.teams.length : 0)
    equipos = (equipos.length > 1) ? equipos.join(', ') : equipos;

    return (
        <div className='card-container'>
            <Link className='card-container-link' to={`/home/${id}`}>
                <h3>{name} {surname}</h3>
                <p>Imagen</p>
                <p>DoB: {birthdate}</p>
                {/* <p>Escuderias: {team}</p> */}
                <span>{equipos}</span>
            </Link>
        </div>
    );
}

export default Card;
import { Link } from 'react-router-dom';
import './card.styles.css'

function Card({driver}) {
    //console.log(driver)
    const {id, name, surname, birthdate, team} = driver

    return (
        <div className='card-container'>
            <Link to={`/home/${id}`}>
                <h3>{name} {surname}</h3>
                <p>Imagen</p>
                <p>DoB: {birthdate}</p>
                <p>Escuderias: {team}</p>
            </Link>
        </div>
    );
}

export default Card;
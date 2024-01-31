import { Link } from 'react-router-dom';
import './card.styles.css'

function Card({driver}) {
    //console.log(driver)
    const {id, name,image,  surname, birthdate, teams} = driver

    let equipos = teams || [];
    //console.log(driver.teams ? driver.teams.length : 0)
    equipos = (equipos.length > 1) ? equipos.join(', ') : equipos;

    return (
        <div className='card-container'>
            <Link className='card-container-link' to={`/home/${id}`}>
                <div className='cont-img-name'>
                    <div>
                        <img className='card-cont-img' src={image} alt={`img de: ${name}${surname}`} />
                    </div>
                    <div className='card-cont-name-surname'>
                        <h3>{name} {surname}</h3>
                        <p>DoB: {birthdate}</p>
                    </div>
                </div>
                <div className='card-cont-teams'>
                    <span>{equipos}</span>
                </div>    
            </Link>
        </div>
    );
}

export default Card;
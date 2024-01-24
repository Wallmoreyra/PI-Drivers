import './card.styles.css'

function Card({driver}) {
    console.log(driver)

    return (
        <div className='card-container'>
            
            <h3>Nombre - Apellido</h3>
            <p>Imagen</p>
            <p>Fecha de Nacimiento</p>
            <p>Escuderias</p>

        </div>
    );
}

export default Card;
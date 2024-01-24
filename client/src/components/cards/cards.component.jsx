import Card from '../card/card.component';

import './cards.styles.css'

function Cards({allDrivers}) {

    const driverList = allDrivers
    return (
        <div className='card-list'>
            {driverList?.map(driver => 
                <Card driver = {driver}/>)}

            
            {/* <Card />
            <Card />
            <Card />
            <Card /> */}
        </div>
    );
}

export default Cards;
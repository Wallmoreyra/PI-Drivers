import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './landing.styles.css'

function Landing() {

    const images = [
        'https://images2.alphacoders.com/152/152602.jpg',
        'https://images2.alphacoders.com/152/152542.jpg',
        'https://images2.alphacoders.com/134/1342176.jpg',
        'https://images3.alphacoders.com/109/109149.jpg'
    ];

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => {
            clearInterval(intervalId);
        };
    }, [currentImage, images.length]);

    return (
        <>
            <div className='carrusel-container'>
                <div className='contenedor-img'>
                    <img src={images[currentImage]} alt={`Formula 1 Image ${currentImage + 1}`} />
                    <Link to='/home'> <button className='boton-ingreso'><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGrzNK9ESPDZhVQc7ChChyAuC3g2MCSKNA-A&usqp=CAU" alt="F1 logo" /></button> </Link>
                </div>
                {/* <img src={images[currentImage]} alt={`Formula 1 Image ${currentImage + 1}`} /> */}
            </div>
        </>
        
    );
}

export default Landing;
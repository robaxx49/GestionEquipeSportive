import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import basket from '../images/basket.jpg';
import foot from '../images/foot.jpg';
import hockey from '../images/hockey.jpg';
import rugby from '../images/rugby.jpg';
import './css/Slider.css';

function MessagePageAccueil() {
    const data = [
        {
            id: 1,
            image: `${foot}`,
            title: "Gérez votre équipe de sport amateur comme un pro",
            text: `GestionEquipeDeSports est l'appli de référence pour organiser vos matchs et gérer votre équipe de foot, rugby, basket ou tout autre sport.`
        },
        {
            id: 2,
            image: `${basket}`,
            title: "Gérez votre équipe de sport amateur comme un pro",
            text: `GestionEquipeDeSports est l'appli de référence pour organiser vos matchs et gérer votre équipe de foot, rugby, basket ou tout autre sport.`
        },
        {
            id: 3,
            image: `${hockey}`,
            title: "Gérez votre équipe de sport amateur comme un pro",
            text: `GestionEquipeDeSports est l'appli de référence pour organiser vos matchs et gérer votre équipe de foot, rugby, basket ou tout autre sport.`
        },
        {
            id: 4,
            image: `${rugby}`,
            title: "Gérez votre équipe de sport amateur comme un pro",
            text: `GestionEquipeDeSports est l'appli de référence pour organiser vos matchs et gérer votre équipe de foot, rugby, basket ou tout autre sport.`
        }
    ];

    return (
        <Carousel autoPlay infiniteLoop showIndicators={false} showThumbs={false} showStatus={false} showArrows={false}>
            {
                data.map((slide) => (
                    <div key={slide.id}>
                        <div className="overlay">
                            <h1 className="overlay_title">{slide.title}</h1>
                            <p className="overlay_text">{slide.text}</p>
                        </div>

                        <img src={slide.image} alt="sport" />
                    </div>
                ))
            }
        </Carousel>
    );
}

export default MessagePageAccueil;

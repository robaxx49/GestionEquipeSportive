import React from 'react';
import { FaFacebook } from 'react-icons/fa';

export default function BoutonGroupeFacebook({ lien }) {
    const iconSize = 65;
    return (
        lien != null && (

            <a href={lien} target="_blank" rel="noopener noreferrer" className="bouton-facebook">
                <FaFacebook style={{ width: iconSize, height: iconSize }} />
            </a>
        )
    );
}

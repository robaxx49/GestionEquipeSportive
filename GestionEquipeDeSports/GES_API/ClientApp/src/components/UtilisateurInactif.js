import React, { useEffect } from 'react';

const UtilisateurInactif = ({ onLogout }) => {
    useEffect(() => {
        const delay = 5000;

        const timeoutId = setTimeout(() => {
            onLogout();
        }, delay);

        return () => clearTimeout(timeoutId);
    }, [onLogout]);

    return (
        <div className="inactive-user-container">
            <h1 className="inactive-user-heading">Utilisateur Inactif</h1>
            <p className="inactive-user-message">Vous allez être automatiquement déconnecté.</p>
        </div>
    );
};

export default UtilisateurInactif;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function VerificationEtatUtilisateur({ children, utilisateurInactif }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (utilisateurInactif) {
            navigate('/pageUtilisateurInactif');
        }
    }, [utilisateurInactif, navigate]);

    return <>{children}</>;
}

export default VerificationEtatUtilisateur;

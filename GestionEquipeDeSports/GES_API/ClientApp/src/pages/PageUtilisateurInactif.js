import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import UtilisateurInactif from '../components/UtilisateurInactif';
import '../styles/pageUtilisateurInactif.css';

const PageUtilisateurInactif = () => {
    const { logout } = useAuth0();

    return <UtilisateurInactif onLogout={logout} />;
};

export default PageUtilisateurInactif;

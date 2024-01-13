import { useAuth0 } from '@auth0/auth0-react';
import React, { useCallback, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import { PageLoader } from "./components/PageLoader";
import VerificationEtatUtilisateur from './components/VerificationEtatUtilisateur';
import './custom.css';

export default function App() {
    const { isLoading, user, getAccessTokenSilently } = useAuth0();
    const [utilisateurInactif, setUtilisateurInactif] = useState(false);
    const location = useLocation();

    const fetchUtilisateur = useCallback(async () => {
        const token = await getAccessTokenSilently();

        await fetch(`api/utilisateur/${user.email}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setUtilisateurInactif(data.etat === false);
                }
            })
            .catch(err => { console.error(err); });
    }, [getAccessTokenSilently, user]);

    useEffect(() => { // NE PAS RETIRER "location" !!!
        if (!isLoading && user) { fetchUtilisateur(); }
    }, [isLoading, user, fetchUtilisateur, location]);

    if (isLoading) {
        return (
            <div className="page-layout">
                <PageLoader />
            </div>
        );
    }

    return (
        <Layout>
            <Routes>
                {AppRoutes.map((route, index) => {
                    const { element, ...rest } = route;
                    return (
                        <Route
                            key={index}
                            {...rest}
                            element={
                                <VerificationEtatUtilisateur utilisateurInactif={utilisateurInactif}>
                                    {element}
                                </VerificationEtatUtilisateur>
                            }
                        />
                    );
                })}
            </Routes>
        </Layout>
    );
}

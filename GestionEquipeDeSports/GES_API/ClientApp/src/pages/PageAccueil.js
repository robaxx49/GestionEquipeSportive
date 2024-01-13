import { useAuth0 } from "@auth0/auth0-react";
import React, { useCallback, useEffect, useState } from 'react';
import MessagePageAccueil from '../components/MessagePageAccueil';
import { PageAccueilEntraineur } from './PageAccueilEntraineur';
import PageInscription from './PageInscription';

export function PageAccueil() {
    const { isLoading, isAuthenticated, user, getAccessTokenSilently } = useAuth0();
    const [userEstDansLaBD, setUserEstDansLaBD] = useState(false);
    const [estPret, setEstPret] = useState(false);

    const getUtilisateur = useCallback(async () => {
        if (isAuthenticated) {
            const token = await getAccessTokenSilently();

            await fetch(`api/utilisateur/${user.name}`, {
                headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
            })
                .then(response => {
                    if (response.ok) return response.json();
                    else console.error("Response status not OK");
                })
                .then(data => {
                    if (data) setUserEstDansLaBD(true);
                    setEstPret(true);
                })
                .catch(err => { console.error(err); });
        }
    }, [getAccessTokenSilently, isAuthenticated, user]);

    useEffect(() => {
        getUtilisateur();
    }, [getUtilisateur]);

    return (
        <div>
            {!isLoading && (
                isAuthenticated ? (
                    estPret && (
                        (userEstDansLaBD ? <PageAccueilEntraineur /> : <PageInscription />)
                    )
                ) : (<MessagePageAccueil />)
            )}
        </div>
    );
}

export default PageAccueil;

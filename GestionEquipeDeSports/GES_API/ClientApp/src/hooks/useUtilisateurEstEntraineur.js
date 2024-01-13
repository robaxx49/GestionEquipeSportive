import { useAuth0 } from '@auth0/auth0-react';
import { useCallback } from 'react';

export function useUtilisateurEstEntraineur(idEquipe) {
    const { getAccessTokenSilently } = useAuth0();

    const getEstEntraineurDepuisMail = useCallback(async (email) => {
        const token = await getAccessTokenSilently();
        const resultat = await fetch(`api/UtilisateurEquipeRole/${email}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        });

        if (!resultat.ok) { throw new Error("pas de rôle"); }

        const body = await resultat.json();

        if (body.length !== 0) {
            for (let i = 0; i < body.length; i++) {
                if (body[i].fkIdEquipe === idEquipe && body[i].fkIdRole === 1) {
                    return true;
                }
            }
        }
        else return false;
    }, [getAccessTokenSilently, idEquipe]);

    return { getEstEntraineurDepuisMail };
}

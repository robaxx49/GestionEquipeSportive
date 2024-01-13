import { useAuth0 } from "@auth0/auth0-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";

function AfficherPageEnFonctionDuRole({ estDansLaBD }) {
    const [roleDeLUtilisateur, setRoleDeLUtilisateur] = useState(-1);
    const [etatDeLUtilisateur, setEtatDeLUtilisateur] = useState(-1);
    const [estPret, setEstPret] = useState(false);
    const navigate = useNavigate();
    const { loginWithRedirect, logout, user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    const fetchUtilisateur = useCallback(async () => {
        const token = await getAccessTokenSilently();

        await fetch(`api/utilisateur/${user.email}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setRoleDeLUtilisateur(data.fkIdRoles);
                    setEtatDeLUtilisateur(data.etat);
                }
            })
            .catch((err) => {
                console.error(err);
            });
        setEstPret(true);
    }, [getAccessTokenSilently, user]);

    const utilisateurInactif = useMemo(() => {
        return etatDeLUtilisateur === false;
    }, [etatDeLUtilisateur]);

    useEffect(() => {
        if (isAuthenticated && estDansLaBD) {
            fetchUtilisateur();
        }
    }, [estDansLaBD, fetchUtilisateur, isAuthenticated]);

    useEffect(() => {
        if (utilisateurInactif) {
            navigate("/pageUtilisateurInactif");
        }
    }, [utilisateurInactif, navigate]);

    function MenuAAfficher() {
        if (isAuthenticated && estDansLaBD) {
            if (roleDeLUtilisateur === 0) {
                return (
                    <Nav className="ml-auto">
                        <NavItem>
                            <NavLink tag={Link} to="/pageAccueil">
                                Accueil
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/evenements">
                                Événements
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/equipes">
                                Équipes
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/utilisateurs">
                                Utilisateurs
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                tag={Link}
                                to="/rejoindreUneEquipe"
                            >
                                Rejoindre une équipe
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                tag={Link}
                                onClick={() =>
                                    logout({ logoutParams: { returnTo: window.location.origin } })
                                }
                            >
                                Déconnexion
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/afficherUtilisateur">
                                Profil
                            </NavLink>
                        </NavItem>
                    </Nav>
                );
            } else {
                return (
                    <Nav className="ml-auto">
                        <NavItem>
                            <NavLink tag={Link} to="/pageAccueil">
                                Ma page d'accueil
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/rejoindreUneEquipe">
                                Rejoindre une équipe
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                onClick={() =>
                                    logout({ logoutParams: { returnTo: window.location.origin } })
                                }
                            >
                                Déconnexion
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/afficherUtilisateur">
                                Profil
                            </NavLink>
                        </NavItem>
                    </Nav>
                );
            }
        } else {
            return (
                <Nav className="ml-auto">
                    <NavItem>
                        <NavLink onClick={() => loginWithRedirect()}>
                            Connexion
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={() =>
                                loginWithRedirect({
                                    authorizationParams: {
                                        screen_hint: "signup",
                                    },
                                })
                            }
                        >
                            <span className="text-success">Inscription</span>
                        </NavLink>
                    </NavItem>
                </Nav>
            );
        }
    }

    return (
        estPret && (
            <>
                <MenuAAfficher />
            </>
        )
    );
}

export default AfficherPageEnFonctionDuRole;

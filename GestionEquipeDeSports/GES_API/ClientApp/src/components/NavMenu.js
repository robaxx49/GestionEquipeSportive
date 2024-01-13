import { useAuth0 } from '@auth0/auth0-react';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import logo from '../images/logo.png';
import '../styles/nav-menu.css';
import AfficherPageEnFonctionDuRole from './AfficherPageEnFonctionDuRole';
import Profile from './Profile.js';
import { TitreGES } from "./TitreGES";

function withMyHook(Component) {
    return function WrappedComponent(props) {
        const { user, getAccessTokenSilently, loginWithRedirect, logout, isLoading, isAuthenticated } = useAuth0();
        const [userEstDansLaBD, setUserEstDansLaBD] = useState(false);
        const [estPret, setEstPret] = useState(false);

        const getUtilisateur = useCallback(async () => {
            if (isAuthenticated) {
                const token = await getAccessTokenSilently();

                await fetch(`api/utilisateur/${user.name}`, {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`
                    },
                }).then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                }).then(data => {
                    if (data) {
                        setUserEstDansLaBD(true);
                    }
                }).catch(err => {
                    console.error(err);
                });
            }

            setEstPret(true);
        }, [getAccessTokenSilently, isAuthenticated, user]);

        useEffect(() => {
            getUtilisateur();
        }, [getUtilisateur]);

        return (
            <Component {...props}
                loginWithRedirect={loginWithRedirect}
                logout={logout}
                isLoading={isLoading}
                isAuthenticated={isAuthenticated}
                userEstDansLaBD={userEstDansLaBD}
                estPret={estPret}
            />
        );
    };
}

class NavMenu extends React.Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        const { isAuthenticated, userEstDansLaBD, logout, isLoading, loginWithRedirect, estPret } = this.props;

        return !isLoading && estPret && (
            <Navbar className="navbar-expand-sm navbar-dark bg-custom mb-3">
                <NavItem className='d-flex align-items-center me-1'>
                    <NavLink tag={Link} to="/">
                        <img src={logo} className="App-logo" alt="logo" />
                    </NavLink>
                </NavItem>

                <NavbarBrand tag={Link} to="/"><TitreGES /></NavbarBrand>

                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />

                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                    <Nav className="navbar-nav flex-grow">
                        {isAuthenticated ? (
                            userEstDansLaBD ? (
                                <>
                                    <AfficherPageEnFonctionDuRole estDansLaBD={userEstDansLaBD} />
                                    <Profile />
                                </>
                            ) : (
                                <>
                                    <NavItem>
                                        <NavLink tag={Link} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                                            Déconnexion
                                        </NavLink>
                                    </NavItem>
                                    <Profile />
                                </>
                            )
                        ) : (
                            <>
                                <NavItem>
                                    <NavLink tag={Link} onClick={() => loginWithRedirect({
                                        authorizationParams: { screen_hint: "signup" },
                                    })}>
                                        Inscription
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} onClick={() => loginWithRedirect()}>Connexion</NavLink>
                                </NavItem>
                            </>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default withMyHook(NavMenu);

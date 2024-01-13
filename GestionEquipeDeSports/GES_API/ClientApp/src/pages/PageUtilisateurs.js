import { useAuth0 } from '@auth0/auth0-react';
import React, { Component } from "react";
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PageLoader } from "../components/PageLoader";
import { usePagination } from '../hooks/usePagination.js';

function withMyHook(Component) {
    return function WrappedComponent(props) {
        const { getAccessTokenSilently } = useAuth0();
        const { getObjetsAAfficher, setObjetsAPaginer, Pagination } = usePagination(20);
        return (
            <Component {...props}
                getAccessTokenSilently={getAccessTokenSilently}
                getObjetsAAfficher={getObjetsAAfficher}
                Pagination={Pagination}
                setObjetsAPaginer={setObjetsAPaginer}
            />
        );
    };
}

class Utilisateurs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            utilisateurs: [],
            estPret: false
        };
    }

    async componentDidMount() { await this.fetchUtilisateurs(); }

    async fetchUtilisateurs() {
        const token = await this.props.getAccessTokenSilently();

        await fetch("api/utilisateur", {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    utilisateurs: result,
                    estPret: true
                });
                this.props.setObjetsAPaginer(result);
            });
    }

    formatTypeUtilisateur(donnees) {
        if (donnees === 0) { return 'Admin'; }
        else if (donnees === 1) { return 'Entraineur'; }
        else if (donnees === 2) { return 'Tuteur'; }
        else { return 'Joueur'; }
    }

    async updateUserEtat(utilisateur, newEtat) {
        console.log(`Modification de l'état de l'utilisateur: ${utilisateur.idUtilisateur}, Nouvel état: ${newEtat}`);
        const token = await this.props.getAccessTokenSilently();

        utilisateur.etat = newEtat;

        await fetch(`api/Utilisateur/${utilisateur.idUtilisateur}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(utilisateur)
        });

        this.setState(prevState => ({
            utilisateurs: prevState.utilisateurs.map(u =>
                u.idUtilisateur === utilisateur.idUtilisateur ? utilisateur : u
            )
        }));
    }

    render() {
        const { getObjetsAAfficher, Pagination } = this.props;

        if (this.state.estPret) return (
            <Container>
                <h1>Liste des utilisateurs</h1>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th className="my-3 d-none d-md-table-cell">Âge</th>
                            <th className="my-3 d-none d-md-table-cell">Email</th>
                            <th className="my-3 d-none d-md-table-cell">Adresse</th>
                            <th>Téléphone</th>
                            <th className="my-3 d-none d-md-table-cell">Rôle</th>
                            <th className="my-3 d-none d-md-table-cell">État</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getObjetsAAfficher().map((u, index) => (
                            <tr key={u.idUtilisateur}>
                                <td><Link to={{ pathname: `/pageDesEvenementsEtEquipesDUnAthlete/${u.idUtilisateur}` }}>{u.nom}</Link></td>
                                <td>{u.prenom}</td>
                                <td className="my-3 d-none d-md-table-cell">{u.age}</td>
                                <td className="my-3 d-none d-md-table-cell">{u.email}</td>
                                <td className="my-3 d-none d-md-table-cell">{u.adresse}</td>
                                <td>{u.numTelephone}</td>
                                <td className="my-3 d-none d-md-table-cell">{this.formatTypeUtilisateur(u.roles)}</td>
                                <td className="my-3 d-none d-md-table-cell">
                                    {u.etat ? (<>
                                        <button className="btn btn-danger btn-etat-utilisateur" onClick={() => this.updateUserEtat(u, false)}>Désactiver</button>
                                    </>) : (<>
                                        <button className="btn btn-success btn-etat-utilisateur" onClick={() => this.updateUserEtat(u, true)}>Réactiver</button>
                                    </>)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Pagination />
            </Container>
        );
        else return (<PageLoader />);
    }
}

export default withMyHook(Utilisateurs);

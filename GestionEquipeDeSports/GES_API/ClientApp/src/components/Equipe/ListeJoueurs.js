import { useAuth0 } from '@auth0/auth0-react';
import { React, useCallback, useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { BiStar, BiTrash } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

import { usePagination } from '../../hooks/usePagination.js';
import { useUtilisateurEstEntraineur } from '../../hooks/useUtilisateurEstEntraineur.js';
import { PageLoader } from "../PageLoader";

export default function ListeJoueurs({ idEquipe, estEntraineur, updateListeJoueurs }) {
    const navigate = useNavigate();
    const { getAccessTokenSilently } = useAuth0();
    const { getEstEntraineurDepuisMail } = useUtilisateurEstEntraineur(idEquipe);
    const [equipeJoueurs, setEquipeJoueurs] = useState([]);
    const { setObjetsAPaginer, Pagination } = usePagination(20);
    const [estPret, setEstPret] = useState(false);

    const getRoleJoueur = useCallback(async (email) => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`api/UtilisateurEquipeRole/${email}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                const data = await response.json();
                return data;
            } else {
                console.error('Erreur fetch rôle:', response.status, response.statusText);
                return null;
            }
        } catch (error) {
            console.error('Erreur:', error);
            return null;
        }
    }, [getAccessTokenSilently]);

    const getJoueurs = useCallback(async () => {
        const token = await getAccessTokenSilently();

        await fetch(`api/equipeJoueur/${idEquipe}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(async (result) => {
                const utilisateursEtRoles = await Promise.all(result.map(async (user) => {
                    try {
                        const estEntraineur = await getEstEntraineurDepuisMail(user.email);
                        const roleUtilisateur = await getRoleJoueur(user.email);
                        const roleEquipeActuelle = roleUtilisateur.find(role => role.fkIdEquipe === idEquipe);
                        const DescriptionRole = roleEquipeActuelle ? roleEquipeActuelle.descriptionRole : 'Joueur';
                        return { ...user, estEntraineur, DescriptionRole, idUtilisateurEquipeRole: roleEquipeActuelle ? roleEquipeActuelle.idUtilisateurEquipeRole : null };
                    } catch (error) {
                        console.error("Erreur de rôle utilisateur:", error);
                        return user;
                    }
                }));

                const sortedJoueurs = [...utilisateursEtRoles].sort((a, b) => {
                    if (a.estEntraineur && !b.estEntraineur) return -1;
                    if (!a.estEntraineur && b.estEntraineur) return 1;
                    return a.nom.localeCompare(b.nom);
                });

                setEquipeJoueurs(sortedJoueurs);
                updateListeJoueurs(sortedJoueurs);
                setEstPret(true);
            })
            .catch((error) => { console.error('Error:', error); });
    }, [getAccessTokenSilently, idEquipe, getEstEntraineurDepuisMail, setEquipeJoueurs, getRoleJoueur, updateListeJoueurs]);


    async function promotePlayer(idJoueurDansListe) {
        const token = await getAccessTokenSilently();
        let estConfirme = window.confirm('Êtes-vous sûr de vouloir promouvoir ce joueur comme entraineur de l\'équipe ?');

        if (estConfirme) {
            let requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    FKIdUtilisateur: idJoueurDansListe,
                    FKIdEquipe: idEquipe,
                    FKIdRole: 1,
                    DescriptionRole: "Entraineur"
                })
            };

            await fetch("api/UtilisateurEquipeRole", requestOptions);
        }
    }

    async function supprimerJoueurDeLEquipe(idJoueurDansListe) {
        const token = await getAccessTokenSilently();
        let estConfirme = window.confirm('Etes-vous sûr que vous voulez supprimer ?');

        if (estConfirme) {
            let requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    FK_Id_Utilisateur: idJoueurDansListe,
                    FK_Id_Equipe: idEquipe
                })
            };
            await fetch("api/equipeJoueur", requestOptions);

            getJoueurs();
        }
    }

    useEffect(() => {
        !estPret && getJoueurs();
    }, [estPret, getJoueurs]);
    useEffect(() => { setObjetsAPaginer(equipeJoueurs); }, [setObjetsAPaginer, equipeJoueurs]);

    return (
        <>
            <Row className="mt-3" style={{ backgroundColor: '#ddd', padding: '20px', borderRadius: '5px', marginBottom: '20px' }}>
                <Col><h5 style={{ fontSize: '35px' }}>Membres de l'équipe</h5></Col>
                {estPret && estEntraineur && (
                    <Col className="d-none d-md-table-cell">
                        <Button variant="success"
                            className="float-end"
                            onClick={() => navigate(`/inviterOuAjouterJoueur/${idEquipe}`)}
                        >
                            Ajouter un joueur
                        </Button>
                    </Col>
                )}
            </Row >

            {estPret ? (<Row>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Email</th>
                            <th className="d-none d-md-table-cell" >Téléphone</th>
                            <th className="my-3 d-none d-md-table-cell">Rôle</th>
                            {estEntraineur && (<th className="my-3 d-none d-md-table-cell" style={{ width: "100px" }}></th>)}
                        </tr>
                    </thead>

                    <tbody>
                        {estPret && equipeJoueurs.map((joueur, index) => (
                            <tr key={joueur.idUtilisateur}>
                                <td>
                                    {joueur.estEntraineur && <BiStar style={{ marginRight: '4px', color: 'grey' }} />}
                                    {joueur.nom}
                                </td>
                                <td>{joueur.prenom}</td>
                                <td>{joueur.email}</td>
                                <td className="d-none d-md-table-cell">{joueur.numTelephone}</td>
                                <td className="my-3 d-none d-md-table-cell">{joueur.DescriptionRole ?? 'Joueur'}</td>
                                {estEntraineur && (
                                    <td className="d-none d-md-table-cell">
                                        {!joueur.estEntraineur && (
                                            <Button variant='success' onClick={() => promotePlayer(joueur.idUtilisateur)} size="sm" className="me-2" title="Promouvoir">
                                                <BiStar style={{ color: 'white' }} />
                                            </Button>
                                        )}
                                        {estEntraineur && (
                                            <Button variant='danger' onClick={() => supprimerJoueurDeLEquipe(joueur.idUtilisateur)} size="sm" title="Supprimer">
                                                <BiTrash />
                                            </Button>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Pagination />
            </Row >) : <PageLoader />
            }
        </>
    );
}

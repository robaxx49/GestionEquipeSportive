import { useAuth0 } from '@auth0/auth0-react';
import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FcApproval } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { IdUtilisateurContext } from "../components/Context";
import { PageLoader } from "../components/PageLoader";
import { SauvegarderICal } from "../components/SauvegarderICal";
import { TableEquipesUtilisateur } from "../components/TableEquipesUtilisateur";
import { TableEvenementsUtilisateur } from "../components/TableEvenementsUtilisateur";

export const PageAccueilEntraineur = () => {
    const [utilisateur, setUtilisateur] = useState([]);
    const [equipes, setEquipes] = useState([]);
    const [evenements, setEvenements] = useState([]);
    const [check, setCheck] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const { getAccessTokenSilently, user } = useAuth0();
    const navigate = useNavigate();
    const [estUtilisateurPret, setEstUtilisateurPret] = useState(false);
    const [estEquipesPret, setEstEquipesPret] = useState(false);
    const [estEvenementsPret, setEstEvenementsPret] = useState(false);

    const getUtilisateurId = useCallback(async (email) => {
        const token = await getAccessTokenSilently();

        await fetch(`api/utilisateur/${email}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then((result) => {
                setUtilisateur(result);
                setEstUtilisateurPret(true);
            })
            .catch((error) => { console.error('Error:', error); });
    }, [getAccessTokenSilently]);

    const getEquipes = useCallback(async () => {
        const token = await getAccessTokenSilently();

        await fetch(`api/UtilisateurEquipe/${utilisateur.idUtilisateur}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then((result) => {
                setEquipes(result);
                setEstEquipesPret(true);
            })
            .catch((error) => { console.error('Error:', error); });
    }, [getAccessTokenSilently, utilisateur]);

    const getEvenements = useCallback(async () => {
        const token = await getAccessTokenSilently();

        await fetch(`api/evenementJoueur/${utilisateur.idUtilisateur}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(async (result) => {
                if (result && result.length > 0) {
                    const eventIds = result.map((ev) => ev.fk_Id_Evenement);
                    const eventsDetailsPromises = eventIds.map((eventId) => {
                        return fetch(`api/evenements/${eventId}`, {
                            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
                        })
                            .then(res => res.json())
                            .catch((error) => { console.error('Error:', error); });
                    });

                    const eventDetails = await Promise.all(eventsDetailsPromises);
                    let eventDetailsEtPresences = [];

                    for (let index = 0; index < eventDetails.length; index++) {
                        const event = result.find(e => e.fk_Id_Evenement === eventDetails[index].id);
                        eventDetailsEtPresences.push({ ...eventDetails[index], "estPresentAevenement": event.estPresentAevenement });
                    }

                    setEvenements(eventDetailsEtPresences);
                }

                setEstEvenementsPret(true);
            })
            .catch((error) => { console.error('Error:', error); });

    }, [getAccessTokenSilently, utilisateur]);

    function exporterVersICal() {
        if (evenements.length !== 0) {
            return (
                <Button
                    style={{
                        backgroundColor: '#17a2b8',
                        border: 'none',
                        color: 'white',
                        borderRadius: '5px',
                        margin: '5px'
                    }} onClick={() => SauvegarderICal(evenements)} className="float-end" title="Téléchrger le fichier CSV" >
                    Exporter vers ICal
                </Button>
            );
        }
    }

    function copierLeLien() {
        navigator.clipboard.writeText(`https://localhost:44474/api/AbonnerCalendrier/${utilisateur.idUtilisateur}`);
        setCheck(true);
        setSeconds(2);
    }

    useEffect(() => {
        getUtilisateurId(user.email);
    }, [getUtilisateurId, user]);

    useEffect(() => {
        if (estUtilisateurPret) {
            !estEquipesPret && getEquipes();
        }
    }, [estUtilisateurPret, estEquipesPret, getEquipes]);

    useEffect(() => {
        if (estUtilisateurPret) {
            !estEvenementsPret && getEvenements();
        }
    }, [estUtilisateurPret, estEvenementsPret, getEvenements]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (seconds > 0) { setSeconds(seconds - 1); }
            else { setCheck(false); }
        }, 1000);
        return () => clearInterval(timer);
    }, [seconds]);

    if (estUtilisateurPret) return (
        <>
            <Container fluid>
                <Row style={{ textAlign: 'center', padding: '20px', backgroundColor: '#007BFF', color: 'white', borderRadius: '5px', margin: '10px' }}>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}>
                        Bonjour {utilisateur.prenom},
                    </div>
                    <div style={{ fontSize: '20px' }}>
                        Bienvenue dans votre compte !
                    </div>
                </Row>


                <Row className="mt-3" style={{ backgroundColor: '#ddd', padding: '20px', borderRadius: '5px', marginBottom: '20px' }}>
                    <Col>
                        <h5 style={{ fontSize: '35px' }}>Liste de vos équipes</h5>
                    </Col>
                    {estEquipesPret && (
                        <Col>
                            <Button
                                variant="success"
                                className="float-end"
                                onClick={() => navigate("/formulaireEquipe")}
                                style={{ fontSize: '18px' }}
                            >
                                Créer une équipe
                            </Button>
                        </Col>)}
                </Row>

                <Row className="mt-3">
                    {estEquipesPret ? <TableEquipesUtilisateur eq={equipes} /> : <PageLoader />}
                </Row>
            </Container>

            <Container fluid>
                <Row className="mt-3" style={{ backgroundColor: '#ddd', padding: '20px', borderRadius: '5px', marginBottom: '20px' }}>
                    <Col xs={12} md={6}>
                        <h5 style={{ fontSize: '35px' }}>Vos événements à venir</h5>
                    </Col>
                    {estEvenementsPret && (
                        <Col xs={12} md={6} className="d-flex align-items-center justify-content-between">
                            <div className="d-none d-md-table-cell">{exporterVersICal()}</div>
                            <div className="d-none d-md-table-cell" style={{ fontSize: "20px" }}>
                                Pour vous abonner:
                                <Button
                                    variant="info"
                                    onClick={() => { copierLeLien(); }}
                                    title="Copier le lien pour abonner au calendrier"
                                    style={{
                                        backgroundColor: '#17a2b8',
                                        border: 'none',
                                        color: 'white',
                                        borderRadius: '5px',
                                        marginLeft: "10px",
                                        margin: '5px',
                                    }}
                                >
                                    Copier le lien
                                </Button>
                                {check && <FcApproval style={{ color: '#28a745' }} />}
                            </div>
                        </Col>
                    )}
                </Row>

                <Row className="mt-3">
                    <IdUtilisateurContext.Provider value={utilisateur.idUtilisateur}>
                        {estEvenementsPret ? <TableEvenementsUtilisateur ev={evenements} /> : <PageLoader />}
                    </IdUtilisateurContext.Provider>
                </Row>
            </Container >

        </>
    );
    else return (<PageLoader />);
};

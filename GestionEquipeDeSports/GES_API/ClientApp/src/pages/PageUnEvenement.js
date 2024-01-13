import { useAuth0 } from '@auth0/auth0-react';
import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Row, Table } from 'react-bootstrap';
import { BiCheck, BiX } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FormatDateTime } from "../components/FormatDateTime";
import { PageLoader } from "../components/PageLoader";
import { useDureeEvenement } from '../hooks/useDureeEvenement.js';
import { useNotificationToast } from '../hooks/useNotificationToast.js';
import '../styles/pageUnEvenement.css';

export const PageUnEvenement = () => {
    const [evenement, setEvenement] = useState(null);
    const [membresEquipeEvenement, setMembresEquipeEvenement] = useState([]);
    const [isAttending, setIsAttending] = useState(false);
    const [utilisateur, setUtilisateur] = useState({});
    const { setNotification, ToastContainer } = useNotificationToast();
    const { getAccessTokenSilently, user } = useAuth0();
    const { getDureeEvenement } = useDureeEvenement();
    const [estPret, setEstPret] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const loadUtilisateur = useCallback(async () => {
        const token = await getAccessTokenSilently();

        fetch(`api/utilisateur/${user.email}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
            .then((res) => { return res.json(); })
            .then((data) => {
                setUtilisateur(data);
                setEstPret(true);
            })
            .catch((error) => { console.error(error); });
    }, [getAccessTokenSilently, user]);

    const loadEvenement = useCallback(async () => {
        const token = await getAccessTokenSilently();

        fetch(`api/evenements/${id}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
            .then((res) => { return res.json(); })
            .then((data) => { setEvenement(data); })
            .catch((error) => { console.error(error); });
    }, [getAccessTokenSilently, id]);

    const loadPresenceUser = useCallback(async () => {
        const token = await getAccessTokenSilently();

        fetch(`api/EvenementJoueurPresence/${id}?yourParam=${user.email}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
            .then((res) => { return res.json(); })
            .then((isAttending) => { setIsAttending(isAttending); });
    }, [getAccessTokenSilently, id, user]);

    const loadMembresEquipeEvenement = useCallback(async () => {
        const token = await getAccessTokenSilently();

        fetch(`api/EquipeJoueurEvenement/${utilisateur.idUtilisateur}?idEvenement=${id}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                if (!res.ok) { throw new Error("Network response was not ok"); }
                else { return res.json(); }
            })
            .then((data) => { setMembresEquipeEvenement(data); })
            .catch((error) => { console.error(error); });
    }, [getAccessTokenSilently, id, utilisateur]);

    async function handleClickPresence(isAttending) {
        const token = await getAccessTokenSilently();

        let requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({
                FK_Id_Utilisateur: utilisateur.idUtilisateur,
                FK_Id_Evenement: id,
                EstPresentAEvenement: isAttending
            })
        };

        fetch(`api/EvenementJoueur`, requestOptions)
            .then((response) => {
                if (!response.ok) { throw new Error("Network response was not ok"); }
                else {
                    setNotification("Votre présence a été mise à jour !");
                    setIsAttending(isAttending);
                }
            })
            .catch((error) => {
                console.error("There was a problem with the fetch operation:", error);
                setNotification("Une erreur s'est produite", "error");
            });
    }

    useEffect(() => {
        loadUtilisateur();
        loadEvenement();
    }, [loadUtilisateur, loadEvenement]);
    useEffect(() => {
        if (estPret) {
            loadPresenceUser();
            loadMembresEquipeEvenement();
        }
    }, [estPret, loadPresenceUser, loadMembresEquipeEvenement]);

    if (evenement === null) { return <PageLoader />; }

    return (
        <>
            <Row className="mt-3">
                <Col
                    style={{
                        backgroundColor: "#ddd",
                        padding: "20px",
                        borderRadius: "10px"
                    }} className="mb-3" xs={12}>
                    <h2 style={{ color: 'black' }}>Nom de l'événement : {evenement.description}</h2>
                </Col>
                <Col xs={12} className="mt-2">
                    <Link to="/pageAccueil" className="d-none d-md-table-cell">
                        <Button variant="outline-danger" style={{ marginLeft: "930px" }}>
                            Retour à la page d'accueil
                        </Button>
                    </Link>
                    <h5>
                        Statut : <span style={{ color: isAttending ? "green" : "red" }}>
                            {isAttending ? "Présent" : "Absent"}
                        </span>
                    </h5>

                    <Button
                        variant='success'
                        size="sm"
                        className="me-2"
                        onClick={() => handleClickPresence(true)}
                        title="Est présent"
                        style={{
                            verticalAlign: "middle",
                            background: isAttending ? 'green' : 'white',
                            color: isAttending ? 'white' : 'green',
                            border: '2px solid #4CAF50',
                            borderRadius: '50px',
                            fontWeight: 'bold',
                            padding: '4px 8px',
                        }}
                    >
                        <BiCheck size={20} />
                    </Button>
                    <Button
                        variant='warning'
                        onClick={() => handleClickPresence(false)}
                        size="sm"
                        title="Est absent"
                        style={{
                            verticalAlign: "middle",
                            background: !isAttending ? 'red' : 'white',
                            color: !isAttending ? 'white' : 'red',
                            border: '2px solid red',
                            borderRadius: '50px',
                            fontWeight: 'bold',
                            padding: '4px 8px',
                        }}
                    >
                        <BiX size={20} />
                    </Button>

                    <Button style={{ marginLeft: "880px" }} variant='warning' className="mb-2 min-width-button my-3 d-none d-md-table-cell" onClick={() => navigate(`/modifieEvenement/${id}`)}>Modifier l'événement</Button>
                </Col>


            </Row >

            <Row className="mt-3">
                <Col xs={12} sm={6}>
                    <h5 className="travelcompany-input">
                        <span>Lieu de l'événement : {evenement.emplacement}</span>
                    </h5>
                </Col>
                <Col xs={12} sm={6}>
                    <h5 >
                        <span>Date de début : <FormatDateTime doneesDateTime={evenement.dateDebut} /></span>
                    </h5>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col xs={12} sm={6}>
                    <h5>
                        <span>Durée : {getDureeEvenement(evenement.dateDebut, evenement.dateFin)}</span>
                    </h5>
                </Col>
                <Col xs={12} sm={6}>
                    <span>
                        {evenement.url && (
                            <a href={evenement.url} target="_blank" rel="noopener noreferrer">Lien de l'événement</a>
                        )}
                    </span>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col style={{
                    backgroundColor: "#ddd",
                    padding: "20px",
                    borderRadius: "10px"
                }} className="mb-3" xs={12}>
                    <h2 style={{ color: "565f60" }}>Membres de l'équipe</h2>
                </Col>
                <Col xs={12}>
                    {membresEquipeEvenement && membresEquipeEvenement.length > 0 ?
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>Prénom</th>
                                    <th>Nom</th>
                                    <th>Numéro</th>
                                    <th className="my-3 d-none d-md-table-cell">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {membresEquipeEvenement.map((e, index) => (
                                    <tr key={e.idUtilisateur}>
                                        <td>{e.prenom}</td>
                                        <td>{e.nom}</td>
                                        <td>{e.numTelephone}</td>
                                        <td className="my-3 d-none d-md-table-cell">{e.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        : <p>Aucun membre d'équipe n'a été trouvé.</p>}
                </Col>
            </Row>
            <ToastContainer />
        </>
    );
};

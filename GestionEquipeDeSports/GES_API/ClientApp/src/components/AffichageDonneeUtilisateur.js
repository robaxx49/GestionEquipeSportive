import { useAuth0 } from "@auth0/auth0-react";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNotificationToast } from '../hooks/useNotificationToast.js';
import PasswordResetButton from './PasswordResetButton';
import './css/Style.css';

function AffichageDonneeUtilisateur() {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [dataUtilisateur, setDataUtilisateur] = useState(-1);
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [adresse, setAdresse] = useState("");
    const [numTelephone, setNumTelephone] = useState("");
    const { setNotification, ToastContainer } = useNotificationToast();

    const fetchUtilisateur = useCallback(async () => {
        const token = await getAccessTokenSilently();

        await fetch(`api/utilisateur/${user.email}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(data => { if (data) { setDataUtilisateur(data); } })
            .catch(err => { console.error(err); });
    }, [getAccessTokenSilently, user]);

    async function handleUpdate() {
        const token = await getAccessTokenSilently();

        const updatedData = {
            Nom: nom,
            Prenom: prenom,
            Email: dataUtilisateur.email,
            Adresse: adresse,
            NumTelephone: numTelephone,
            Etat: true
        };

        await fetch(`api/utilisateur/${dataUtilisateur.idUtilisateur}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(updatedData)
        })
            .then(response => {
                if (response.status === 204) {
                    setNotification("Mise à jour réussie !");
                }
                else {
                    console.log("Erreur lors de la mise à jour");
                    setNotification("Erreur lors de la mise à jour", "warning");
                }
            })
            .catch(err => {
                console.error(err);
                setNotification("Une erreur s'est produite", "error");
            });
    }

    useEffect(() => {
        if (isAuthenticated) {
            fetchUtilisateur();
        }
    }, [isAuthenticated, fetchUtilisateur]);

    useEffect(() => {
        if (dataUtilisateur.idUtilisateur) {
            setPrenom(dataUtilisateur.prenom);
            setNom(dataUtilisateur.nom);
            setAdresse(dataUtilisateur.adresse);
            setNumTelephone(dataUtilisateur.numTelephone);
        }
    }, [dataUtilisateur]);

    useEffect(() => {
        if (isAuthenticated && dataUtilisateur.idUtilisateur) {
            setPrenom(dataUtilisateur.prenom);
            setNom(dataUtilisateur.nom);
            setAdresse(dataUtilisateur.adresse);
            setNumTelephone(dataUtilisateur.numTelephone);
        }
    }, [isAuthenticated, dataUtilisateur]);

    function PageUtilisateur() {
        if (isAuthenticated) {
            return (
                <Container style={{
                    backgroundColor: "#ddd",
                    padding: "15px",
                    maxWidth: "600px", // Adjust the maximum width
                    margin: "0 auto", // Center the container
                    borderRadius: "10px"
                }}>
                    <div style={{
                        backgroundColor: "#565f60",
                        marginBottom: "20px",
                        borderRadius: "10px",
                        height: "100px",
                        color: "white",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                        alignContent: "center"
                    }} className="Titre"><h2>Informations du compte</h2></div>

                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Prénom</Form.Label>
                            <Form.Control type="text" id="inputPrenom" defaultValue={prenom} onChange={(e) => setPrenom(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control type="text" id="inputNom" defaultValue={nom} onChange={(e) => setNom(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control type="text" id="inputAdresse" defaultValue={adresse} onChange={(e) => setAdresse(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Numéro de Téléphone</Form.Label>
                            <Form.Control type="text" id="inputNumTelephone" defaultValue={numTelephone} onChange={(e) => setNumTelephone(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" id="inputNumTelephone" defaultValue={dataUtilisateur.email} disabled />
                        </Form.Group>

                    </Form>
                    <div className="mt-4 d-grid gap-3">
                        <Button style={{ color: "white", backgroundColor: '#007BFF' }} variant="info" type="button" onClick={handleUpdate} className="w-100">Modifier</Button>
                        <Link to="/pageAccueil">
                            <Button variant="danger" className="w-100">
                                Retour
                            </Button>
                        </Link>
                        <PasswordResetButton email={dataUtilisateur.email} />
                    </div>
                    <ToastContainer />
                </Container>
            );
        }
        else {
            return (
                <div>
                    <h1>affichage non connecté</h1>
                </div>
            );
        }
    }

    return (<><PageUtilisateur /></>);
}

export default AffichageDonneeUtilisateur;

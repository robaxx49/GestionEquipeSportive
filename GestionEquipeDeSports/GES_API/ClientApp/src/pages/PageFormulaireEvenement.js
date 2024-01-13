import { useAuth0 } from '@auth0/auth0-react';
import { Autocomplete, LoadScript } from "@react-google-maps/api";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNotificationToast } from '../hooks/useNotificationToast.js';

export function FormEvenement() {
    const [descriptionEvenement, setDescriptionEvenement] = useState("");
    const [emplacementEvenement, setEmplacementEvenement] = useState("");
    const [emplacementGpsUrlEvenement, setEmplacementGpsUrlEvenement] = useState("");
    const [dateDebutEvenement, setDateDebutEvenement] = useState("");
    const [duree, setDuree] = useState("");
    const [typeEvenement, setTypeEvenement] = useState("");
    const [idUtilisateur, setIdUtilisateur] = useState('');
    const { getAccessTokenSilently } = useAuth0();
    const { setNotification, ToastContainer } = useNotificationToast();
    const [today, setToday] = useState('');
    const { id } = useParams();
    const { user } = useAuth0();

    const getUtilisateur = useCallback(async (email) => {
        const token = await getAccessTokenSilently();
        await fetch(`api/utilisateur/${email}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then((result) => {
                if (result === null) { return; }
                else { setIdUtilisateur(result.idUtilisateur); }
            })
            .catch(function (error) { console.error(error); });
    }, [getAccessTokenSilently]);

    async function verifierDonnees() {
        const token = await getAccessTokenSilently();

        const optionsRequete = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                Description: descriptionEvenement,
                Emplacement: emplacementEvenement,
                DateDebut: dateDebutEvenement,
                Duree: duree,
                TypeEvenement: typeEvenement,
                Url: emplacementGpsUrlEvenement

            })
        };

        if (descriptionEvenement !== "" && typeEvenement !== "") {
            const reponse = await fetch('api/evenements', optionsRequete);
            const data = await reponse.json();

            const optionsRequeteEquipeEvenement = {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    Fk_Id_Equipe: id,
                    Fk_Id_Evenement: data
                })
            };
            await fetch('api/equipeEvenement', optionsRequeteEquipeEvenement)
                .then(function (reponse) { console.log(reponse); })
                .catch(function (error) { console.error(error); });

            const optionsRequeteJoueurEvenement = {
                method: 'PUT',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    FK_Id_Utilisateur: idUtilisateur,
                    FK_Id_Evenement: data,
                    EstPresentAEvenement: false
                })
            };
            await fetch('api/evenementJoueur', optionsRequeteJoueurEvenement)
                .then(function (reponse) {
                    if (reponse.ok) { setNotification("Ajout de l'évenement réussi !"); }
                })
                .catch(function (error) {
                    console.error(error);
                    setNotification("Une erreur s'set produite", "error");
                });
        }
        else {
            setNotification("Les données saisies sont invalides !", "error");
        }
    }

    useEffect(() => {
        getUtilisateur(user.email);
    }, [getUtilisateur, user]);

    useEffect(() => {
        const date = new Date();
        const localDateString = date.toISOString().substring(0, 16);
        setToday(localDateString);
    }, []);

    const handlePlaceSelect = (place) => {
        console.log(place);
        console.log(place.formatted_address);
        const address = place.formatted_address || '';
        const url = place.url || '';
        setEmplacementEvenement(address);
        setEmplacementGpsUrlEvenement(url);
    };

    const handleAutocompleteLoad = (autocomplete) => {
        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            handlePlaceSelect(place);
        });
    };

    return (
        <Container style={{ backgroundColor: "#ddd" }} className="mt-5 p-5 border rounded-3">
            <ToastContainer />
            <div style={{
                backgroundColor: "#565f60",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                textAlign: "center",
            }} className="mb-3">
                <h1 style={{ color: "white" }} className="text-center">Ajouter un nouvel événement</h1>
            </div>
            <form>
                <Row className="mb-3">
                    <Col>
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            onChange={(e) => setDescriptionEvenement(e.target.value.trim())}
                            className="form-control"
                            id="description"
                            name="description"
                            placeholder="Entrer la description"
                            required
                        />
                    </Col>
                    <Col>
                        <label htmlFor="typeEvenement">Type Événement</label>
                        <select
                            id="typeEvenement"
                            name="typeEvenement"
                            onChange={(e) => setTypeEvenement(e.target.value)}
                            className="form-control"
                            required
                        >
                            <option value="">Choisir un événement</option>
                            <option value="0">Entrainement</option>
                            <option value="1">Partie</option>
                            <option value="2">Autre</option>
                        </select>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <label htmlFor="emplacement">Adresse</label>
                        <LoadScript
                            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
                            libraries={["places"]}
                        >
                            <Autocomplete onLoad={handleAutocompleteLoad}>
                                <input
                                    type="text"
                                    placeholder="Entrez une adresse"
                                    style={{ width: "100%", height: "40px", padding: "10px", borderRadius: "8px", border: "none" }}
                                />
                            </Autocomplete>
                        </LoadScript>
                    </Col>
                    <Col>
                        <label htmlFor="dateDebut">Date début</label>
                        <input
                            type="datetime-local"
                            onChange={(e) => setDateDebutEvenement(e.target.value)}
                            className="form-control"
                            id="dateDebut"
                            name="dateDebut"
                            placeholder="Entrer la date de début"
                            min={today}
                            required
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <label htmlFor="duree">Durée (en minutes)</label>
                        <input
                            type="number"
                            onChange={(e) => setDuree(e.target.value)}
                            className="form-control"
                            id="duree"
                            name="duree"
                            step={10}
                            placeholder="Entrer la durée"
                            min={0}
                            required
                        />
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <Button type="button" href={"/uneEquipe/" + id} variant="danger" className="w-100">
                            Retour
                        </Button>
                    </Col>
                    <Col>
                        <Button style={{ backgroundColor: "#007BFF" }} onClick={verifierDonnees} className="w-100">
                            Ajouter
                        </Button>
                    </Col>
                </Row>
            </form>
        </Container>
    );
}

import { useAuth0 } from '@auth0/auth0-react';
import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import { useNotificationToast } from '../hooks/useNotificationToast.js';

export const PageModifieUnEvenement = () => {
    const [description, setDescription] = useState('');
    const [emplacement, setEmplacement] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [duree, setDuree] = useState('');
    const [typeEvenement, setTypeEvenement] = useState('');
    const [url, setUrl] = useState('');
    const [formValidation, setFormValidation] = useState(true);
    const [erreurDescription, setErreurDescription] = useState('');
    const [erreurTypeEvenement, setErreurTypeEvenement] = useState('');
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const { setNotification, ToastContainer } = useNotificationToast();
    const { id } = useParams();

    const getEvenement = useCallback(async (id) => {
        const token = await getAccessTokenSilently();


        try {
            const response = await fetch(`api/evenements/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                const result = await response.json();
                setDescription(result.description);
                setEmplacement(result.emplacement);
                setDateDebut(result.dateDebut);
                result.duree.toFixed(2);
                setDuree(result.duree * 60);
                setTypeEvenement(result.typeEvenement);
                setUrl(result.url);
            } else {
                setNotification("Erreur de chargement", "error");
            }
        } catch (error) {
            setNotification("Erreur de chargement", "error");
        }
    }, [getAccessTokenSilently, setNotification]);

    useEffect(() => {
        getEvenement(id);
    }, [getEvenement, id]);

    function verifierDonnees() {
        setFormValidation(true);

        if (!description) {
            setFormValidation(false);
            setErreurDescription('Veuillez entrer une description');
        } else {
            setErreurDescription('');
        }

        if (!typeEvenement) {
            setFormValidation(false);
            setErreurTypeEvenement("Veuillez sélectionner un type d'événement");
        } else {
            setErreurTypeEvenement('');
        }
    }

    async function soumettreFormulaire() {
        verifierDonnees();

        console.log(typeEvenement);

        if (formValidation) {
            const token = await getAccessTokenSilently();

            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    id: id,
                    description: description,
                    emplacement: emplacement,
                    dateDebut: dateDebut,
                    duree: duree,
                    typeEvenement: typeEvenement,
                    url: url,
                })
            };

            try {
                const response = await fetch(`api/evenements/${id}`, requestOptions);
                if (response.ok) {
                    setNotification("Vous avez modifié un événement !");
                } else {
                    setNotification("Échec de la modification", "error");
                }
            } catch (error) {
                setNotification("Échec de la modification", "error");
            }
        }
    }

    return (
        <>
            <Container>
                <Row className="justify-content-md-center">
                    <Col sm={8}>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col sm={8}>
                        <Form style={{ backgroundColor: "#ddd" }} className="p-4 p-md-5 border rounded-3">
                            <div style={{
                                backgroundColor: "#565f60",
                                padding: "20px",
                                borderRadius: "10px",
                                boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                                textAlign: "center",
                            }} className="mb-3">
                                <h2 style={{ color: "white" }}>Modification de l'événement</h2>
                            </div>
                            <Form.Group className="mb-3">
                                <Form.Label>Nom de l'événement</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="description"
                                    className={erreurDescription ? "is-invalid form-control" : "form-control"}
                                    defaultValue={description}
                                    onChange={(event) => setDescription(event.target.value)} />
                                {erreurDescription && <p style={{ color: "red" }}>{erreurDescription}</p>}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Emplacement</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="emplacement"
                                    defaultValue={emplacement}
                                    onChange={(event) => setEmplacement(event.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Date de début</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    name="dateDebut"
                                    defaultValue={dateDebut}
                                    onChange={(event) => setDateDebut(event.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Durée (minutes)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="duree"
                                    min={0}
                                    step={10}
                                    defaultValue={duree}
                                    onChange={(event) => setDuree(event.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Type événement</Form.Label>
                                <Form.Select
                                    name="typeEvenement"
                                    className={erreurTypeEvenement ? "is-invalid form-select" : "form-select"}
                                    defaultValue={typeEvenement}
                                    onChange={(event) => setTypeEvenement(event.target.value)}>
                                    <option disabled>Choisir une option</option>
                                    <option value={0}>Entraînement</option>
                                    <option value={1}>Partie</option>
                                    <option value={2}>Autre</option>
                                </Form.Select>
                                {erreurTypeEvenement && <p style={{ color: "red" }}>{erreurTypeEvenement}</p>}
                            </Form.Group>
                            <Row>
                                <Button className="mb-3" variant='primary' onClick={soumettreFormulaire}>Enregistrer</Button>

                                <Button className="mb-3" onClick={() => navigate(-1)} variant='danger'>Retour</Button>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <ToastContainer />
            </Container>
        </>
    );
};

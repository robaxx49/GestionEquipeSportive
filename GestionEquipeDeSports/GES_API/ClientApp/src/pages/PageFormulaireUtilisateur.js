import { useAuth0 } from '@auth0/auth0-react';
import { Field, Form, Formik } from 'formik';
import React from "react";
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useNotificationToast } from '../hooks/useNotificationToast.js';

const DisplayingErrorMessagesSchema = Yup.object().shape({
    nomUtilisateur: Yup.string()
        .min(2, 'Trop court!')
        .max(50, 'Trop long!')
        .required('Ce champ est obligatoire!'),
    prenomUtilisateur: Yup.string()
        .min(2, 'Trop court!')
        .max(50, 'Trop long!')
        .required('Ce champ est obligatoire!'),
    courriel: Yup.string()
        .min(3, 'Trop court!')
        .max(50, 'Trop long!')
        .required('Ce champ est obligatoire!'),
    dateNaissance: Yup.string()
        .required('Ce champ est obligatoire!'),
});

export const FormUtilisateur = () => {
    const today = new Date().toISOString().split('T')[0];
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const { setNotification, ToastContainer } = useNotificationToast();

    const { id } = useParams();

    async function soumettreFormulaire(values) {
        const token = await getAccessTokenSilently();

        try {
            const response = await fetch('api/utilisateur', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    DateNaissance: values.dateNaissance,
                    Nom: values.nomUtilisateur,
                    Prenom: values.prenomUtilisateur,
                    Email: values.courriel
                })
            });

            const data = await response.json();

            if (response.ok) {
                if (data) {
                    const response2 = await fetch('api/equipeJoueur', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                        body: JSON.stringify({
                            Fk_Id_Equipe: id,
                            Fk_Id_Utilisateur: data.idUtilisateur
                        })
                    });

                    if (response2.ok) {
                        const data2 = await response2.json();
                        if (data2) {
                            setNotification("Le joueur a été ajouté avec succès!");
                            navigate(`/uneEquipe/${id}`);
                        }
                    }
                    else setNotification("Une erreur s'est produite. Le joueur n'a pas été ajouté dans l'équipe", "error");
                }
            }
            else setNotification(data.message, "warning");
        }
        catch (err) {
            console.error(err);
            setNotification("Une erreur s'est produite", "error");
        }
    }

    return (
        <Container fluid>
            <Row className="justify-content-md-center">
                <Col sm={6}>
                    <Formik
                        initialValues={{
                            nomUtilisateur: '',
                            prenomUtilisateur: '',
                            dateNaissance: '',
                            numeroTelephone: '',
                            courriel: ''
                        }}
                        validationSchema={DisplayingErrorMessagesSchema}
                        onSubmit={values => {
                            soumettreFormulaire(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form style={{ backgroundColor: "#ddd" }} className="p-4 p-md-5 border rounded-3">
                                <Row className="justify-content-md-center">
                                    <div style={{
                                        backgroundColor: "#565f60",
                                        padding: "20px",
                                        borderRadius: "10px",
                                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                                        textAlign: "center",
                                    }} className="mb-3">
                                        <h2 style={{ color: "white" }}>Ajouter un nouveau joueur</h2>
                                    </div>
                                </Row>
                                <Row className="mt-3">

                                    <label>Nom</label>
                                    <div className="form-group">
                                        <Field placeholder='Pierre' name="nomUtilisateur" type="text" className="form-control" />
                                        {touched.nomUtilisateur && errors.nomUtilisateur && <div style={{ color: "red" }}>{errors.nomUtilisateur}</div>}
                                    </div>
                                </Row>
                                <Row className="mt-3">

                                    <label>Prénom</label>
                                    <div className="form-group">
                                        <Field placeholder='Leroux' name="prenomUtilisateur" type="text" className="form-control" />
                                        {touched.prenomUtilisateur && errors.prenomUtilisateur && <div style={{ color: "red" }}>{errors.prenomUtilisateur}</div>}
                                    </div>
                                </Row>
                                <Row className="mt-3">

                                    <label>Courriel</label>

                                    <div className="form-group">
                                        <Field placeholder='courriel@outlook.com' name="courriel" type="text" className="form-control" />
                                        {touched.courriel && errors.courriel && <div style={{ color: "red" }}>{errors.courriel}</div>}
                                    </div>
                                </Row>
                                <Row className="mt-3">
                                    <label>Date naissance</label>
                                    <div className="form-group">
                                        <Field name="dateNaissance" type="Date" max={today} className="form-control" />
                                        {touched.dateNaissance && errors.dateNaissance && <div style={{ color: "red" }}>{errors.dateNaissance}</div>}
                                    </div>
                                </Row>
                                <Row className="mt-3">
                                    <label>Numéro de téléphone</label>
                                    <div>
                                        <Field placeholder='819-350-3216' name="numeroTelephone" type="tel" className="form-control" />
                                        {touched.numeroTelephone && errors.numeroTelephone && <div style={{ color: "red" }}>{errors.numeroTelephone}</div>}
                                    </div>
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                        <Button variant="danger" onClick={() => navigate(`/inviterOuAjouterJoueur/${id}`)} className="w-100">
                                            Retour
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button style={{ backgroundColor: '#007BFF' }} variant='primary' type="submit" className="w-100">Ajouter</Button>
                                    </Col>
                                </Row>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    );
};

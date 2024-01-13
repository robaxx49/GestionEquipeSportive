import { useAuth0 } from '@auth0/auth0-react';
import { Field, Form, Formik } from 'formik';
import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { useNotificationToast } from '../hooks/useNotificationToast.js';

const DisplayingErrorMessagesSchema = Yup.object().shape({
    nomEquipe: Yup.string()
        .min(3, 'Le nom est trop court!')
        .max(30, 'Le nom est trop long!')
        .required('Le nom de l\'équipe est requis'),
    region: Yup.string()
        .min(3, 'La région est trop courte!')
        .max(30, 'La région est trop longue!')
        .required('La région est requise'),
    sport: Yup.string()
        .min(3, 'Le sport est trop court!')
        .max(30, 'Le sport est trop long!')
        .required('Le sport est requis'),
    associationSportive: Yup.string()
        .min(4, 'L\'association sportive est trop courte!')
        .max(30, 'L\'association sportive est trop longue!')
        .required('L\'association sportive est requise'),
});

export const PageFormEquipe = () => {
    const [utilisateur, setUtilisateur] = useState({});
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const { user } = useAuth0();
    const { setNotification, ToastContainer } = useNotificationToast();

    const getUtilisateur = useCallback(async () => {
        const token = await getAccessTokenSilently();

        await fetch(`api/utilisateur/${user.name}`, {
            headers: { Accept: "application.json", Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then((result) => {
                setUtilisateur(result);
                console.log(result);
            })
            .catch(function (error) { console.error(error); });
    }, [getAccessTokenSilently, user]);

    async function soumettreFormulaire(values) {
        const token = await getAccessTokenSilently();

        let requestOptionsPost = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                Nom: values.nomEquipe,
                Region: values.region,
                Sport: values.sport,
                AssociationSportive: values.associationSportive
            })
        };

        await fetch(`api/equipe?idUser=${utilisateur.idUtilisateur}`, requestOptionsPost)
            .then((result) => {
                if (result.ok) {
                    setNotification("Vous avez ajouté une équipe !");
                }
            })
            .catch(function (error) {
                console.error(error);
                setNotification("Une erreur s'est produite", "error");
            });
    }

    useEffect(() => {
        getUtilisateur();
    }, [getUtilisateur]);

    return (
        <Container style={{ backgroundColor: '#ddd' }} className="mt-5 p-5 border rounded">
            <Row className="justify-content-center">
                <Col xs={12} md={6}>
                    <Formik
                        initialValues={{
                            nomEquipe: '',
                            region: '',
                            sport: '',
                            associationSportive: '',
                        }}
                        validationSchema={DisplayingErrorMessagesSchema}
                        onSubmit={values => {
                            soumettreFormulaire(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div style={{
                                    backgroundColor: "#565f60",
                                    padding: "20px",
                                    borderRadius: "10px",
                                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                                    textAlign: "center"
                                }} className='mt-3'>
                                    <h2 className="text-center" style={{ color: "white", fontSize: '35px' }}>Ajouter une équipe</h2>
                                </div>
                                <div className="form-group mt-4">
                                    <label>Nom de l'équipe</label>
                                    <Field name="nomEquipe" type="text" className="form-control" />
                                    {touched.nomEquipe && errors.nomEquipe && <div style={{ color: "red" }}>{errors.nomEquipe}</div>}
                                </div>

                                <div className="form-group mt-3">
                                    <label>Région</label>
                                    <Field name="region" className="form-control" />
                                    {touched.region && errors.region && <div style={{ color: "red" }}>{errors.region}</div>}
                                </div>

                                <div className="form-group mt-3">
                                    <label>Sport</label>
                                    <Field style={{ color: "#666", fontSize: '18px', fontFamily: 'Arial, Helvetica, sans-serif' }} as="select" name="sport" className="form-control">
                                        <option value="">Choisissez un sport</option>
                                        <option value="Soccer">Soccer</option>
                                        <option value="Hockey">Hockey</option>
                                        <option value="Football">Football</option>
                                        <option value="Natation">Natation</option>
                                        <option value="Baseball">Baseball</option>
                                    </Field>
                                    {touched.sport && errors.sport && <div style={{ color: "red" }}>{errors.sport}</div>}
                                </div>

                                <div className="form-group mt-3">
                                    <label>Association sportive</label>
                                    <Field name="associationSportive" className="form-control" />
                                    {touched.associationSportive && errors.associationSportive && <div style={{ color: "red" }}>{errors.associationSportive}</div>}
                                </div>

                                <div className="mt-3" style={{ fontSize: '18px' }}>
                                    <Button variant="danger" onClick={() => navigate(-1)} className="w-100">Retour</Button>
                                </div>
                                <div className="mt-3" style={{ fontSize: '18px' }}>
                                    <Button style={{ backgroundColor: "#007BFF" }} type="submit" className="w-100">Ajouter</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
            <ToastContainer />
        </Container >
    );
};

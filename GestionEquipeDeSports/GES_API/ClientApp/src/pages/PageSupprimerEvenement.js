import { useAuth0 } from '@auth0/auth0-react';
import { React, useCallback, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useTypeEvenement } from '../hooks/useTypeEvenement';

export const PageSupprimerEvenement = () => {
    const [evenement, setEvenement] = useState({});
    const { getAccessTokenSilently } = useAuth0();
    const { TypeEvenement } = useTypeEvenement();

    const getEvenement = useCallback(async (id) => {
        const token = await getAccessTokenSilently();

        await fetch(`api/evenements/${id}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then((result) => { setEvenement(result); });
    }, [getAccessTokenSilently]);

    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        getEvenement(id);
    }, [getEvenement, id]);

    async function supprimerEvenement() {
        const token = await getAccessTokenSilently();
        console.log("ACCESS TOKEN: " + token);

        const optionsRequete = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };

        await fetch(`/api/evenements/${id}`, optionsRequete)
            .then(function (reponse) {
                if (reponse.ok) { window.location.href = "/evenements"; }
                console.log(reponse);
            })
            .catch(function (error) { console.error(error); });
    }

    return (
        <>
            <Container>
                <h2 style={{ color: 'red' }}>Voulez-vous vraiment supprimer cet événement?</h2>
                <Row>
                    <Col sm={2}><b>Description: </b></Col>
                    <Col>{evenement.description}</Col>
                </Row>
                <Row>
                    <Col sm={2}><b>Emplacement: </b></Col>
                    <Col>{evenement.emplacement}</Col>
                </Row>
                <Row>
                    <Col sm={2}><b>Date de début: </b></Col>
                    <Col>{evenement.dateDebut}</Col>
                </Row>
                <Row>
                    <Col sm={2}><b>Date de fin: </b></Col>
                    <Col>{evenement.dateFin}</Col>
                </Row>
                <Row>
                    <Col sm={2}><b>Type événement: </b></Col>
                    <Col><TypeEvenement typeEvenement={evenement.typeEvenement} /></Col>
                </Row>

                <Button className="me-4" variant='primary' onClick={supprimerEvenement}>Oui, supprimer l'événement</Button>
                <Link to={'/evenements'}>
                    <Button className="me-2" variant='danger'>Non, laisser l'événement</Button>
                </Link>
            </Container>
        </>
    );
};

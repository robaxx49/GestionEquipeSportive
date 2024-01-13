import { React, useCallback, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

export const PageSupprimerEquipe = () => {
    const [equipe, setEquipe] = useState({});

    const getEquipe = useCallback(async (id) => {
        await fetch(`api/equipe/${id}`)
            .then(res => res.json())
            .then((result) => { setEquipe(result); });
    }, []);

    const { id } = useParams();

    useEffect(() => {
        getEquipe(id);
    }, [getEquipe, id]);

    return (
        <>
            <Container>
                <h2 style={{ color: 'red' }}>Voulez-vous vraiment supprimer cette équipe?</h2>
                <Row>
                    <Col sm={2}><b>Nom: </b></Col>
                    <Col>{equipe.nom}</Col>
                </Row>
                <Row>
                    <Col sm={2}><b>Sport: </b></Col>
                    <Col>{equipe.sport}</Col>
                </Row>
                <Row>
                    <Col sm={2}><b>Region: </b></Col>
                    <Col>{equipe.region}</Col>
                </Row>
                <Row>
                    <Col sm={2}><b>Association Sportive: </b></Col>
                    <Col>{equipe.associationSportive}</Col>
                </Row>

                <Button className="me-4" variant='primary' onClick={() => fetch(`/api/equipe/${id}`, { method: "DELETE" }).then(function (reponse) { if (reponse.status === 204) { console.log('supprimer avec success'); } })}>Oui, supprimer l'équipe</Button>
                <Link to={'/equipes'}>
                    <Button className="me-2" variant='danger'>Non, laisser l'équipe</Button>
                </Link>
            </Container>
        </>
    );
};

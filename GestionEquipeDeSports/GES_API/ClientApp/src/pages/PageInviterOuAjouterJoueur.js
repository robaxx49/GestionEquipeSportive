import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ajouter_membres from '../images/ajouter_membres.png';
import invitation_emails from '../images/invitation_emails.png';

function PageInviterOuAjouterJoueur() {
    const navigate = useNavigate();
    const { id } = useParams();

    return (
        <Container fluid>
            <Row className="my-4">
                <Col>
                    <div style={{
                        backgroundColor: "#565f60",
                        padding: "20px",
                        borderRadius: "10px",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                        textAlign: "center",
                    }} className="mb-3">
                        <h2 style={{ textAlign: "center", color: "white" }}>Inviter ou Ajouter de nouveaux membres</h2>
                    </div>
                </Col>
                <Link to="/pageAccueil" className="d-none d-md-table-cell">
                    <Button variant="outline-danger" style={{ marginLeft: "1000px" }}>
                        Retour
                    </Button>
                </Link>
            </Row>
            <Row className="justify-content-center">
                <Col md={6} lg={4} style={{ textAlign: "center", cursor: "pointer" }}>
                    <Card onClick={() => navigate(`/saisirEtEnvoyerInvitation/${id}`)}>
                        <Row className="justify-content-center mt-3">
                            <Card.Img variant="top" src={invitation_emails} style={{ height: "50%", width: "50%", margin: "auto" }} />
                        </Row>
                        <Card.Body style={{ backgroundColor: "#ddd" }}>
                            <Button variant="dark">
                                <Card.Title>Inviter de nouveaux membres</Card.Title>
                            </Button>

                            <Card.Text className="mt-3">
                                Envoyer un email aux membres que vous voulez ajouter dans votre équipe.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6} lg={4} style={{ textAlign: "center", cursor: "pointer" }}>
                    <Card onClick={() => navigate(`/formulaireUtilisateur/${id}`)}>
                        <Row className="justify-content-center mt-3">
                            <Card.Img variant="top" src={ajouter_membres} style={{ height: "50%", width: "50%", margin: "auto" }} />
                        </Row>
                        <Card.Body style={{
                            backgroundColor: "#ddd"
                        }}>
                            <Button variant="dark">
                                <Card.Title>Ajouter de nouveaux membres</Card.Title>
                            </Button>

                            <Card.Text className="mt-3">
                                Vous pouvez ajouter vos membres en saisissant leurs informations personnelles.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container >
    );
}

export default PageInviterOuAjouterJoueur;

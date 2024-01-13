import emailjs from '@emailjs/browser';
import React, { useRef, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotificationToast } from '../hooks/useNotificationToast.js';

function PagePourSaisirLeCourrielDInvitation() {
    const navigate = useNavigate();
    const form = useRef();
    const { id } = useParams();
    const [emailFields, setEmailFields] = useState(['']);
    const { setNotification, ToastContainer } = useNotificationToast();

    const addEmailField = () => { setEmailFields([...emailFields, '']); };
    const removeEmailField = (indexToRemove) => setEmailFields(emailFields.filter((_, index) => index !== indexToRemove));

    const envoyerEmail = async (e) => {
        e.preventDefault();

        const emails = emailFields.map((email, index) =>
            form.current.elements[`email_${index}`].value
        );

        emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, {
            email: emails,
            message: id
        }, process.env.REACT_APP_EMAILJS_TEMPLATE_PARAMS)
            .then((result) => {
                setNotification("Courriels envoyés avec succès !");
            }, (error) => {
                console.error(error.text);
                setNotification("Une erreur s'est produite", "error");
            });

        form.current.reset();
    };

    return (
        <Container style={{ backgroundColor: "#ddd" }} className="col-6 mt-5 p-5 border rounded-3">
            <Row className="mb-3">
                <div style={{
                    backgroundColor: "#565f60",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                    textAlign: "center"
                }} className='mt-3'>
                    <h2 style={{ color: "white" }} className="text-center">Inviter de nouveaux membres</h2>
                </div>
            </Row>

            <form ref={form} onSubmit={envoyerEmail}>
                {emailFields.map((email, index) => (
                    <div key={index} className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            name={`email_${index}`}
                            placeholder="Email du joueur"
                            required
                        />
                        <Row xs="auto">
                            <Col>
                                {index === emailFields.length - 1 && (
                                    <Button onClick={() => addEmailField()} variant="success" className="mt-2" type="button">
                                        + Ajouter un autre email
                                    </Button>
                                )}
                            </Col>
                            <Col>
                                {index === emailFields.length - 1 && index > 0 && (
                                    <Button onClick={() => removeEmailField(index)} variant="danger" className="mt-2" type="button">
                                        Supprimer
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    </div>
                ))}
                <div className="form-check">
                    <input id='cboxValidation' className="form-check-input border-secondary" name='cboxValidation' type='checkbox' required></input>
                    <label htmlFor='cboxValidation'>
                        Je consens à ne pas envoyer de courrier spam ni à utiliser des technologies obscures.
                    </label>
                </div>
                <Row className="mt-3">
                    <Col>
                        <Button type="button" variant="danger" onClick={() => navigate(`/inviterOuAjouterJoueur/${id}`)} className="w-100">Retour</Button>
                    </Col>
                    <Col>
                        <Button style={{ backgroundColor: '#007BFF' }} type="submit" className="w-100">Envoyer</Button>
                    </Col>
                </Row>
            </form>
            <ToastContainer />
        </Container>
    );
}

export default PagePourSaisirLeCourrielDInvitation;

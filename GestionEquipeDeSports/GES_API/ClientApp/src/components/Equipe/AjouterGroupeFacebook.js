import { useAuth0 } from '@auth0/auth0-react';
import { React, useEffect, useState } from 'react';
import { Accordion, Button, Col, Form, Row } from 'react-bootstrap';
import { useNotificationToast } from '../../hooks/useNotificationToast.js';

export default function AjouterGroupeFacebook({ equipe }) {
    const { getAccessTokenSilently } = useAuth0();
    const [lienFacebook, setLienFacebook] = useState();
    const { setNotification, ToastContainer } = useNotificationToast();

    async function validationUrl() {
        if (lienFacebook === equipe.lienGroupeFacebook) {
            setNotification("Aucune modification", "error");
            return;
        }
        else if (lienFacebook && !lienFacebook.includes('https://www.facebook.com/groups/')) {
            setNotification("Lien invalide !", "error");
            return;
        }

        const token = await getAccessTokenSilently();
        equipe.lienGroupeFacebook = lienFacebook;

        await fetch(`api/Equipe/${equipe.idEquipe}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(equipe)
        })
            .then((res) => {
                if (res.ok && lienFacebook != null) setNotification("Lien Facebook modifié !")
                else { setNotification("Lien Facebook supprimé !") }
            })
            .catch((err) => console.error(err));
    }

    useEffect(() => { setLienFacebook(equipe.lienGroupeFacebook); }, [equipe]);

    return (
        <>
            <ToastContainer />
            <Form className="d-none d-md-table-cell" onSubmit={(e) => {
                validationUrl();
                e.preventDefault();
            }}>
                <Row className='mb-3'>
                    <Col>
                        <Form.Label>
                            <Form.Control

                                style={{ "width": "410px", marginTop: "15px" }}
                                type="url"
                                defaultValue={lienFacebook}
                                placeholder='https://www.facebook.com/groups/...'
                                onInput={(texte) =>
                                    texte.target.value.trim().length === 0 ?
                                        setLienFacebook(null) :
                                        setLienFacebook((texte.target.value).trim())
                                }
                            />
                        </Form.Label>
                        <Button style={{ marginLeft: "15px", backgroundColor: "#007BFF" }} type="submit">Enregistrer</Button>

                    </Col>
                </Row>


            </Form>

            <Accordion className="mb-3 d-none d-md-table-cell">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Comment créer un groupe Facebook privé ?</Accordion.Header>
                    <Accordion.Body>
                        <iframe
                            title="Créer groupe Facebook privé"
                            src="https://scribehow.com/embed/Comment_creer_un_groupe_Facebook_prive_pour_son_equipe__dc6rfA9ZSZWFr-zhkevj8g?skipIntro=true"
                            width="100%"
                            height="640"
                        ></iframe>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}

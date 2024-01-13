import { useAuth0 } from '@auth0/auth0-react';
import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { TitreGES } from "../components/TitreGES";

function PageRejoindreUneEquipe() {
    const [idEquipe, setIdEquipe] = useState("");
    const [idJoueurConnecte, setIdJoueurConnecte] = useState("");
    const { getAccessTokenSilently, user } = useAuth0();
    const navigate = useNavigate();

    function handleChange(e) {
        setIdEquipe(e.target.value);
    }

    function handleClick() {
        ajouterLeJoueurDansLEquipe();
        navigate('/pageAccueil');
    }

    const getJoueurDuBackend = useCallback(async (email) => {
        const token = await getAccessTokenSilently();

        const resultat = await fetch(`api/Utilisateur/${email}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        });

        if (!resultat.ok) { throw new Error("Le joueur n'existe pas dans la base de donnée."); }

        const body = await resultat.json();
        setIdJoueurConnecte(body.idUtilisateur);
    }, [getAccessTokenSilently]);

    useEffect(() => {
        getJoueurDuBackend(user.email);
    }, [getJoueurDuBackend, user]);


    async function ajouterLeJoueurDansLEquipe() {
        const token = await getAccessTokenSilently();

        const optionsRequeteEquipeJoueur = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                Fk_Id_Utilisateur: idJoueurConnecte,
                FK_Id_Equipe: idEquipe
            })
        };

        await fetch('api/equipeJoueur', optionsRequeteEquipeJoueur)
            .then(function (reponse) { console.log(reponse); })
            .catch(function (error) { console.error(error); });
    }

    return (
        <Container className='mt-5' style={{
            maxWidth: "700px",
            backgroundColor: "#ddd",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            textAlign: "center"
        }}>
            <Row>
                <h2>Bienvenue sur la toute nouvelle plateforme <TitreGES />&nbsp;!</h2>
            </Row>

            <Row className="mt-4">
                <div>
                    <h4>On vous a invité à rejoindre une équipe&nbsp;?</h4>
                    <div>Suivez ces instructions pour adhérer à l'invitation</div>

                    <div className="mt-3 instruction">
                        <span>1. Vérifiez votre boîte de réception&nbsp;: </span>
                        Consultez vos messages électroniques. L'invitation a été envoyée à l'adresse électronique que vous avez fournie.
                    </div>

                    <div className="mt-2 instruction">
                        <span>2. Vérifiez votre dossier "Indésirables" ou "Spam"&nbsp;: </span>
                        Parfois, les courriels peuvent être filtrés dans le dossier "Indésirables" ou "Spam" de votre boîte de réception. Assurez-vous de vérifier également ces dossiers.
                    </div>

                    <div className="mt-2 instruction">
                        <span>3. Recherchez l'expéditeur&nbsp;: </span>
                        L'invitation devrait provenir d'un expéditeur associé à notre plateforme. Assurez-vous de vérifier le nom de l'expéditeur et le sujet du courriel.
                    </div>

                    <div className="mt-2 instruction">
                        <span>4. Ouvrez le courriel d'invitation&nbsp;: </span>
                        Une fois que vous avez trouvé le courriel d'invitation, ouvrez-le pour accéder au contenu. Le code d'invitation devrait être clairement indiqué dans le courriel.
                    </div>

                    <div className="mt-2 instruction">
                        <span>5. Copiez le code d'invitation&nbsp;: </span>
                        Copiez le code d'invitation depuis le courriel. Assurez-vous de ne pas inclure d'espaces supplémentaires lors de la copie.
                    </div>

                    <div className="mt-2 instruction">
                        <span>6. Validez votre code&nbsp;: </span>
                        Collez le code d'invitation dans le champ prévu à cet effet, puis cliquez sur le bouton "Rejoindre" pour confirmer votre invitation et rejoindre l'équipe
                    </div>

                    <Row className="mt-3">
                        <Col>
                            <input type="text" onChange={handleChange} className="form-control" id="identifiant" name="identifiant" placeholder="ID de l'équipe" required />
                        </Col>
                        <Col md="auto">
                            <Button type="button" onClick={handleClick} className="float-end">Rejoindre</Button>
                        </Col>
                    </Row>
                </div>
            </Row>
        </Container>
    );
}

export default PageRejoindreUneEquipe;

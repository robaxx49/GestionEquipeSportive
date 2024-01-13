/* eslint-disable array-callback-return */
import { useAuth0 } from '@auth0/auth0-react';
import Papa from "papaparse";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export const PageAjouterEvenementsCoup = () => {
    const [parsedFichier, setParsedFichier] = useState([]);
    const [tableauRows, setTableauRows] = useState([]);
    const [valuesCellules, setValuesCellules] = useState([]);
    const { getAccessTokenSilently } = useAuth0();
    const [idUtilisateur, setIdUtilisateur] = useState('');
    const [reponseConfirmation, setReponseConfirmation] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth0();

    const getUtilisateur = useCallback(async (email) => {
        const token = await getAccessTokenSilently();

        await fetch(`api/utilisateur/${email}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then((result) => { setIdUtilisateur(result.idUtilisateur); })
            .catch(function (error) { console.error(error); });
    }, [getAccessTokenSilently]);

    const handleChange = (e) => {
        Papa.parse(e.target.value, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                const rowsTableau = [];
                const valuesTableau = [];

                results.data?.map((donnees) => {
                    rowsTableau.push(Object.keys(donnees));
                    valuesTableau.push(Object.values(donnees));
                });

                setParsedFichier(results.data);
                setTableauRows(rowsTableau[0]);
                setValuesCellules(valuesTableau);
            }
        });
    };

    const changeHandler = (event) => {
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                const rowsTableau = [];
                const valuesTableau = [];

                results.data?.map((donnees) => {
                    rowsTableau.push(Object.keys(donnees));
                    valuesTableau.push(Object.values(donnees));
                });

                setParsedFichier(results.data);
                setTableauRows(rowsTableau[0]);
                setValuesCellules(valuesTableau);
            },
        });
    };

    async function enregistrerDonnees() {
        let donneesCorrigeeASauvegarder = [];
        let donneesACorriger = parsedFichier;

        for (let i = 0; i < donneesACorriger.length; i++) {
            let array = {};
            array.Description = donneesACorriger[i].Description;
            array.Emplacement = donneesACorriger[i].Emplacement;
            let dateHeureDebut = donneesACorriger[i].DateDebut + 'T' + donneesACorriger[i].HeureDebut;
            array.DateDebut = dateHeureDebut;
            array.Duree = verifierDuree(donneesACorriger[i].Duree);
            array.TypeEvenement = trouverTypeEvenement(donneesACorriger[i].TypeEvenement);
            donneesCorrigeeASauvegarder.push(array);
        }

        const token = await getAccessTokenSilently();
        const optionRequetePostEvenement = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(donneesCorrigeeASauvegarder)
        };

        const reponse = await fetch('api/AjouterEvenementsCoup', optionRequetePostEvenement);
        const data = await reponse.json();

        for (let i = 0; i < data.length; i++) {
            const optionsRequeteEquipeEvenement = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    Fk_Id_Equipe: id,
                    Fk_Id_Evenement: data[i].id
                })
            };
            await fetch('api/equipeEvenement', optionsRequeteEquipeEvenement)
                .then(function (reponse) { console.log(reponse); })
                .catch(function (error) { console.error(error); });
        }

        for (let j = 0; j < data.length; j++) {
            const optionsRequeteJoueurEvenement = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    FK_Id_Utilisateur: idUtilisateur,
                    FK_Id_Evenement: data[j].id,
                    EstPresentAEvenement: false
                })
            };
            await fetch('api/evenementJoueur', optionsRequeteJoueurEvenement)
                .then(function (reponse) {
                    if (reponse.ok) {
                        setReponseConfirmation("Les événements ont été ajoutés avec succès!");
                    }
                    else { setReponseConfirmation("Il y a une erreur!"); }
                }).catch(function (error) { console.error(error); });
        }
    }

    function verifierDuree(duree) {
        let indexSymbol = duree.indexOf(':');

        if (indexSymbol > 0) {
            let heuresParsed = duree.split(':')[0];
            let minutesParsed = duree.split(':')[1];
            const minutes = parseInt(heuresParsed * 60) + parseInt(minutesParsed);

            return minutes;
        }
        else { return duree; }
    }

    function trouverTypeEvenement(evenement) {
        if (evenement === "Entrainement") { return 0; }
        else if (evenement === "Partie") { return 1; }
        else { return 2; }
    }

    useEffect(() => {
        getUtilisateur(user.email);
    }, [getUtilisateur, user]);

    return (
        <Container>
            <Alert variant="info">
                <p>Les champs suivants sont obligatoires dans votre fichier CSV <b>Description</b> <b>Emplacement</b> <b>DateDebut</b> <b>HeureDebut</b> <b>Duree</b> <b>TypeEvenement</b></p>
            </Alert>
            <Form.Group className="mb-3">
                <Form.Label>Choisir le fichier de type csv</Form.Label>
                <Form.Control type="file" name="file" accept=".csv" onChange={changeHandler}></Form.Control>
            </Form.Group>
            <p>Ou</p>
            <Form.Group className="mb-3">
                <Form.Label>Copier coller les données de votre fichier CSV dans ce champ de texte</Form.Label>
                <Form.Control as="textarea" onChange={handleChange} rows={3}></Form.Control>
            </Form.Group>

            <Col xs={12} lg={6}>
                <Table responsive>
                    <thead>
                        <tr>
                            {tableauRows?.map((rows, index) => {
                                return <th key={index}>{rows}</th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {valuesCellules?.map((value, index) => {
                            return (
                                <tr key={index}>
                                    {value.map((val, i) => {
                                        return <td key={i}>{val}</td>;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Col>

            {reponseConfirmation && <p style={{ color: "green" }}>{reponseConfirmation}</p>}
            {parsedFichier.length > 0 && <Button variant="success" onClick={enregistrerDonnees}>Enregistrer</Button>}{' '}
            <Button variant="danger" onClick={() => navigate(-1)}>Retour</Button>
        </Container>
    );
};

import { useAuth0 } from '@auth0/auth0-react';
import { React, useCallback, useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { BiTrash } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

import { useDureeEvenement } from '../../hooks/useDureeEvenement.js';
import { useFormatDateTime } from '../../hooks/useFormatDateTime';
import { usePagination } from '../../hooks/usePagination.js';
import { useTypeEvenement } from '../../hooks/useTypeEvenement';
import { PageLoader } from "../PageLoader";

export default function ListeEvenements({ idEquipe, estEntraineur }) {
    const navigate = useNavigate();
    const { getAccessTokenSilently } = useAuth0();
    const [equipeEvenement, setEquipeEvenement] = useState([]);
    const { getObjetsAAfficher, setObjetsAPaginer, Pagination } = usePagination(5);
    const { getDureeEvenement } = useDureeEvenement();
    const { FormatDateTime } = useFormatDateTime();
    const { TypeEvenement } = useTypeEvenement();
    const [estPret, setEstPret] = useState(false);

    const getEvenements = useCallback(async (id) => {
        const token = await getAccessTokenSilently();

        await fetch(`api/equipeEvenement/${id}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then((result) => {
                setEquipeEvenement(result);
                setEstPret(true);
            })
            .catch((error) => { console.error('Error:', error); });
    }, [getAccessTokenSilently, setEquipeEvenement]);

    async function supprimerEvenementDeLEquipe(idEvenementDansList) {
        const token = await getAccessTokenSilently();
        let estConfirme = window.confirm('Etes-vous sûr que vous voulez supprimer?');

        if (estConfirme) {
            let requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    FK_Id_Evenement: idEvenementDansList,
                    FK_Id_Equipe: idEquipe
                })
            };

            await fetch(`/api/equipeEvenement`, requestOptions);
            getEvenements(idEquipe);
        }
    }

    useEffect(() => { getEvenements(idEquipe); }, [getEvenements, idEquipe]);
    useEffect(() => { setObjetsAPaginer(equipeEvenement); }, [setObjetsAPaginer, equipeEvenement]);

    return (
        <>
            <Row className="mt-3" style={{ backgroundColor: '#ddd', padding: '20px', borderRadius: '5px', marginBottom: '20px' }}>
                <Col><h5 style={{ fontSize: '35px' }}>Vos événements à venir</h5></Col>

                {estPret && estEntraineur && (
                    <Col className="d-none d-md-table-cell">
                        <Button variant="info" style={{
                            backgroundColor: '#17a2b8',
                            border: 'none',
                            color: 'white',
                            borderRadius: '5px',
                        }} onClick={() => navigate(`/ajouterEvenementsCoup/${idEquipe}`)}>Ajouter via un fichier CSV</Button>
                        <Button variant="success"
                            className="float-end"
                            onClick={() => navigate(`/formulaireEvenement/${idEquipe}`)}>Ajouter un événement</Button>
                    </Col>
                )}
            </Row>

            {estPret ? (<Row>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Emplacement</th>
                            <th>Date de début</th>
                            <th className="d-none d-md-table-cell">Durée</th>
                            <th className="d-none d-md-table-cell">Type événement</th>
                            {estEntraineur && (<th className="d-none d-md-table-cell"></th>)}
                        </tr>
                    </thead>

                    <tbody>
                        {getObjetsAAfficher().map((e, index) => (
                            <tr key={e.id}>
                                <td>{e.description}</td>
                                <td>{e.emplacement}</td>
                                <td><FormatDateTime dateTime={e.dateDebut} /></td>
                                <td className="d-none d-md-table-cell">{getDureeEvenement(e.dateDebut, e.dateFin)}</td>
                                <td className="d-none d-md-table-cell"><TypeEvenement typeEvenement={e.typeEvenement} /></td>
                                {estEntraineur && (
                                    <td className="d-none d-md-table-cell">
                                        <Button variant='danger' onClick={() => supprimerEvenementDeLEquipe(e.id)} size="sm" title="Supprimer" ><BiTrash /></Button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Pagination />
            </Row>) : <PageLoader />}
        </>
    );
}

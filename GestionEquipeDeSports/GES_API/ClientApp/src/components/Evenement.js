import { useAuth0 } from '@auth0/auth0-react';
import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { BiCheck, BiX } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDureeEvenement } from '../hooks/useDureeEvenement.js';
import { IdUtilisateurContext } from "./Context";
import { FormatDateTime } from "./FormatDateTime";

export const Evenement = (props) => {
    const [estPresent, setEstPresent] = useState(props.estPresent);
    const { getAccessTokenSilently } = useAuth0();
    const idUt = useContext(IdUtilisateurContext);
    const navigate = useNavigate();
    const { getDureeEvenement } = useDureeEvenement();

    async function changerEtatPresence(id, etat) {
        if (estPresent === etat) return;

        const token = await getAccessTokenSilently();

        let requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({
                FK_Id_Utilisateur: idUt,
                FK_Id_Evenement: id,
                EstPresentAEvenement: etat
            })
        };

        await fetch(`api/evenementJoueur`, requestOptions)
            .then(function (reponse) {
                if (reponse.status === 200) {
                    setEstPresent(etat);
                }
            })
            .catch((error) => { console.error('Error:', error); });
    }

    return (
        <tr>
            <td onClick={() => navigate(`/unEvenement/${props.id}`)}>{props.description}</td>
            <td onClick={() => navigate(`/unEvenement/${props.id}`)}>{props.emplacement}</td>
            <td><FormatDateTime doneesDateTime={props.dateDebut} /></td>
            <td className="d-none d-md-table-cell">{getDureeEvenement(props.dateDebut, props.dateFin)}</td>
            <td className="d-none d-md-table-cell">
                <Button
                    variant='success'
                    onClick={() => changerEtatPresence(props.id, true)}
                    size="sm"
                    className="me-2"
                    title="Est présent"
                    style={{
                        verticalAlign: "middle",
                        background: estPresent ? 'green' : 'white',
                        color: estPresent ? 'white' : 'green',
                        border: '2px solid #4CAF50',
                        borderRadius: '50px',
                        fontWeight: 'bold',
                        padding: '4px 8px',
                    }}
                >
                    <BiCheck size={20} />
                </Button>
                <Button
                    variant='warning'
                    onClick={() => changerEtatPresence(props.id, false)}
                    size="sm"
                    title="Est absent"
                    style={{
                        verticalAlign: "middle",
                        background: !estPresent ? 'red' : 'white',
                        color: !estPresent ? 'white' : 'red',
                        border: '2px solid red',
                        borderRadius: '50px',
                        fontWeight: 'bold',
                        padding: '4px 8px',
                    }}
                >
                    <BiX size={20} />
                </Button>
            </td>





        </tr>
    );
};

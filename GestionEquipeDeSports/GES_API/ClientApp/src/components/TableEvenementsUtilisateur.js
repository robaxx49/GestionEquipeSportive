import React from "react";
import { Table } from "react-bootstrap";
import { Evenement } from "./Evenement";

export const TableEvenementsUtilisateur = (props) => {
    return (
        <Table striped bordered style={{ border: '1px solid #ccc' }}>
            <thead>
                <tr>
                    <th>Nom de l'événement</th>
                    <th>Emplacement</th>
                    <th>Date début</th>
                    <th className="d-none d-md-table-cell">Durée</th>
                    <th className="d-none d-md-table-cell" style={{ width: "110px" }}>Présence</th>
                </tr>
            </thead>
            <tbody>
                {props.ev.map((e, index) => {
                    return <Evenement
                        key={e.id}
                        id={e.id}
                        description={e.description}
                        emplacement={e.emplacement}
                        dateDebut={e.dateDebut}
                        dateFin={e.dateFin}
                        estPresent={e.estPresentAevenement}
                    />;
                })}
            </tbody>
        </Table>
    );
};

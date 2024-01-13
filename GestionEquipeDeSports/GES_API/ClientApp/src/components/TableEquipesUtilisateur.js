import React from "react";
import { Table } from "react-bootstrap";
import { Equipe } from "./Equipe";

export const TableEquipesUtilisateur = (props) => {
    return (
        <Table striped bordered style={{ border: '1px solid #ccc' }}>
            <thead>
                <tr>
                    <th className="text-center">Nom de l'équipe</th>
                    <th className="text-center d-none d-md-table-cell">Région</th>
                    <th className="text-center d-none d-md-table-cell">Sport</th>
                    <th className="text-center">Association sportive</th>
                    <th className="text-center d-none d-md-table-cell" style={{ width: "70px" }}>Facebook</th>
                </tr>
            </thead>
            <tbody>
                {props.eq.map((e, index) => {
                    return <Equipe
                        key={e.idEquipe}
                        idEquipe={e.idEquipe}
                        num={index + 1}
                        nom={e.nom}
                        region={e.region}
                        sport={e.sport}
                        asportive={e.associationSportive}
                        facebookLink={e.lienGroupeFacebook}
                    />;
                })}
            </tbody>
        </Table>
    );
};

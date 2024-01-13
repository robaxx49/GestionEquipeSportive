import React from "react";
import { useNavigate } from "react-router-dom";
import BoutonGroupeFacebook from "./Equipe/BoutonGroupeFacebook";

export const Equipe = (props) => {
    const navigate = useNavigate();

    return (
        <tr onClick={() => navigate(`/uneEquipe/${props.idEquipe}`)}
        >
            <td>{props.nom}</td>
            <td className="d-none d-md-table-cell">{props.region}</td>
            <td className="d-none d-md-table-cell">{props.sport}</td>
            <td>{props.asportive}</td>
            <td className="d-none d-md-table-cell" onClick={(e) => { e.stopPropagation(); }}>
                {props.facebookLink != null && (
                    <BoutonGroupeFacebook lien={props.facebookLink} />
                )}
            </td>
        </tr>
    );
};

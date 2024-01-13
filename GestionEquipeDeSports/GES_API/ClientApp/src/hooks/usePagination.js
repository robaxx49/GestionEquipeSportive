import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

export function usePagination(nombreObjetsParPage) {
    const [tableauObjets, setTableauObjets] = useState([]);
    const [objetsPageCourante, setPageCourante] = useState(1);

    const totalObjets = tableauObjets.length;
    const afficherPaginationObjets = totalObjets > nombreObjetsParPage;
    const indexDernierObjet = objetsPageCourante * nombreObjetsParPage;
    const indexPremierObjet = indexDernierObjet - nombreObjetsParPage;

    const getObjetsAAfficher = () => tableauObjets.slice(indexPremierObjet, indexDernierObjet);

    const setObjetsAPaginer = (objets) => { setTableauObjets(objets); };

    const paginateUsers = (pageNumber) => { setPageCourante(pageNumber); };

    const Pagination = () => {
        return (
            afficherPaginationObjets && (
                <Row>
                    <Col>
                        <nav>
                            <ul className="pagination">
                                {Array.from({ length: Math.ceil(totalObjets / nombreObjetsParPage) }, (_, i) => (
                                    <li key={i + 1} className={`page-item ${i + 1 === objetsPageCourante ? 'active' : ''}`}>
                                        <button onClick={() => paginateUsers(i + 1)} className="page-link">
                                            {i + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </Col>
                </Row>
            )
        );
    };

    return {
        getObjetsAAfficher,
        setObjetsAPaginer,
        Pagination
    };
}

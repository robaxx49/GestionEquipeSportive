import React from "react";
import { Container } from 'react-bootstrap';
import AffichageDonneeUtilisateur from '../components/AffichageDonneeUtilisateur.js';

function PageAffichageUtilisateur() {
    return (
        <Container fluid>
            <div>
                <AffichageDonneeUtilisateur />
            </div>
        </Container>
    );
}
export default PageAffichageUtilisateur;

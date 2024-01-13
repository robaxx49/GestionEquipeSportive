import React from "react";
import { Col, Container, Row } from 'react-bootstrap';
import { FormulaireValidationInscription } from '../components/FormulaireValidationInscription.js';

function PageInscription() {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col sm={8}>
                    <FormulaireValidationInscription />
                </Col>
            </Row>
        </Container>
    );
}

export default PageInscription;

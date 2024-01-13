import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';

function PageErreur404() {
    return (
        <>
            <Alert variant="danger">
                <h1>Erreur 404</h1>
            </Alert>
            <br></br>
            <h1>Nous n'avons pas trouvé la page que vous cherchiez.</h1>
            <br></br>
            <p>Vous avez peut-être mal tapé l'adresse ou la page a été déplacée ou supprimée.</p>
            <br></br>
            <p>Vous pouvez rechercher plus de résultats ou vous rendre sur notre <Link to="/">page d'accueil.</Link></p>
        </>

    );
}

export default PageErreur404;

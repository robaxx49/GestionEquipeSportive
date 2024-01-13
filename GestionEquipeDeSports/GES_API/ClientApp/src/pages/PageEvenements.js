import { useAuth0 } from '@auth0/auth0-react';
import React from "react";
import { Button, Col, Row, Table } from 'react-bootstrap'; // Import Row and Col for responsiveness
import { BiEdit, BiTrash } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { PageLoader } from "../components/PageLoader";
import { useFormatDateTime } from '../hooks/useFormatDateTime';
import { useTypeEvenement } from '../hooks/useTypeEvenement';


function withMyHook(Component) {
    return function WrappedComponent(props) {
        const { getAccessTokenSilently } = useAuth0();
        const { FormatDateTime } = useFormatDateTime();
        const { TypeEvenement } = useTypeEvenement();

        return (
            <Component {...props}
                getAccessTokenSilently={getAccessTokenSilently}
                FormatDateTime={FormatDateTime}
                TypeEvenement={TypeEvenement}
            />
        );
    };
}

class Evenements extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            evenements: [],
            estPret: false
        };
    }

    async componentDidMount() {
        const token = await this.props.getAccessTokenSilently();

        await fetch("api/evenements", {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    evenements: result,
                    estPret: true
                });
            });
    }

    render() {
        const { FormatDateTime, TypeEvenement } = this.props;

        if (this.state.estPret) return (
            <>
                <h1>Bienvenue dans la page des événements</h1>
                {/*<Link to={'/formulaireEvenement'}>
                    <Button variant="success" className="btn btn-success">Ajouter un événement</Button><p></p>
        </Link>*/}
                <Row>
                    <Col>
                        <Table responsive striped bordered>
                            <thead>
                                <tr>
                                    <th>Événement</th>
                                    <th>Emplacement</th>
                                    <th>Date début</th>
                                    <th className="my-3 d-none d-md-table-cell">Date fin</th>
                                    <th className="my-3 d-none d-md-table-cell">Type événement</th>
                                    <th className="my-3 d-none d-md-table-cell" style={{ width: "100px" }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.evenements.map((ev, index) => (
                                    <tr key={ev.id}>
                                        <td><Link to={{ pathname: `/unEvenement/${ev.id}` }}>{ev.description}</Link></td>
                                        <td>{ev.emplacement}</td>
                                        <td><FormatDateTime dateTime={ev.dateDebut} /></td>
                                        <td className="my-3 d-none d-md-table-cell"><FormatDateTime dateTime={ev.dateFin} /></td>
                                        <td className="my-3 d-none d-md-table-cell"><TypeEvenement typeEvenement={ev.typeEvenement} /></td>
                                        <td className="my-3 d-none d-md-table-cell" style={{ textAlign: "center", verticalAlign: "middle" }}>
                                            <Link to={{ pathname: `/modifieEvenement/${ev.id}` }}>
                                                <Button variant='warning' size="sm" className="me-2" title="Modifier"><BiEdit /></Button>
                                            </Link>
                                            <Link to={{ pathname: `/supprimerEvenement/${ev.id}` }}>
                                                <Button variant='danger' size="sm" title="Supprimer"><BiTrash /></Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </>
        );
        else return (<PageLoader />);
    }
}

export default withMyHook(Evenements);

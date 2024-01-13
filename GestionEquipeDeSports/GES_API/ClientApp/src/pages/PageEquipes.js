import { useAuth0 } from '@auth0/auth0-react';
import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PageLoader } from "../components/PageLoader";
import { usePagination } from '../hooks/usePagination.js';

function withMyHook(Component) {
    return function WrappedComponent(props) {
        const { getAccessTokenSilently } = useAuth0();
        const { getObjetsAAfficher, setObjetsAPaginer, Pagination } = usePagination(20);
        return (
            <Component {...props}
                getAccessTokenSilently={getAccessTokenSilently}
                getObjetsAAfficher={getObjetsAAfficher}
                Pagination={Pagination}
                setObjetsAPaginer={setObjetsAPaginer}
            />
        );
    };
}

class PageEquipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            equipes: [],
            estPret: false
        };
    }

    async componentDidMount() {
        const token = await this.props.getAccessTokenSilently();

        try {
            const response = await fetch("api/Equipe", {
                headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            this.props.setObjetsAPaginer(result);

            this.setState({
                equipes: result,
                estPret: true
            });
        }
        catch (error) { console.error('Error fetching data:', error); }
    }

    render() {
        const { getObjetsAAfficher, Pagination } = this.props;
        const { equipes } = this.state;

        if (this.state.estPret) return (
            <div>
                <h1>Page des équipes</h1>
                <Link to={'/formulaireEquipe'}>
                    <Button variant="success" className="btn btn-success">Ajouter une équipe</Button><p></p>
                </Link>

                {equipes.length > 0 && (
                    <div>
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th className="d-none d-md-table-cell">Région</th>
                                    <th className="d-none d-md-table-cell">Sport</th>
                                    <th>Association sportive</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getObjetsAAfficher().map((eq, index) => (
                                    <tr key={eq.idEquipe}>
                                        <td><Link to={{ pathname: `/uneEquipe/${eq.idEquipe}` }}>{eq.nom}</Link></td>
                                        <td className="d-none d-md-table-cell">{eq.region}</td>
                                        <td className="d-none d-md-table-cell">{eq.sport}</td>
                                        <td>{eq.associationSportive}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Pagination />
                    </div>
                )}
            </div>
        );
        else return (<PageLoader />);
    }
}
export default withMyHook(PageEquipes);

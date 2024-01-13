import { useAuth0 } from '@auth0/auth0-react';
import { React, useCallback, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import AjouterGroupeFacebook from '../components/Equipe/AjouterGroupeFacebook.js';
import BoutonGroupeFacebook from '../components/Equipe/BoutonGroupeFacebook.js';
import ListeEvenements from '../components/Equipe/ListeEvenements.js';
import ListeJoueurs from '../components/Equipe/ListeJoueurs.js';
import { useNotificationToast } from '../hooks/useNotificationToast.js';
import { useUtilisateurEstEntraineur } from '../hooks/useUtilisateurEstEntraineur.js';

export default function PageUneEquipePourUnEntraineur() {
    const { id } = useParams();
    const { getAccessTokenSilently, user } = useAuth0();
    const { getEstEntraineurDepuisMail } = useUtilisateurEstEntraineur(id);
    const [estEntraineur, setEstEntraineur] = useState(false);
    const [infos, setInfos] = useState({});
    const [utilisateurSelectionne, setUtilisateurSelectionne] = useState('');
    const [roleEntre, setRoleEntre] = useState('');
    const [listeJoueurs, setListeJoueurs] = useState([]);
    const { ToastContainer, setNotification } = useNotificationToast();

    async function getRoleUtilisateur(email) {
        const token = await getAccessTokenSilently();
        const response = await fetch(`api/UtilisateurEquipeRole/${email}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
            throw new Error("Erreur de rôle.");
        }

        const userData = await response.json();
        return userData;
    }

    const assignerRoleUtilisateur = async () => {
        const utilisateurAVerifier = listeJoueurs.find(joueur => joueur.idUtilisateur === utilisateurSelectionne);

        let roleEquipeCourante = null;

        if (utilisateurAVerifier) {
            const rolesUtilisateurCourant = await getRoleUtilisateur(utilisateurAVerifier.email);
            roleEquipeCourante = rolesUtilisateurCourant.find(role => role.fkIdEquipe === id);
        }

        if (roleEquipeCourante) {
            const roleAModifier = {
                IdUtilisateurEquipeRole: roleEquipeCourante.idUtilisateurEquipeRole,
                FkIdUtilisateur: utilisateurAVerifier.idUtilisateur,
                FkIdEquipe: roleEquipeCourante.fkIdEquipe,
                FkIdRole: roleEquipeCourante.fkIdRole,
                DescriptionRole: roleEntre,
            };
            try {

                const token = await getAccessTokenSilently();

                const response = await fetch(`api/UtilisateurEquipeRole/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(roleAModifier),
                });

                if (response.status === 200) {
                    setNotification("Modification du rôle enregistrée !");
                }
                else {
                    setNotification("Une erreur s'est produite", "error");
                    console.error('Erreur:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Erreur:', error);
            }
        } else {
            const roleAAjouter = {
                FkIdUtilisateur: utilisateurSelectionne,
                FkIdEquipe: id,
                FkIdRole: utilisateurAVerifier.roles,
                DescriptionRole: roleEntre,
            };

            try {
                const token = await getAccessTokenSilently();
                const response = await fetch('api/UtilisateurEquipeRole', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(roleAAjouter),
                });

                if (response.status === 200) {
                    setNotification("Modification du rôle enregistrée !");
                } else {
                    console.error('Erreur:', response.status, response.statusText);
                    const responseText = await response.text();
                    console.error('Réponse:', responseText);
                }
            } catch (error) {
                console.error('Erreur:', error);
            }
        }
    };

    const updateListeJoueurs = (joueurs) => {
        setListeJoueurs(joueurs);
    };

    const getEquipe = useCallback(async (id) => {
        const token = await getAccessTokenSilently();

        await fetch(`api/equipe/${id}`, {
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then((result) => { setInfos(result); })
            .catch((err) => console.error(err));
    }, [getAccessTokenSilently, setInfos]);

    useEffect(() => { getEquipe(id); }, [getEquipe, id]);

    useEffect(() => {
        getEstEntraineurDepuisMail(user.email)
            .then((res) => setEstEntraineur(res))
            .catch((err) => console.error(err));
    }, [getEstEntraineurDepuisMail, user.email]);

    return (
        <Container>
            <Row>
                <Col>
                    <h2 style={{ color: '#666' }}>
                        Nom de l'équipe : <br />{infos['nom']}
                    </h2>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-end">
                    <Link to="/pageAccueil" className="d-none d-md-table-cell">
                        <Button variant="outline-danger">
                            Retour à la page d'accueil
                        </Button>
                    </Link>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <BoutonGroupeFacebook lien={infos['lienGroupeFacebook']} />
                </Col>
                {estEntraineur && (<AjouterGroupeFacebook equipe={infos} lien={infos['lienGroupeFacebook']} />)}
            </Row>
            <Row>
                <ListeJoueurs idEquipe={id} estEntraineur={estEntraineur} updateListeJoueurs={updateListeJoueurs} />
            </Row>
            <Row>
                <Col>
                    <div>
                        <h5>Ajouter un rôle à l'utilisateur :</h5>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <select
                                value={utilisateurSelectionne}
                                onChange={(e) => setUtilisateurSelectionne(e.target.value)}
                                className="form-select"
                            >
                                <option value="">Sélectionner un utilisateur</option>
                                {listeJoueurs.map((joueur) => (
                                    <option key={joueur.idUtilisateur} value={joueur.idUtilisateur}>
                                        {joueur.nom} {joueur.prenom}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                placeholder="Entrez le rôle"
                                value={roleEntre}
                                onChange={(e) => setRoleEntre(e.target.value)}
                                className="form-control"
                                style={{ marginLeft: '10px', marginRight: '10px' }}
                            />
                            <button onClick={assignerRoleUtilisateur} className="btn btn-primary">
                                Confirmer
                            </button>
                        </div>
                    </div>
                </Col>
            </Row>
            <ListeEvenements idEquipe={id} estEntraineur={estEntraineur} />
            <ToastContainer />
        </Container>
    );
}

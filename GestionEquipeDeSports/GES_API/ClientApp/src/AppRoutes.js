import { AuthenticationGuard } from "./components/AuthenticationGuard";
import { PageAccueil } from "./pages/PageAccueil";
import { PageAccueilEntraineur } from "./pages/PageAccueilEntraineur";
import PageAffichageUtilisateur from './pages/PageAffichageUtilisateur.js';
import { PageAjouterEvenementsCoup } from "./pages/PageAjouterEvenementsCoup";
import PageEquipes from "./pages/PageEquipes";
import PageErreur404 from "./pages/PageErreur404";
import Evenements from "./pages/PageEvenements";
import { PageFormEquipe } from "./pages/PageFormulaireEquipe";
import { FormEvenement } from "./pages/PageFormulaireEvenement";
import { FormUtilisateur } from "./pages/PageFormulaireUtilisateur";
import PageInscription from "./pages/PageInscription";
import PageInviterOuAjouterJoueur from "./pages/PageInviterOuAjouterJoueur";
import { PageModifieUnEvenement } from "./pages/PageModifieUnEvenement";
import PagePourSaisirLeCourrielDInvitation from "./pages/PagePourSaisirLeCourrielDInvitation";
import PageRejoindreUneEquipe from "./pages/PageRejoindreUneEquipe";
import { PageSupprimerEquipe } from "./pages/PageSupprimerEquipe";
import { PageSupprimerEvenement } from "./pages/PageSupprimerEvenement";
import { PageUnEvenement } from "./pages/PageUnEvenement";
import PageUneEquipePourUnEntraineur from "./pages/PageUneEquipePourUnEntraineur";
import PageUtilisateurInactif from "./pages/PageUtilisateurInactif";
import Utilisateurs from "./pages/PageUtilisateurs";

//https://developer.auth0.com/resources/guides/spa/react/basic-authentication
const AppRoutes = [
    {
        index: true,
        element: <PageAccueil />
    },
    {
        path: '/inscription',
        element: <PageInscription />
    },
    {
        path: '/pageUtilisateurInactif',
        element: <PageUtilisateurInactif />
    },
    {
        path: '/pageAccueil',
        element: <AuthenticationGuard component={PageAccueilEntraineur} />
    },
    {
        path: '/equipes',
        element: <AuthenticationGuard component={PageEquipes} />
    },
    {
        path: '/evenements',
        element: <AuthenticationGuard component={Evenements} />
    },
    {
        path: '/formulaireEvenement/:id',
        element: <AuthenticationGuard component={FormEvenement} />
    },
    {
        path: '/formulaireEquipe',
        element: <AuthenticationGuard component={PageFormEquipe} />
    },
    {
        path: '/utilisateurs',
        element: <AuthenticationGuard component={Utilisateurs} />
    },
    {
        path: '/formulaireUtilisateur/:id',
        element: <AuthenticationGuard component={FormUtilisateur} />
    },
    {
        path: '/unEvenement/:id',
        element: <AuthenticationGuard component={PageUnEvenement} />
    },
    {
        path: '/modifieEvenement/:id',
        element: <AuthenticationGuard component={PageModifieUnEvenement} />
    },
    {
        path: '/supprimerEvenement/:id',
        element: <AuthenticationGuard component={PageSupprimerEvenement} />
    },
    {
        path: '/uneEquipe/:id',
        element: <AuthenticationGuard component={PageUneEquipePourUnEntraineur} />
    },
    {
        path: '/supprimerEquipe/:id',
        element: <AuthenticationGuard component={PageSupprimerEquipe} />
    },
    {
        path: '/rejoindreUneEquipe',
        element: <AuthenticationGuard component={PageRejoindreUneEquipe} />
    },
    {
        path: '/inviterOuAjouterJoueur/:id',
        element: <AuthenticationGuard component={PageInviterOuAjouterJoueur} />
    },
    {
        path: '/saisirEtEnvoyerInvitation/:id',
        element: <AuthenticationGuard component={PagePourSaisirLeCourrielDInvitation} />
    },
    {
        path: '/ajouterEvenementsCoup/:id',
        element: <AuthenticationGuard component={PageAjouterEvenementsCoup} />
    },
    {
        path: '/afficherUtilisateur',
        element: <AuthenticationGuard component={PageAffichageUtilisateur} />
    },
    {
        path: '*',
        element: <PageErreur404 />
    }
];

export default AppRoutes;

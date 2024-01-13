using GES_Services.Entites;
using GES_Services.Interfaces;

namespace GES_Services.Manipulations
{
    public class ManipulationDepotEvenementJoueur
    {
        private IDepotEvenementJoueur m_depotEvenementJoueur;

        public ManipulationDepotEvenementJoueur(IDepotEvenementJoueur p_depotEvenementJoueur)
        {
            if (p_depotEvenementJoueur == null)
            {
                throw new ArgumentNullException(nameof(p_depotEvenementJoueur));
            }
            this.m_depotEvenementJoueur = p_depotEvenementJoueur;
        }

        public EvenementJoueur ChercherJoueurParIdEvenementIdJoueur(EvenementJoueur p_evenementJoueur)
        {
            if (p_evenementJoueur is null)
            {
                throw new ArgumentNullException(nameof(p_evenementJoueur));
            }
            return this.m_depotEvenementJoueur.ChercherJoueurParIdEvenementIdJoueur(p_evenementJoueur);
        }

        public IEnumerable<EvenementJoueur> ChercherEvenementParIdUtilisateur(Guid p_id)
        {
            return this.m_depotEvenementJoueur.ChercherEvenementParIdUtilisateur(p_id);
        }

        public void AjouterPresencePourJoueur(EvenementJoueur p_evenementJoueur)
        {
            if (p_evenementJoueur is null)
            {
                throw new ArgumentNullException(nameof(p_evenementJoueur));
            }
            this.m_depotEvenementJoueur.AjouterPresencePourJoueur(p_evenementJoueur);
        }
        public void SupprimerEvenementJoueur(EvenementJoueur p_evenementJoueur)
        {
            if (p_evenementJoueur is null)
            {
                throw new ArgumentNullException(nameof(p_evenementJoueur));
            }
            this.m_depotEvenementJoueur.SupprimerEvenementJoueur(p_evenementJoueur);
        }
    }
}

using GES_Services.Entites;
using GES_Services.Interfaces;

namespace GES_Services.Manipulations
{
    public class ManipulationDepotEquipeJoueur
    {
        private IDepotEquipeJoueur m_depotEquipeJoueur;

        public ManipulationDepotEquipeJoueur(IDepotEquipeJoueur p_depotEquipeJoueur)
        {
            this.m_depotEquipeJoueur = p_depotEquipeJoueur;
        }

        public IEnumerable<Utilisateur> ListerEquipeJoueurs(Guid p_id)
        {
            return this.m_depotEquipeJoueur.ListerEquipeJouers(p_id);
        }

        public EquipeJoueur ChercherEquipeJoueurParId(Guid p_id)
        {
            return this.m_depotEquipeJoueur.ChercherEquipeJoueurParId(p_id);
        }

        public void AjouterEquipeJoueur(EquipeJoueur p_equipeJoueur)
        {
            if (p_equipeJoueur == null)
            {
                throw new ArgumentNullException("Le parametre p_equipeJoueur ne peut pas être null", nameof(p_equipeJoueur));
            }
            this.m_depotEquipeJoueur.AjouterEquipeJoueur(p_equipeJoueur);
        }

        public void ModifierEquipeJoueur(EquipeJoueur p_equipeJoueur)
        {
            if (p_equipeJoueur == null)
            {
                throw new ArgumentNullException("Le parametre p_equipeJoueur ne peut pas être null", nameof(p_equipeJoueur));
            }
            this.m_depotEquipeJoueur.ModifierEquipeJoueur(p_equipeJoueur);
        }

        public void SupprimerEquipeJoueur(EquipeJoueur p_equipeJoueur)
        {
            if (p_equipeJoueur == null)
            {
                throw new ArgumentNullException("Le parametre p_equipeJoueur ne peut pas être null", nameof(p_equipeJoueur));
            }
            this.m_depotEquipeJoueur.SupprimerEquipeJoueur(p_equipeJoueur);
        }

        public EquipeJoueur ChercherIdEquipeJoueurDansEquipeJoueur(EquipeJoueur p_equipeJoueur)
        {
            return this.m_depotEquipeJoueur.ChercherIdEquipeJoueurDansEquipeJoueur(p_equipeJoueur);
        }
    }
}

using GES_Services.Entites;
using GES_Services.Interfaces;

namespace GES_Services.Manipulations
{
    public class ManipulationDepotEquipeEvenement
    {
        private IDepotEquipeEvenement m_depotEquipeEvenement;

        public ManipulationDepotEquipeEvenement(IDepotEquipeEvenement p_depotEquipeEvenement)
        {
            this.m_depotEquipeEvenement = p_depotEquipeEvenement;
        }
        public IEnumerable<Evenement> ListerEquipeEvenements(Guid id)
        {
            return this.m_depotEquipeEvenement.ListerEquipeEvenements(id);
        }
        public EquipeEvenement ChercherEquipeEvenementParId(Guid p_id)
        {
            return this.m_depotEquipeEvenement.ChercherEquipeEvenementParId(p_id);
        }
        public void AjouterEquipeEvenement(EquipeEvenement p_equipeEvenement)
        {
            if (p_equipeEvenement == null)
            {
                throw new ArgumentNullException("Le paramètre p_equipeEvenement ne peut pas être null", nameof(p_equipeEvenement));
            }
            this.m_depotEquipeEvenement.AjouterEquipeEvenement(p_equipeEvenement);
        }
        public void ModifierEquipeEvenement(EquipeEvenement p_equipeEvenement)
        {
            if (p_equipeEvenement == null)
            {
                throw new ArgumentNullException("Le paramètre p_equipeEvenement ne peut pas être null", nameof(p_equipeEvenement));
            }
            this.m_depotEquipeEvenement.ModifierEquipeEvenement(p_equipeEvenement);
        }
        public void SupprimerEquipeEvenement(EquipeEvenement p_equipeEvenement)
        {
            if (p_equipeEvenement == null)
            {
                throw new ArgumentNullException("Le paramètre p_equipeEvenement ne peut pas être null", nameof(p_equipeEvenement));
            }
            this.m_depotEquipeEvenement.SupprimerEquipeEvenement(p_equipeEvenement);
        }
        public EquipeEvenement ChercherEvenementDansEquipeEvenement(EquipeEvenement p_equipeEvenement)
        {
            return this.m_depotEquipeEvenement.ChercherEvenementDansEquipeEvenement(p_equipeEvenement);
        }
    }
}

using GES_Services.Interfaces;
using GES_Services.Entites;

namespace GES_Services.Manipulations
{
    public class ManipulationDepotEvenementEquipe
    {
        private IDepotEvenementEquipe m_depotEvenementEquipe;

        public ManipulationDepotEvenementEquipe(IDepotEvenementEquipe p_depotEvenementEquipe)
        {
            this.m_depotEvenementEquipe = p_depotEvenementEquipe;
        }

        public IEnumerable<Equipe> ListerEvenementEquipe(Guid p_id)
        {
            return this.m_depotEvenementEquipe.ListerEvenementEquipe(p_id);
        }

        public void AjouterEquipeDansEvenement(EquipeEvenement p_equipeEvenement)
        {
            if (p_equipeEvenement == null)
            {
                throw new ArgumentNullException("Le paramètre p_equipeEvenement ne peut pas être null", nameof(p_equipeEvenement));
            }
            this.m_depotEvenementEquipe.AjouterEquipeDansEvenement(p_equipeEvenement);
        }

        public EquipeEvenement ChercherEquipeDansEquipeEvenement(EquipeEvenement p_equipeEvenement)
        {
            if (p_equipeEvenement == null)
            {
                throw new ArgumentNullException("Le paramètre p_equipeEvenement ne peut pas être null", nameof(p_equipeEvenement));
            }
            return this.m_depotEvenementEquipe.ChercherEquipeDansEquipeEvenement(p_equipeEvenement);
        }

        public void SupprimerEvenementEquipe(EquipeEvenement p_equipeEvenement)
        {
            if (p_equipeEvenement == null)
            {
                throw new ArgumentNullException("Le paramètre p_equipeEvenement ne peut pas être null", nameof(p_equipeEvenement));
            }
            this.m_depotEvenementEquipe.SupprimerEvenementEquipe(p_equipeEvenement);
        }
    }
}

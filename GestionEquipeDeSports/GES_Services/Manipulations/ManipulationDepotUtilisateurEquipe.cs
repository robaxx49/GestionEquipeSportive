using GES_Services.Entites;
using GES_Services.Interfaces;

namespace GES_Services.Manipulations
{
    public class ManipulationDepotUtilisateurEquipe
    {
        private IDepotUtilisateurEquipe m_depotUtilisateurEquipe;

        public ManipulationDepotUtilisateurEquipe(IDepotUtilisateurEquipe p_depotUtilisateurEquipe)
        {
            this.m_depotUtilisateurEquipe = p_depotUtilisateurEquipe;
        }

        public IEnumerable<Equipe> ListerEquipesPourUtilisateur(Guid p_id)
        {
            return this.m_depotUtilisateurEquipe.ListerEquipesPourUtilisateur(p_id);
        }
    }
}

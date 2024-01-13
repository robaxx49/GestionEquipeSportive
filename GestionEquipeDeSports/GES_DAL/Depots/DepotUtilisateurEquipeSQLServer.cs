using GES_DAL.DbContexts;
using GES_Services.Entites;
using GES_Services.Interfaces;

namespace GES_DAL.Depots
{
    public class DepotUtilisateurEquipeSQLServer : IDepotUtilisateurEquipe
    {
        private Equipe_sportiveContext m_context;
        public DepotUtilisateurEquipeSQLServer(Equipe_sportiveContext p_context)
        {
            if (p_context is null)
            {
                throw new ArgumentNullException(nameof(p_context));
            }
            this.m_context = p_context;
        }

        public IEnumerable<Equipe> ListerEquipesPourUtilisateur(Guid p_id)
        {
            // trouver utilisateur
            BackendProject.Utilisateur? utilisateurDTO = this.m_context.Utilisateurs.FirstOrDefault(e => e.IdUtilisateur == p_id);
            if (utilisateurDTO == null)
            {
                throw new InvalidOperationException($"l'utilisateur avec id {p_id} n'existe pas");
            }
            //trouver les équipes pour l'utilisateur
            IEnumerable<Guid?> equipes = this.m_context.EquipeJoueurs.Where(e => e.Fk_Id_Utilisateur == p_id).Select(e => e.Fk_Id_Equipe);

            //trouver les équipes
            IEnumerable<Equipe> equipeDTO = this.m_context.Equipes.Where(e => equipes.Contains(e.IdEquipe)).Select(e => e.DeDTOVersEntite());
            return equipeDTO;
        }
    }
}

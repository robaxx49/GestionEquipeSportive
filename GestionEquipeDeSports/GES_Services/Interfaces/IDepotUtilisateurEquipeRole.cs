using GES_Services.Entites;

namespace GES_Services.Interfaces
{
    public interface IDepotUtilisateurEquipeRole
    {
        public IEnumerable<UtilisateurEquipeRole> ListerUtilisateurEquipeRoles(Guid p_id);
        public IEnumerable<UtilisateurEquipeRole> ChercherUtilisateurEquipeRoleParId(Guid p_id);
        public void AjouterUtilisateurEquipeRole(UtilisateurEquipeRole p_utilisateurEquipeRole);
        public void ModifierUtilisateurEquipeRole(UtilisateurEquipeRole p_utilisateurEquipeRole);
        public void SupprimerUtilisateurEquipeRole(UtilisateurEquipeRole p_utilisateurEquipeRole);
        public Guid ChercherUtilisateurParEmail(string p_email);
    }
}

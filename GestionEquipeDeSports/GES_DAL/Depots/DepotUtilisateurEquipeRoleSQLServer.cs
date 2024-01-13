using GES_DAL.DbContexts;
using GES_Services.Entites;

namespace GES_DAL.Depots
{
    public class DepotUtilisateurEquipeRoleSQLServer : GES_Services.Interfaces.IDepotUtilisateurEquipeRole
    {
        private Equipe_sportiveContext m_context;

        public DepotUtilisateurEquipeRoleSQLServer(Equipe_sportiveContext p_context)
        {
            this.m_context = p_context;
        }

        public void AjouterUtilisateurEquipeRole(UtilisateurEquipeRole p_utilisateurEquipeRole)
        {
            if (p_utilisateurEquipeRole is null)
            {
                throw new ArgumentNullException($"le parametre {p_utilisateurEquipeRole} ne peut pas etre null", nameof(p_utilisateurEquipeRole));
            }

            if (m_context.UtilisateurEquipeRoles.Any(e => e.IdUtilisateurEquipeRole == p_utilisateurEquipeRole.IdUtilisateurEquipeRole))
            {
                throw new InvalidOperationException($"l'evenement avec le id {p_utilisateurEquipeRole.IdUtilisateurEquipeRole} existe déjà");
            }

            this.m_context.UtilisateurEquipeRoles.Add(new BackendProject.UtilisateurEquipeRole(p_utilisateurEquipeRole));
            this.m_context.SaveChanges();
        }

        public Guid ChercherUtilisateurParEmail(string p_email)
        {
            BackendProject.Utilisateur? utilisateur = m_context.Utilisateurs.FirstOrDefault(e => e.Email == p_email);

            if (utilisateur != null) return utilisateur.IdUtilisateur;
            else throw new InvalidOperationException($"l'evenement avec le id {p_email} n'existe pas");
        }

        public IEnumerable<UtilisateurEquipeRole> ChercherUtilisateurEquipeRoleParId(Guid p_id)
        {
            if (p_id == Guid.Empty)
            {
                throw new ArgumentNullException($"le parametre {p_id} ne peut pas etre null", nameof(p_id));
            }

            List<UtilisateurEquipeRole> listeUER = m_context.UtilisateurEquipeRoles.Where(user => user.FkIdUtilisateur == p_id).Select(u => u.DeDTOVersEntite()).ToList();

            return listeUER;
        }

        public IEnumerable<UtilisateurEquipeRole> ListerUtilisateurEquipeRoles(Guid p_id)
        {
            throw new NotImplementedException();
        }

        public void ModifierUtilisateurEquipeRole(UtilisateurEquipeRole p_utilisateurEquipeRole)
        {
            if (p_utilisateurEquipeRole == null)
            {
                throw new ArgumentNullException(nameof(p_utilisateurEquipeRole), "Nécessite un paramètre UtilisateurEquipeRole.");
            }

            BackendProject.UtilisateurEquipeRole donneeUtilisateurEquipeRole = m_context.UtilisateurEquipeRoles.First(e => e.IdUtilisateurEquipeRole == p_utilisateurEquipeRole.IdUtilisateurEquipeRole);

            if (donneeUtilisateurEquipeRole == null)
            {
                throw new InvalidOperationException($"UtilisateurEquipeRole {p_utilisateurEquipeRole.IdUtilisateurEquipeRole} inexistant.");
            }

            donneeUtilisateurEquipeRole.FkIdUtilisateur = p_utilisateurEquipeRole.FkIdUtilisateur;
            donneeUtilisateurEquipeRole.FkIdEquipe = p_utilisateurEquipeRole.FkIdEquipe;
            donneeUtilisateurEquipeRole.FkIdRole = p_utilisateurEquipeRole.FkIdRole;
            donneeUtilisateurEquipeRole.DescriptionRole = p_utilisateurEquipeRole.DescriptionRole;
            m_context.Update(donneeUtilisateurEquipeRole);
            m_context.SaveChanges();
        }


        public void SupprimerUtilisateurEquipeRole(UtilisateurEquipeRole p_utilisateurEquipeRole)
        {
            throw new NotImplementedException();
        }
    }
}

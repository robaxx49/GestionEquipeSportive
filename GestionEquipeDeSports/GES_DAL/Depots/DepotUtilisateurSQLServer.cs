using GES_DAL.DbContexts;
using GES_Services.Interfaces;
using Entite = GES_Services.Entites;

namespace GES_DAL.Depots
{
    public class DepotUtilisateurSQLServer : IDepotUtilisateur
    {
        private Equipe_sportiveContext m_context;

        public DepotUtilisateurSQLServer(Equipe_sportiveContext p_context)
        {
            if (p_context is null)
            {
                throw new ArgumentNullException(nameof(p_context));
            }
            this.m_context = p_context;
        }
        public void AjouterUtilisateur(Entite.Utilisateur p_utilisateur)
        {
            if (p_utilisateur is null)
            {
                throw new ArgumentNullException($"L'utilisateur ne peut pas être null", nameof(p_utilisateur));
            }

            if (this.m_context.Utilisateurs.Any(e => e.Email == p_utilisateur.Email))
            {
                throw new InvalidOperationException($"Le courriel {p_utilisateur.Email} est déjà utilisé. Voulez-vous l'inviter ?");
            }

            this.m_context.Utilisateurs.Add(new BackendProject.Utilisateur(p_utilisateur));
            this.m_context.SaveChanges();
        }
        public Entite.Utilisateur ChercherUtilisateurParId(Guid p_id)
        {
            if (p_id == Guid.Empty)
            {
                throw new ArgumentOutOfRangeException("ID invalide", nameof(p_id));
            }

            BackendProject.Utilisateur? utilisateurDTO = this.m_context.Utilisateurs.FirstOrDefault(e => e.IdUtilisateur == p_id);

            if (utilisateurDTO is null)
            {
                throw new InvalidOperationException($"L'événement avec le id {p_id} n'existe pas");
            }

            return utilisateurDTO.DeDTOVersEntite();
        }
        public IEnumerable<Entite.Utilisateur> ListerUtilisateurs()
        {
            //select * from Utilisateur et retourne une liste d'entite.Utilisateur
            List<BackendProject.Utilisateur> utilisateurs = new List<BackendProject.Utilisateur>();

            foreach (BackendProject.Utilisateur utilisateur in this.m_context.Utilisateurs)
            {
                utilisateurs.Add(utilisateur);
            }

            return utilisateurs.Select(e => e.DeDTOVersEntite());
        }

        public Entite.Utilisateur ChercherUtilisateurParEmail(String p_email)
        {
            if (p_email == null)
            {
                throw new ArgumentNullException(nameof(p_email));
            }

            BackendProject.Utilisateur? utilisateurDTO = this.m_context.Utilisateurs.FirstOrDefault(e => e.Email == p_email);

            if (utilisateurDTO == null)
            {
                throw new InvalidOperationException($"L'utilisateur avec l'email {p_email} n'existe pas");
            }

            return utilisateurDTO.DeDTOVersEntite();
        }
        public void ModifierUtilisateur(Entite.Utilisateur p_utilisateur, Guid p_id)
        {
            if (p_utilisateur is null)
            {
                throw new ArgumentNullException($"L'utilisateur ne peut pas être null", nameof(p_utilisateur));
            }

            BackendProject.Utilisateur utilisateurExistant = this.m_context.Utilisateurs.FirstOrDefault(u => u.IdUtilisateur == p_id)!;

            if (utilisateurExistant is null)
            {
                throw new InvalidOperationException($"l'utilisateur avec le id {p_utilisateur.IdUtilisateur} n'existe pas");
            }
            if (p_utilisateur.Nom is not null)
            {
                utilisateurExistant.Nom = p_utilisateur.Nom;
            }
            if (p_utilisateur.Prenom is not null)
            {
                utilisateurExistant.Prenom = p_utilisateur.Prenom;
            }
            if (p_utilisateur.Adresse is not null)
            {
                utilisateurExistant.Adresse = p_utilisateur.Adresse;
            }
            if (p_utilisateur.NumTelephone is not null)
            {
                utilisateurExistant.NumTelephone = p_utilisateur.NumTelephone;
            }
            utilisateurExistant.Etat = p_utilisateur.Etat;

            this.m_context.Remove(this.m_context.Utilisateurs.FirstOrDefault(u => u.IdUtilisateur == p_id)!);
            this.m_context.Add(utilisateurExistant);
            this.m_context.SaveChanges();
        }

        public void SupprimerUtilisateur(Entite.Utilisateur p_utilisateur)
        {
            throw new NotImplementedException();
        }

        public DateTime RecuperationDateModification(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}

using GES_DAL.DbContexts;
using GES_Services.Entites;
using GES_Services.Interfaces;

namespace GES_DAL.Depots
{
    public class DepotEquipeJoueurSQLServer : IDepotEquipeJoueur
    {
        private Equipe_sportiveContext m_context;
        public DepotEquipeJoueurSQLServer(Equipe_sportiveContext p_context)
        {
            if (p_context is null)
            {
                throw new ArgumentNullException(nameof(p_context));
            }
            this.m_context = p_context;
        }

        public void AjouterEquipeJoueur(EquipeJoueur p_equipeJoueur)
        {
            if (p_equipeJoueur is null) throw new Exception();
            else
            {
                this.m_context.EquipeJoueurs.Add(new BackendProject.EquipeJoueur(p_equipeJoueur));
                this.m_context.SaveChanges();
            }
        }

        public EquipeJoueur ChercherEquipeJoueurParId(Guid p_id)
        {
            throw new NotImplementedException();
        }

        public EquipeJoueur ChercherIdEquipeJoueurDansEquipeJoueur(EquipeJoueur p_equipeJoueur)
        {
            if (p_equipeJoueur is null) throw new ArgumentNullException(nameof(p_equipeJoueur));

            //Trouver equipe
            BackendProject.Equipe? equipeDTO = m_context.Equipes.FirstOrDefault(e => e.IdEquipe == p_equipeJoueur.Fk_Id_Equipe);

            if (equipeDTO is null) throw new InvalidOperationException($"l'equipe avec le id {p_equipeJoueur.Fk_Id_Equipe} n'existe pas");

            //Trouver les joueurs de l'equipe
            BackendProject.EquipeJoueur? joueurDansEquipe = this.m_context.EquipeJoueurs.SingleOrDefault(
                ej => ej.Fk_Id_Equipe == p_equipeJoueur.Fk_Id_Equipe && ej.Fk_Id_Utilisateur == p_equipeJoueur.Fk_Id_Utilisateur
            );

            EquipeJoueur? equipeJoueur = null;

            if (joueurDansEquipe is not null) equipeJoueur = joueurDansEquipe.FromDTO();

            return equipeJoueur!;
        }

        public EquipeJoueur ChercherIdJoueurtDansEquipeJoueur(Guid p_id)
        {
            if (p_id == Guid.Empty)
            {
                throw new ArgumentOutOfRangeException("le parametre \"id\" doit etre superieur a 0", nameof(p_id));
            }

            BackendProject.EquipeJoueur? equipeJoueurDTO = m_context.EquipeJoueurs.FirstOrDefault(ej => ej.Fk_Id_Utilisateur == p_id);

            if (equipeJoueurDTO == null)
            {
                throw new InvalidOperationException($"le joueur avec le id {p_id} n'existe pas");
            }
            return equipeJoueurDTO.FromDTO();
        }

        public IEnumerable<Utilisateur> ListerEquipeJouers(Guid p_id)
        {
            // 1. Trouver equipe
            BackendProject.Equipe? equipeDTO = m_context.Equipes.FirstOrDefault(e => e.IdEquipe == p_id);

            if (equipeDTO == null)
            {
                throw new InvalidOperationException($"l'equipe avec l'id (p_id) n'existe pas");
            }

            // 2. Trouver les joueurs dans l'equipe
            IEnumerable<Guid?> joueurs = this.m_context.EquipeJoueurs.Where(ej => ej.Fk_Id_Equipe == p_id).Select(ej => ej.Fk_Id_Utilisateur);

            // 3. Trouver les joueurs
            IEnumerable<Utilisateur> utilisateurDTO = this.m_context.Utilisateurs.Where(u => joueurs.Contains(u.IdUtilisateur)).Select(u => u.DeDTOVersEntite());
            return utilisateurDTO;
        }

        public void ModifierEquipeJoueur(EquipeJoueur p_equipeJoueur)
        {
            throw new NotImplementedException();
        }

        public void SupprimerEquipeJoueur(EquipeJoueur p_equipeJoueur)
        {
            if (p_equipeJoueur is null)
            {
                throw new ArgumentNullException("le parametre \"evenement\" ne peut pas etre null", nameof(p_equipeJoueur));
            }

            if (p_equipeJoueur.IdJoueurEquipe == Guid.Empty)
            {
                throw new ArgumentOutOfRangeException(nameof(p_equipeJoueur));
            }

            BackendProject.EquipeJoueur? equipeJoueurDTO = m_context.EquipeJoueurs.Where(e => e.IdJoueurEquipe == p_equipeJoueur.IdJoueurEquipe).SingleOrDefault();

            if (equipeJoueurDTO is null)
            {
                throw new InvalidOperationException($"l'evenement avec le id {p_equipeJoueur.IdJoueurEquipe} n'existe pas");
            }

            this.m_context.EquipeJoueurs.Remove(equipeJoueurDTO);
            this.m_context.SaveChanges();
        }
    }
}

using GES_DAL.DbContexts;
using GES_Services.Entites;
using GES_Services.Interfaces;

namespace GES_DAL.Depots
{
    public class DepotEvenementEquipeSQLServer : IDepotEvenementEquipe
    {
        public Equipe_sportiveContext m_context;
        public DepotEvenementEquipeSQLServer(Equipe_sportiveContext p_context)
        {
            if (p_context is null)
            {
                throw new ArgumentNullException(nameof(p_context));
            }
            this.m_context = p_context;
        }

        public void AjouterEquipeDansEvenement(EquipeEvenement p_evenementEquipe)
        {
            if (p_evenementEquipe is null)
            {
                throw new ArgumentNullException(nameof(p_evenementEquipe));
            }
            if (this.m_context.EquipeEvenements.Any(ee => ee.IdEquipeEvenement == p_evenementEquipe.IdEquipeEvenement))
            {
                throw new InvalidOperationException($"l'evenement avec le id {p_evenementEquipe.IdEquipeEvenement} existe déjà");
            }
            this.m_context.EquipeEvenements.Add(new GES_DAL.BackendProject.EquipeEvenement(p_evenementEquipe));
            this.m_context.SaveChanges();
        }

        public EquipeEvenement ChercherEquipeDansEquipeEvenement(EquipeEvenement p_equipeEvenement)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Equipe> ListerEvenementEquipe(Guid p_id)
        {
            if (p_id == Guid.Empty)
            {
                throw new ArgumentOutOfRangeException("le parametre \"id\" doit etre superieur a 0", nameof(p_id));
            }
            //Chercher evenement
            GES_DAL.BackendProject.Evenement? evenementDTO = this.m_context.Evenements.FirstOrDefault(e => e.IdEvenement == p_id);
            if (evenementDTO == null)
            {
                throw new InvalidOperationException($"l'evenement avec l'id {p_id} n'existe pas");
            }

            //Chercher les equipes pour cet evenement
            IEnumerable<Guid?> equipes = this.m_context.EquipeEvenements.Where(ee => ee.Fk_Id_Evenement == p_id).Select(ee => ee.Fk_Id_Equipe);
            //Chercher les equipes
            IEnumerable<Equipe> equipesDTO = this.m_context.Equipes.Where(e => equipes.Contains(e.IdEquipe)).Select(e => e.DeDTOVersEntite());

            return equipesDTO;
        }

        public void SupprimerEvenementEquipe(EquipeEvenement p_equipeEvenement)
        {
            throw new NotImplementedException();
        }
    }
}

using GES_DAL.DbContexts;
using Entite = GES_Services.Entites;
using GES_Services.Interfaces;

namespace GES_DAL.Depots
{
    public class DepotEquipeSQLServer : IDepotEquipe
    {
        private Equipe_sportiveContext m_context;

        public DepotEquipeSQLServer(Equipe_sportiveContext p_context)
        {
            if (p_context is null) throw new ArgumentNullException(nameof(p_context));

            this.m_context = p_context;
        }

        public void AjouterEquipe(Entite.Equipe p_equipe)
        {
            if (p_equipe is null) throw new ArgumentNullException($"Le paramètre {p_equipe} ne peut pas être nulle", nameof(p_equipe));

            if (this.m_context.Equipes.Any(e => e.IdEquipe == p_equipe.IdEquipe)) throw new InvalidOperationException($"L'événement {p_equipe.IdEquipe} existe déjà");

            //validation des données, si l'equipe existe deja dans la bd, on ne l'ajoute pas
            if (this.m_context.Equipes.Any(e => e.Nom == p_equipe.Nom
                                   && e.Region == p_equipe.Region
                                   && e.Sport == p_equipe.Sport
                                   && e.AssociationSportive == p_equipe.AssociationSportive))
            {
                throw new InvalidOperationException($"L'équipe {p_equipe.Nom} existe déjà.");
            }

            this.m_context.Equipes.Add(new BackendProject.Equipe(p_equipe));
            this.m_context.SaveChanges();
        }

        public Entite.Equipe ChercherEquipeParId(Guid p_id)
        {
            if (p_id == Guid.Empty) throw new ArgumentOutOfRangeException("Id invalide", nameof(p_id));

            BackendProject.Equipe? equipeDTO = this.m_context.Equipes.FirstOrDefault(e => e.IdEquipe == p_id);

            if (equipeDTO is null) throw new InvalidOperationException($"l'événement {p_id} n'existe pas");

            return equipeDTO.DeDTOVersEntite();
        }

        public IEnumerable<Entite.Equipe> ListerEquipes() => this.m_context.Equipes.Where(e => e.Etat == true).Select(e => e.DeDTOVersEntite());

        public void ModifierEquipe(Entite.Equipe p_equipe)
        {
            if (p_equipe is null) throw new ArgumentNullException(nameof(p_equipe));

            this.m_context.Equipes.Update(new(p_equipe));
            this.m_context.SaveChanges();
        }

        public void SupprimerEquipe(Entite.Equipe p_equipe)
        {
            if (p_equipe is null) throw new ArgumentNullException(nameof(p_equipe));

            BackendProject.Equipe? equipeDTO = this.m_context.Equipes.Where(e => e.IdEquipe == p_equipe.IdEquipe).SingleOrDefault();

            if (equipeDTO is null) throw new InvalidOperationException($"l'équipe avec le id {p_equipe.IdEquipe} n'existe pas");

            equipeDTO.Etat = false;
            this.m_context.Equipes.Update(equipeDTO);
            this.m_context.SaveChanges();
        }
    }
}

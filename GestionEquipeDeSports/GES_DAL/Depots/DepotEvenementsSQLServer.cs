using GES_DAL.DbContexts;
using GES_Services.Entites;
using GES_Services.Interfaces;

namespace GES_DAL.Depots
{
    public class DepotEvenementsSQLServer : IDepotEvenement
    {
        private Equipe_sportiveContext m_context;

        public DepotEvenementsSQLServer(Equipe_sportiveContext context)
        {
            if (context is null)
            {
                throw new ArgumentNullException(nameof(context));
            }

            this.m_context = context;
        }

        public void AjouterEvenement(Evenement evenement)
        {
            //Add evenement to BD with m_context
            if (evenement is null)
            {
                throw new ArgumentNullException($"le parametre {evenement} ne peut pas etre null", nameof(evenement));
            }

            if (m_context.Evenements.Any(e => e.IdEvenement == evenement.IdEvenement))
            {
                throw new InvalidOperationException($"l'evenement avec le id {evenement.IdEvenement} existe déjà");
            }

            m_context.Evenements.Add(new BackendProject.Evenement(evenement));
            m_context.SaveChanges();
        }

        public Evenement ChercherEvenementParId(Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new ArgumentOutOfRangeException("le parametre \"id\" doit etre superieur a 0", nameof(id));
            }

            BackendProject.Evenement? evenementDTO = m_context.Evenements.FirstOrDefault(e => e.IdEvenement == id);

            if (evenementDTO is null)
            {
                throw new InvalidOperationException($"l'evenement avec le id {id} n'existe pas");
            }

            return evenementDTO.DeDTOVersEntite();
        }

        public IEnumerable<Evenement> ListerEvenements()
        {
            return m_context.Evenements.Where(e => e.Etat == true).Select(e => e.DeDTOVersEntite());
        }

        public void ModifierEvenement(Evenement evenement)
        {
            if (evenement is null)
            {
                throw new ArgumentNullException("le parametre \"evenement\" ne peut pas etre null", nameof(evenement));
            }

            if (!this.m_context.Evenements.Any(e => e.IdEvenement == evenement.IdEvenement))
            {
                throw new InvalidOperationException($"l'evenement avec le id {evenement.IdEvenement} n'existe pas");
            }

            m_context.Evenements.Update(new BackendProject.Evenement(evenement));
            m_context.SaveChanges();
        }

        public void SupprimerEvenement(Evenement evenement)
        {
            if (evenement is null)
            {
                throw new ArgumentNullException("le parametre \"evenement\" ne peut pas etre null", nameof(evenement));
            }

            BackendProject.Evenement? evenementDTO = m_context.Evenements.Where(e => e.IdEvenement == evenement.IdEvenement).SingleOrDefault();

            if (evenementDTO is null)
            {
                throw new InvalidOperationException($"l'evenement avec le id {evenement.IdEvenement} n'existe pas");
            }

            evenementDTO.Etat = false;
            m_context.Evenements.Update(evenementDTO);
            m_context.SaveChanges();
        }
    }
}

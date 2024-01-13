using GES_Services.Entites;
using GES_Services.Interfaces;
using GES_DAL.DbContexts;

namespace GES_DAL.Depots
{
    public class DepotEquipeEvenementSQLServer : IDepotEquipeEvenement
    {
        private Equipe_sportiveContext m_context;
        public DepotEquipeEvenementSQLServer(Equipe_sportiveContext p_context)
        {
            if (p_context is null)
            {
                throw new ArgumentNullException(nameof(p_context));
            }
            this.m_context = p_context;
        }

        void IDepotEquipeEvenement.AjouterEquipeEvenement(EquipeEvenement p_equipeEvenement)
        {
            if (p_equipeEvenement is null)
            {
                throw new ArgumentNullException(nameof(p_equipeEvenement));
            }
            if (this.m_context.EquipeEvenements.Any(ee => ee.IdEquipeEvenement == p_equipeEvenement.IdEquipeEvenement))
            {
                throw new InvalidOperationException($"l'evenement avec le id {p_equipeEvenement.IdEquipeEvenement} existe déjà");
            }

            this.m_context.EquipeEvenements.Add(new GES_DAL.BackendProject.EquipeEvenement(p_equipeEvenement));
            this.m_context.SaveChanges();
        }

        EquipeEvenement IDepotEquipeEvenement.ChercherEquipeEvenementParId(Guid p_id)
        {
            if (p_id == Guid.Empty)
            {
                throw new ArgumentOutOfRangeException("le parametre \"id\" doit etre superieur a 0", nameof(p_id));
            }
            BackendProject.EquipeEvenement? equipeEvenementDTO = m_context.EquipeEvenements.FirstOrDefault(ee => ee.Fk_Id_Equipe == p_id);
            if (equipeEvenementDTO == null)
            {
                throw new InvalidOperationException($"l'equipe avec le id {p_id} n'existe pas");
            }
            return equipeEvenementDTO.DeDTOVersEntite();
        }

        void IDepotEquipeEvenement.ModifierEquipeEvenement(EquipeEvenement p_equipeEvenement)
        {
            throw new NotImplementedException();
        }

        void IDepotEquipeEvenement.SupprimerEquipeEvenement(EquipeEvenement p_equipeEvenement)
        {
            if (p_equipeEvenement is null)
            {
                throw new ArgumentNullException("le parametre \"evenement\" ne peut pas etre null", nameof(p_equipeEvenement));
            }

            BackendProject.EquipeEvenement? equipeEvenementDTO = m_context.EquipeEvenements.SingleOrDefault(
                e => e.Fk_Id_Equipe == p_equipeEvenement.Fk_Id_Equipe && e.Fk_Id_Evenement == p_equipeEvenement.Fk_Id_Evenement
            );

            if (equipeEvenementDTO is null)
            {
                throw new InvalidOperationException($"l'evenement avec le id {p_equipeEvenement.Fk_Id_Evenement} n'existe pas");
            }

            this.m_context.EquipeEvenements.Remove(equipeEvenementDTO);
            this.m_context.SaveChanges();
        }

        public IEnumerable<Evenement> ListerEquipeEvenements(Guid p_id)
        {
            //Trouver equipe
            BackendProject.Equipe? equipeDTO = m_context.Equipes.FirstOrDefault(e => e.IdEquipe == p_id);

            if (equipeDTO == null)
            {
                throw new InvalidOperationException($"l'equipe avec le id {p_id} n'existe pas");
            }

            //Trouver les evenements de l'equipe
            IEnumerable<Guid?> evenements = m_context.EquipeEvenements.Where(ee => ee.Fk_Id_Equipe == p_id).Select(ee => ee.Fk_Id_Evenement);

            //Trouver les evenements
            IEnumerable<Evenement> evenementsDTO = m_context.Evenements.Where(e => evenements.Contains(e.IdEvenement)).Select(e => e.DeDTOVersEntite());

            return evenementsDTO;

        }

        public EquipeEvenement ChercherEvenementDansEquipeEvenement(EquipeEvenement p_equipeEvenement)
        {
            if (p_equipeEvenement is null)
            {
                throw new ArgumentNullException("le parametre \"evenement\" ne peut pas etre null", nameof(p_equipeEvenement));
            }
            // Trover equipe
            BackendProject.Equipe? equipeDTO = m_context.Equipes.FirstOrDefault(e => e.IdEquipe == p_equipeEvenement.Fk_Id_Equipe);
            if (equipeDTO is null)
            {
                throw new InvalidOperationException($"l'equipe avec le id {p_equipeEvenement.Fk_Id_Equipe} n'existe pas");
            }

            BackendProject.EquipeEvenement evenementDansEquipe = this.m_context.EquipeEvenements.SingleOrDefault(
                ee => ee.Fk_Id_Equipe == p_equipeEvenement.Fk_Id_Equipe && ee.Fk_Id_Evenement == p_equipeEvenement.Fk_Id_Evenement
            )!;
            EquipeEvenement equipeEvenement;

            if (evenementDansEquipe != null)
            {
                equipeEvenement = evenementDansEquipe.DeDTOVersEntite();
                return equipeEvenement;
            }
            else
            {
                return equipeEvenement = null!;
            }
        }
    }
}

using GES_Services.Entites;
using GES_Services.Interfaces;

namespace GES_Services.Manipulations
{
    public class ManipulationDepotEvenement
    {
        private IDepotEvenement _depotEvenement;

        public ManipulationDepotEvenement(IDepotEvenement depotEvenement)
        {
            this._depotEvenement = depotEvenement;
        }

        public IEnumerable<Evenement> ListerEvenements()
        {
            return this._depotEvenement.ListerEvenements();
        }

        public Evenement ChercherEvenementParId(Guid id)
        {
            return this._depotEvenement.ChercherEvenementParId(id);
        }

        public void AjouterEvenement(Evenement evenement)
        {
            if (evenement is null)
            {
                throw new ArgumentNullException("le parametre \"evenement\" ne peut pas etre null", nameof(evenement));
            }
            this._depotEvenement.AjouterEvenement(evenement);
        }

        public void ModifierEvenement(Evenement evenement)
        {
            if (evenement is null)
            {
                throw new ArgumentNullException("le parametre \"evenement\" ne peut pas etre null", nameof(evenement));
            }
            this._depotEvenement.ModifierEvenement(evenement);
        }

        public void SupprimerEvenement(Evenement evenement)
        {
            if (evenement is null)
            {
                throw new ArgumentNullException("le parametre \"evenement\" ne peut pas etre null", nameof(evenement));
            }
            this._depotEvenement.SupprimerEvenement(evenement);
        }
    }
}

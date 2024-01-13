using GES_Services.Entites;

namespace GES_Services.Interfaces
{
    public interface IDepotEvenement
    {
        public void AjouterEvenement(Evenement evenement);
        public void ModifierEvenement(Evenement evenement);
        public void SupprimerEvenement(Evenement evenement);
        public Evenement ChercherEvenementParId(Guid id);
        public IEnumerable<Evenement> ListerEvenements();
    }
}

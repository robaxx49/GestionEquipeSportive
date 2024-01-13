using GES_Services.Entites;

namespace GES_Services.Interfaces
{
    public interface IDepotEquipeEvenement
    {
        public IEnumerable<Evenement> ListerEquipeEvenements(Guid p_id);
        public EquipeEvenement ChercherEquipeEvenementParId(Guid p_id);
        public void AjouterEquipeEvenement(EquipeEvenement p_equipeEvenement);
        public void ModifierEquipeEvenement(EquipeEvenement p_equipeEvenement);
        public void SupprimerEquipeEvenement(EquipeEvenement p_equipeEvenement);
        public EquipeEvenement ChercherEvenementDansEquipeEvenement(EquipeEvenement p_equipeEvenement);
    }
}

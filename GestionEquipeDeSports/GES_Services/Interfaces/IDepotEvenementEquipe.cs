
using GES_Services.Entites;

namespace GES_Services.Interfaces
{
    public interface IDepotEvenementEquipe
    {
        public IEnumerable<Equipe> ListerEvenementEquipe(Guid p_id);
        public void AjouterEquipeDansEvenement(EquipeEvenement p_evenementEquipe);
        public EquipeEvenement ChercherEquipeDansEquipeEvenement(EquipeEvenement p_equipeEvenement);
        public void SupprimerEvenementEquipe(EquipeEvenement p_equipeEvenement);
    }
}

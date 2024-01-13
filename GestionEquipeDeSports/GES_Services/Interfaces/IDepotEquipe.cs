using GES_Services.Entites;

namespace GES_Services.Interfaces
{
    public interface IDepotEquipe
    {
        public IEnumerable<Equipe> ListerEquipes();
        public Equipe ChercherEquipeParId(Guid id);
        public void AjouterEquipe(Equipe p_equipe);
        public void ModifierEquipe(Equipe p_equipe);
        public void SupprimerEquipe(Equipe p_equipe);
    }
}

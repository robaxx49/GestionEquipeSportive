using GES_Services.Entites;

namespace GES_Services.Interfaces
{
    public interface IDepotEquipeJoueur
    {
        public IEnumerable<Utilisateur> ListerEquipeJouers(Guid p_id);
        public EquipeJoueur ChercherEquipeJoueurParId(Guid p_id);
        public void AjouterEquipeJoueur(EquipeJoueur p_equipeJoueur);
        public void SupprimerEquipeJoueur(EquipeJoueur p_equipeJoueur);
        public void ModifierEquipeJoueur(EquipeJoueur p_equipeJoueur);
        // ???
        public EquipeJoueur ChercherIdEquipeJoueurDansEquipeJoueur(EquipeJoueur p_equipeJoueur);
        // ???
        public EquipeJoueur ChercherIdJoueurtDansEquipeJoueur(Guid p_id);
    }
}

using GES_Services.Entites;

namespace GES_Services.Interfaces
{
    public interface IDepotUtilisateurEquipe
    {
        public IEnumerable<Equipe> ListerEquipesPourUtilisateur(Guid p_id);
        //public void AjouterEquipeAUtilisateur(EquipeJoueur p_equipe);
        //public void SupprimerEquipeDeUtilisateur(EquipeJoueur p_equipe);
        //public void ModifierEquipeDeUtilisateur(EquipeJoueur p_equipe);
    }
}

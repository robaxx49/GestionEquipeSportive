using GES_Services.Entites;


namespace GES_Services.Interfaces
{
    public interface IDepotUtilisateur
    {
        public void AjouterUtilisateur(Utilisateur utilisateur);
        public void ModifierUtilisateur(Utilisateur utilisateur, Guid p_id);
        public void SupprimerUtilisateur(Utilisateur utilisateur);
        public Utilisateur ChercherUtilisateurParId(Guid id);
        public IEnumerable<Utilisateur> ListerUtilisateurs();
        public Utilisateur ChercherUtilisateurParEmail(string email);
    }
}

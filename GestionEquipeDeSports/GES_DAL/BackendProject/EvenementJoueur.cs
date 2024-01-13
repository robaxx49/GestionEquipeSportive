namespace GES_DAL.BackendProject
{
    public partial class EvenementJoueur
    {
        public Guid IdEvenementJoueur { get; set; }
        public bool EstPresentAevenement { get; set; }
        public Guid? Fk_Id_Evenement { get; set; }
        public Guid? Fk_Id_Utilisateur { get; set; }

        public virtual Evenement FkIdEvenementNavigation { get; set; } = null!;
        public virtual Utilisateur FkIdUtilisateurNavigation { get; set; } = null!;

        public EvenementJoueur()
        {
            ;
        }

        public EvenementJoueur(GES_Services.Entites.EvenementJoueur evenementJoueur)
        {
            EstPresentAevenement = evenementJoueur.EstPresentAevenement;
            Fk_Id_Evenement = evenementJoueur.Fk_Id_Evenement;
            Fk_Id_Utilisateur = evenementJoueur.Fk_Id_Utilisateur;
        }

        public GES_Services.Entites.EvenementJoueur DeDTOVersEntite()
        {
            return new GES_Services.Entites.EvenementJoueur(IdEvenementJoueur, EstPresentAevenement, Fk_Id_Evenement, Fk_Id_Utilisateur);
        }
    }
}

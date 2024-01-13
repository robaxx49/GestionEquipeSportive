namespace GES_Services.Entites
{
    public class EvenementJoueur
    {
        public Guid? IdEvenementJoueur { get; set; }
        public bool EstPresentAevenement { get; set; }
        public Guid? Fk_Id_Evenement { get; set; }
        public Guid? Fk_Id_Utilisateur { get; set; }
        public EvenementJoueur()
        {
            ;
        }
        public EvenementJoueur(bool estPresentAevenement, Guid? fk_Id_Evenement, Guid? fk_Id_Utilisateur)
        {
            this.EstPresentAevenement = estPresentAevenement;
            this.Fk_Id_Evenement = fk_Id_Evenement;
            this.Fk_Id_Utilisateur = fk_Id_Utilisateur;
        }
        public EvenementJoueur(Guid? p_idEvenementJoueur, bool estPresentAevenement, Guid? fk_Id_Evenement, Guid? fk_Id_Utilisateur)
        {
            this.IdEvenementJoueur = p_idEvenementJoueur;
            this.EstPresentAevenement = estPresentAevenement;
            this.Fk_Id_Evenement = fk_Id_Evenement;
            this.Fk_Id_Utilisateur = fk_Id_Utilisateur;
        }
    }
}

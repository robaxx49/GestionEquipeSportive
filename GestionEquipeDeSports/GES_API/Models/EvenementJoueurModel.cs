using GES_Services.Entites;

namespace GES_API.Models
{

    public class EvenementJoueurModel
    {
        public Guid? IdEvenementJoueur { get; set; }
        public bool EstPresentAevenement { get; set; }
        public Guid? Fk_Id_Evenement { get; set; }
        public Guid? Fk_Id_Utilisateur { get; set; }

        public EvenementJoueurModel()
        {
            ;
        }

        public EvenementJoueurModel(Guid? p_idEvenementJoueur, bool estPresentAevenement, Guid? fk_Id_Evenement, Guid? fk_Id_Utilisateur)
        {
            IdEvenementJoueur = p_idEvenementJoueur;
            EstPresentAevenement = estPresentAevenement;
            Fk_Id_Evenement = fk_Id_Evenement;
            Fk_Id_Utilisateur = fk_Id_Utilisateur;
        }


        public EvenementJoueurModel(EvenementJoueur p_evenementJoueur)
        {
            if (p_evenementJoueur == null)
            {
                throw new ArgumentNullException(nameof(p_evenementJoueur));
            }
            this.IdEvenementJoueur = p_evenementJoueur.IdEvenementJoueur;
            this.EstPresentAevenement = p_evenementJoueur.EstPresentAevenement;
            this.Fk_Id_Evenement = p_evenementJoueur.Fk_Id_Evenement;
            this.Fk_Id_Utilisateur = p_evenementJoueur.Fk_Id_Utilisateur;
        }

        public EvenementJoueur DeModelVersEntite()
        {
            return new EvenementJoueur(this.IdEvenementJoueur, this.EstPresentAevenement, this.Fk_Id_Evenement, this.Fk_Id_Utilisateur);
        }
    }
}

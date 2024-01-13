using GES_Services.Entites;
namespace GES_API.Models
{
    public class EquipeJoueurModel
    {
        public Guid? IdJoueurEquipe { get; set; }
        public Guid? Fk_Id_Utilisateur { get; set; }
        public Guid? Fk_Id_Equipe { get; set; }
        public EquipeJoueurModel()
        {
            ;
        }
        public EquipeJoueurModel(EquipeJoueur p_equipeJoueur)
        {
            this.IdJoueurEquipe = p_equipeJoueur.IdJoueurEquipe;
            this.Fk_Id_Equipe = p_equipeJoueur.Fk_Id_Equipe;
            this.Fk_Id_Utilisateur = p_equipeJoueur.Fk_Id_Utilisateur;
        }
        public EquipeJoueur DeModelVersEntite()
        {
            return new EquipeJoueur(this.IdJoueurEquipe, this.Fk_Id_Equipe, this.Fk_Id_Utilisateur);
        }
    }
}

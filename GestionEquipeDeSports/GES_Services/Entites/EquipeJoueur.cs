namespace GES_Services.Entites
{
    public partial class EquipeJoueur
    {
        public Guid? IdJoueurEquipe { get; set; }
        public Guid? Fk_Id_Utilisateur { get; set; }
        public Guid? Fk_Id_Equipe { get; set; }

        public EquipeJoueur()
        {
            ;
        }

        public EquipeJoueur(Guid? idJoueurEquipe, Guid? fkIdEquipe, Guid? fkIdUtilisateur)
        {
            this.IdJoueurEquipe = idJoueurEquipe;
            this.Fk_Id_Utilisateur = fkIdUtilisateur;
            this.Fk_Id_Equipe = fkIdEquipe;
        }
    }
}

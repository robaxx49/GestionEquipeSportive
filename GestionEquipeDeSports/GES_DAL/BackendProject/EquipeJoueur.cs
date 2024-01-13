namespace GES_DAL.BackendProject
{
    public partial class EquipeJoueur
    {
        public Guid? IdJoueurEquipe { get; set; }
        public Guid? Fk_Id_Utilisateur { get; set; }
        public Guid? Fk_Id_Equipe { get; set; }

        public virtual Equipe FkIdEquipeNavigation { get; set; } = null!;
        public virtual Utilisateur FkIdUtilisateurNavigation { get; set; } = null!;

        public EquipeJoueur()
        {
            ;
        }

        public EquipeJoueur(GES_Services.Entites.EquipeJoueur p_equipeJoueur)
        {
            if (p_equipeJoueur.IdJoueurEquipe is null || p_equipeJoueur.IdJoueurEquipe == Guid.Empty)
            {
                IdJoueurEquipe = Guid.NewGuid();
            }
            else
            {
                this.IdJoueurEquipe = p_equipeJoueur.IdJoueurEquipe;
            }
            this.Fk_Id_Equipe = p_equipeJoueur.Fk_Id_Equipe;
            this.Fk_Id_Utilisateur = p_equipeJoueur.Fk_Id_Utilisateur;
        }

        public GES_Services.Entites.EquipeJoueur FromDTO()
        {
            return new GES_Services.Entites.EquipeJoueur(IdJoueurEquipe, Fk_Id_Utilisateur, Fk_Id_Equipe);
        }
    }
}

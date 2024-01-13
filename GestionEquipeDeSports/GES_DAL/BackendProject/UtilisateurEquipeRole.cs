namespace GES_DAL.BackendProject
{
    public partial class UtilisateurEquipeRole
    {
        public Guid IdUtilisateurEquipeRole { get; set; }
        public Guid FkIdUtilisateur { get; set; }
        public Guid FkIdEquipe { get; set; }
        public int FkIdRole { get; set; }
        public string? DescriptionRole { get; set; }

        public virtual Equipe FkIdEquipeNavigation { get; set; } = null!;
        public virtual Role FkIdRoleNavigation { get; set; } = null!;
        public virtual Utilisateur FkIdUtilisateurNavigation { get; set; } = null!;

        public UtilisateurEquipeRole()
        {
            ;
        }

        public UtilisateurEquipeRole(GES_Services.Entites.UtilisateurEquipeRole utilisateurEquipeRole)
        {
            this.FkIdUtilisateur = utilisateurEquipeRole.FkIdUtilisateur;
            this.IdUtilisateurEquipeRole = utilisateurEquipeRole.IdUtilisateurEquipeRole;
            this.FkIdEquipe = utilisateurEquipeRole.FkIdEquipe;
            this.FkIdRole = utilisateurEquipeRole.FkIdRole;
            this.DescriptionRole = utilisateurEquipeRole.DescriptionRole;
        }

        public GES_Services.Entites.UtilisateurEquipeRole DeDTOVersEntite()
        {
            return new GES_Services.Entites.UtilisateurEquipeRole(
                this.IdUtilisateurEquipeRole,
                this.FkIdUtilisateur,
                this.FkIdEquipe,
                this.FkIdRole,
                this.DescriptionRole!
            );
        }
    }
}

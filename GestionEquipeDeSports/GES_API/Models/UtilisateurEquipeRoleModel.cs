using GES_Services.Entites;

namespace GES_API.Models
{
    public class UtilisateurEquipeRoleModel
    {
        public Guid IdUtilisateurEquipeRole { get; set; }
        public Guid FkIdUtilisateur { get; set; }
        public Guid FkIdEquipe { get; set; }
        public int FkIdRole { get; set; }
        public string? DescriptionRole { get; set; }

        public UtilisateurEquipeRoleModel()
        {
            ;
        }

        public UtilisateurEquipeRoleModel(UtilisateurEquipeRole p_utilisateurEquipeModel)
        {
            this.IdUtilisateurEquipeRole = p_utilisateurEquipeModel.IdUtilisateurEquipeRole;
            this.FkIdEquipe = p_utilisateurEquipeModel.FkIdEquipe;
            this.FkIdUtilisateur = p_utilisateurEquipeModel.FkIdUtilisateur;
            this.FkIdRole = p_utilisateurEquipeModel.FkIdRole;
            this.DescriptionRole = p_utilisateurEquipeModel.DescriptionRole!;
        }

        public UtilisateurEquipeRole DeModelVersEntite()
        {
            return new UtilisateurEquipeRole(
                this.IdUtilisateurEquipeRole,
                this.FkIdUtilisateur,
                this.FkIdEquipe,
                this.FkIdRole,
                this.DescriptionRole!
            );
        }
    }
}

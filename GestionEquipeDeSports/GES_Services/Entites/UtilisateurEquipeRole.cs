namespace GES_Services.Entites
{
    public class UtilisateurEquipeRole
    {        
        public Guid IdUtilisateurEquipeRole { get; set; }
        public Guid FkIdUtilisateur { get; set; }
        public Guid FkIdEquipe { get; set; }
        public int FkIdRole { get; set; }
        public string? DescriptionRole { get; set; }

        public UtilisateurEquipeRole()
        {
            ;
        }

        public UtilisateurEquipeRole(Guid p_idUtilisateurEquipeRole, Guid p_fkIdUtilisateur, Guid p_fkIdEquipe, int p_fkIdRole, string p_descriptionRole)
        {
            this.IdUtilisateurEquipeRole = p_idUtilisateurEquipeRole;
            this.FkIdUtilisateur = p_fkIdUtilisateur;
            this.FkIdEquipe = p_fkIdEquipe;
            this.FkIdRole = p_fkIdRole;
            this.DescriptionRole = p_descriptionRole;
        }
    }
}

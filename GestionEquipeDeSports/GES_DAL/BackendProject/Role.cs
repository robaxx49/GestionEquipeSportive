namespace GES_DAL.BackendProject
{
    public partial class Role
    {
        public Role()
        {
            UtilisateurEquipeRoles = new HashSet<UtilisateurEquipeRole>();
            Utilisateurs = new HashSet<Utilisateur>();
        }

        public int IdRole { get; set; }
        public string Description { get; set; } = null!;

        public virtual ICollection<UtilisateurEquipeRole> UtilisateurEquipeRoles { get; set; }
        public virtual ICollection<Utilisateur> Utilisateurs { get; set; }
    }
}

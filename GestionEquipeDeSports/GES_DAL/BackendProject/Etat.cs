namespace GES_DAL.BackendProject
{
    public partial class Etat
    {
        public Etat()
        {
            Equipes = new HashSet<Equipe>();
            Utilisateurs = new HashSet<Utilisateur>();
        }

        public bool IdEtat { get; set; }
        public string Description { get; set; } = null!;

        public virtual ICollection<Equipe> Equipes { get; set; }
        public virtual ICollection<Utilisateur> Utilisateurs { get; set; }
    }
}

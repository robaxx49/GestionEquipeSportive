namespace GES_DAL.BackendProject
{
    public partial class TypeEvenement
    {
        public TypeEvenement()
        {
            Evenements = new HashSet<Evenement>();
        }

        public int IdTypeEvenement { get; set; }
        public string Description { get; set; } = null!;

        public virtual ICollection<Evenement> Evenements { get; set; }
    }
}

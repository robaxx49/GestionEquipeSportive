namespace GES_DAL.BackendProject
{
    public partial class EquipeEvenement
    {
        public Guid IdEquipeEvenement { get; set; }
        public Guid? Fk_Id_Equipe { get; set; }
        public Guid? Fk_Id_Evenement { get; set; }

        public virtual Equipe FkIdEquipeNavigation { get; set; } = null!;
        public virtual Evenement FkIdEvenementNavigation { get; set; } = null!;

        public EquipeEvenement()
        {
            ;
        }

        public EquipeEvenement(GES_Services.Entites.EquipeEvenement p_equipeEvenement)
        {
            this.IdEquipeEvenement = p_equipeEvenement.IdEquipeEvenement;
            this.Fk_Id_Equipe = p_equipeEvenement.Fk_Id_Equipe;
            this.Fk_Id_Evenement = p_equipeEvenement.Fk_Id_Evenement;
        }
        public GES_Services.Entites.EquipeEvenement DeDTOVersEntite()
        {
            return new GES_Services.Entites.EquipeEvenement(IdEquipeEvenement, Fk_Id_Equipe, Fk_Id_Evenement);
        }
    }
}

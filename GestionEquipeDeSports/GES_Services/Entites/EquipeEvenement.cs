namespace GES_Services.Entites
{
    public partial class EquipeEvenement
    {
        public Guid IdEquipeEvenement { get; set; }
        public Guid? Fk_Id_Equipe { get; set; }
        public Guid? Fk_Id_Evenement { get; set; }
        public EquipeEvenement(Guid p_idConnEquipeEvenement, Guid? p_fkIdEquipe, Guid? p_fkIdEvenement)
        {
            this.IdEquipeEvenement = p_idConnEquipeEvenement;
            this.Fk_Id_Equipe = p_fkIdEquipe;
            this.Fk_Id_Evenement = p_fkIdEvenement;
        }
    }
}

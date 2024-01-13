using GES_Services.Entites;

namespace GES_API.Models
{
    public class EquipeEvenementModel
    {
        public Guid IdEquipeEvenement { get; set; }
        public Guid? Fk_Id_Equipe { get; set; }
        public Guid? Fk_Id_Evenement { get; set; }
        public EquipeEvenementModel()
        {
            ;
        }
        public EquipeEvenementModel(EquipeEvenement p_equipeEvenement)
        {
            this.IdEquipeEvenement = p_equipeEvenement.IdEquipeEvenement;
            this.Fk_Id_Equipe = p_equipeEvenement.Fk_Id_Equipe;
            this.Fk_Id_Evenement = p_equipeEvenement.Fk_Id_Evenement;
        }
        public EquipeEvenement DeModelVersEntite()
        {
            return new EquipeEvenement(this.IdEquipeEvenement, this.Fk_Id_Equipe, this.Fk_Id_Evenement);
        }
    }
}

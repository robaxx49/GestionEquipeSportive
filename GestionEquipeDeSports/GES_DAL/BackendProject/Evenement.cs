namespace GES_DAL.BackendProject
{
#pragma warning disable 8618
    public partial class Evenement
    {
        public Evenement()
        {
            this.EquipeEvenements = new HashSet<EquipeEvenement>();
            this.EvenementJoueurs = new HashSet<EvenementJoueur>();
        }

        public Guid IdEvenement { get; set; }
        public string Description { get; set; } = null!;
        public string Emplacement { get; set; } = null!;
        public DateTime? DateDebut { get; set; }
        public DateTime? DateFin { get; set; }
        public DateTime? DateCreation { get; set; }
        public DateTime? DateModification { get; set; }
        public bool? Etat { get; set; }
        public int FkIdTypeEvenement { get; set; }
        public double? Duree { get; set; }
        public string? Url { get; set; }

        public virtual TypeEvenement FkIdTypeEvenementNavigation { get; set; } = null!;
        public virtual ICollection<EquipeEvenement> EquipeEvenements { get; set; }
        public virtual ICollection<EvenementJoueur> EvenementJoueurs { get; set; }

        public Evenement(GES_Services.Entites.Evenement evenement)
        {
            this.IdEvenement = evenement.IdEvenement;
            this.Description = evenement.Description;
            this.Emplacement = evenement.Emplacement;
            this.DateDebut = evenement.DateDebut;
            this.DateFin = evenement.DateFin;
            this.DateCreation = evenement.DateCreation;
            this.DateModification = evenement.DateModification;
            this.FkIdTypeEvenement = (int)evenement.TypeEvenement.IdTypeEvenement;
            this.Etat = evenement.Etat;
            this.Duree = evenement.Duree;
            this.Url = evenement.Url;
        }

        public GES_Services.Entites.Evenement DeDTOVersEntite()
        {
            return new GES_Services.Entites.Evenement(
                this.IdEvenement,
                this.Description,
                this.Emplacement,
                this.DateDebut,
                this.DateFin,
                this.Duree,
                this.FkIdTypeEvenement,
                this.Url!
            );
        }
    }
}

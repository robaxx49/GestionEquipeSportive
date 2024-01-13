namespace GES_Services.Entites
{
    public class Equipe
    {
        public Equipe(Guid guid, string nom, string region, string sport, string associationSportive, string lienGroupeFacebook)
        {
            this.Etat = true;
            this.DateCreation = DateTime.Now;
            this.DateModification = DateTime.Now;
            this.IdEquipe = guid;
            this.Nom = nom;
            this.Region = region;
            this.Sport = sport;
            this.AssociationSportive = associationSportive;
            this.LienGroupeFacebook = lienGroupeFacebook;
        }

        public Guid IdEquipe { get; private set; }
        public string? Nom { get; private set; }
        public string? Region { get; private set; }
        public bool? Etat { get; private set; }
        public DateTime? DateCreation { get; private set; }
        public DateTime? DateModification { get; private set; }
        public string? Sport { get; private set; }
        public string? AssociationSportive { get; private set; }
        public string? LienGroupeFacebook { get; private set; }
    }
}

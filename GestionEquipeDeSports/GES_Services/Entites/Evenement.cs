namespace GES_Services.Entites
{
#pragma warning disable 8618
    public class Evenement
    {
        public Guid IdEvenement { get; private set; }
        public string Description { get; private set; } = null!;
        public string Emplacement { get; private set; } = null!;
        public DateTime? DateDebut { get; private set; }
        public DateTime? DateFin { get; private set; }
        public DateTime? DateCreation { get; private set; }
        public DateTime? DateModification { get; private set; }
        public TypeEvenement TypeEvenement { get; private set; }
        public bool? Etat { get; private set; }
        public double? Duree { get; private set; }
        public string Url { get; private set; } = null!;

        public Evenement()
        {
            ;
        }

        public Evenement(string description, DateTime dateDebut, double? duree, string emplacement, string typeEvenement, string url)
        {
            if (typeEvenement == "entrainement")
            {
                this.TypeEvenement!.IdTypeEvenement = 0;
            }
            else if (typeEvenement == "partie")
            {
                this.TypeEvenement!.IdTypeEvenement = 1;
            }
            else if (typeEvenement == "autre")
            {
                this.TypeEvenement!.IdTypeEvenement = 2;
            }
            else
            {
                throw new ArgumentException($"parametre {typeEvenement} est invalide", nameof(typeEvenement));
            }

            if (description is null)
            {
                throw new ArgumentNullException($"parametre {description} est invalide", nameof(description));
            }

            if (emplacement is null)
            {
                throw new ArgumentNullException($"parametre {emplacement} est invalide", nameof(emplacement));
            }

            this.Duree = duree;
            this.Description = description;
            this.DateDebut = dateDebut;
            this.DateFin = DateDebut?.AddMinutes((double)duree!);
            this.Emplacement = emplacement;
            this.Url = url;
        }

        public Evenement(Guid guid, string description, string emplacement, DateTime? dateDebut, double? duree, int typeEvenement, string url)
        {
            if (guid == Guid.Empty)
            {
                this.IdEvenement = Guid.NewGuid();
            }
            else
            {
                this.IdEvenement = guid;
            }

            if (description is null)
            {
                throw new ArgumentNullException($"parametre {description} est invalide", nameof(description));
            }

            if (emplacement is null)
            {
                throw new ArgumentNullException($"parametre {emplacement} est invalide", nameof(emplacement));
            }

            this.TypeEvenement = new TypeEvenement();

            this.Description = description;
            this.Emplacement = emplacement;
            this.DateDebut = dateDebut;
            this.DateFin = DateDebut?.AddMinutes((double)duree!);
            this.Etat = true;
            this.Duree = duree;
            this.TypeEvenement.IdTypeEvenement = typeEvenement;
            this.Url = url;
        }

        public Evenement(Guid guid, string description, string emplacement, DateTime? dateDebut, DateTime? dateFin, double? duree, int typeEvenement, string url)
        {

            if (guid == Guid.Empty)
            {
                this.IdEvenement = Guid.NewGuid();
            }
            else
            {
                this.IdEvenement = guid;
            }


            this.TypeEvenement = new TypeEvenement();

            this.TypeEvenement.IdTypeEvenement = typeEvenement;

            if (description is null)
            {
                throw new ArgumentNullException($"parametre {description} est invalide", nameof(description));
            }

            if (emplacement is null)
            {
                throw new ArgumentNullException($"parametre {emplacement} est invalide", nameof(emplacement));
            }

            this.Duree = duree;
            this.Description = description;
            this.DateDebut = dateDebut;
            this.DateFin = dateFin;
            this.Emplacement = emplacement;
            this.Url = url;
        }
    }
}

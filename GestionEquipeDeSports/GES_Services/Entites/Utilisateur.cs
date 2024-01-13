namespace GES_Services.Entites;
public partial class Utilisateur
{
    public Guid IdUtilisateur { get; private set; }
    public string? Nom { get; private set; }
    public string? Prenom { get; private set; }
    public int? Age { get; private set; }
    public string? Email { get; private set; }
    public string? Adresse { get; private set; }
    public string? NumTelephone { get; private set; }
    public DateTime? DateCreation { get; private set; }
    public DateTime? DateModification { get; private set; }
    public DateTime? DateNaissance { get; private set; }
    public bool? Etat { get; private set; }
    public EnumTypeRole Role { get; private set; }
    public Utilisateur(Guid guid, string nom, string prenom, DateTime? dateNaissance,
                       string email, string adresse, string numTelephone, EnumTypeRole role, bool? etat)
    {
        this.IdUtilisateur = guid == Guid.Empty ? Guid.NewGuid() : guid;

        if (nom is null) throw new ArgumentNullException($"Le paramètre nom: {nom} est invalide", nameof(nom));
        if (prenom is null) throw new ArgumentNullException($"Le paramètre prenom: {prenom} est invalide", nameof(prenom));
        if (email is null) throw new ArgumentNullException($"Le paramètre email: {email} est invalide", nameof(email));
        if (dateNaissance is null) throw new ArgumentNullException($"Le paramètre dateNaissance: {dateNaissance} est invalide", nameof(dateNaissance));
        if (etat is null) throw new ArgumentNullException($"Le paramètre etat: {etat} est invalide", nameof(etat));

        this.Nom = nom;
        this.Prenom = prenom;
        this.Email = email;
        this.DateNaissance = dateNaissance;
        this.Role = role;
        this.NumTelephone = numTelephone;
        this.Adresse = adresse;
        this.Etat = etat;

        int dateDuJour = int.Parse(DateTime.Now.ToString("yyyyMMdd"));
        this.Age = (dateDuJour - int.Parse(dateNaissance.Value.ToString("yyyyMMdd"))) / 10000;
    }

    public void UpdateEtat(bool newEtat) => Etat = newEtat;

    public Utilisateur(Guid guid, string nom, string prenom, DateTime dateNaissance, int? age, string email, string adresse,
                        string numTelephone, bool? etat)
    {
        this.IdUtilisateur = guid;
        this.Nom = nom;
        this.Prenom = prenom;
        this.DateNaissance = dateNaissance;
        this.Age = age;
        this.Email = email;
        this.Adresse = adresse;
        this.NumTelephone = numTelephone;
        this.Etat = etat;
    }
}

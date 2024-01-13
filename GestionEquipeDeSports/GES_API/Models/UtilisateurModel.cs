using GES_Services.Entites;

namespace GES_API.Models
{
    public class UtilisateurModel
    {
        public Guid IdUtilisateur { get; set; }
        public string? Nom { get; set; }
        public string? Prenom { get; set; }
        public int? Age { get; set; }
        public string? Email { get; set; }
        public string? Adresse { get; set; }
        public string? NumTelephone { get; set; }
        public DateTime? DateCreation { get; set; }
        public DateTime? DateModification { get; set; }
        public DateTime DateNaissance { get; set; }
        public EnumTypeRole Roles { get; set; }
        public bool? FK_Id_Etat { get; set; }
        public bool? Etat { get; set; }

        public UtilisateurModel()
        {
            ;
        }

        public UtilisateurModel(Utilisateur p_utilisateur)
        {
            this.IdUtilisateur = p_utilisateur.IdUtilisateur;
            this.Nom = p_utilisateur.Nom;
            this.Prenom = p_utilisateur.Prenom;
            this.Age = p_utilisateur.Age;
            this.Email = p_utilisateur.Email;
            this.Age = p_utilisateur.Age;
            this.Adresse = p_utilisateur.Adresse;
            this.NumTelephone = p_utilisateur.NumTelephone;
            this.DateCreation = p_utilisateur.DateCreation;
            this.DateModification = p_utilisateur.DateModification;
            this.Roles = p_utilisateur.Role;
            this.Etat = p_utilisateur.Etat;
        }

        public Utilisateur DeModelVersEntite()
        {
            return new Utilisateur(
                this.IdUtilisateur,
                this.Nom!,
                this.Prenom!,
                this.DateNaissance,
                this.Email!,
                this.Adresse!,
                this.NumTelephone!,
                this.Roles,
                this.Etat
               );
        }
    }
}

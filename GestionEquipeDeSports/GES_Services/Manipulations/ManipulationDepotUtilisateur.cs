using GES_Services.Entites;
using GES_Services.Interfaces;

namespace GES_Services.Manipulations
{
    public class ManipulationDepotUtilisateur
    {
        private IDepotUtilisateur _depotUtilisateur;

        public ManipulationDepotUtilisateur(IDepotUtilisateur depotUtilisateur)
        {
            this._depotUtilisateur = depotUtilisateur;
        }

        public void AjouterUtilisateur(Utilisateur utilisateur)
        {
            if (utilisateur is null)
            {
                throw new ArgumentNullException("L'utilisateur ne peut pas être null", nameof(utilisateur));
            }

            this._depotUtilisateur.AjouterUtilisateur(utilisateur);
        }

        public void ModifierUtilisateur(Utilisateur utilisateur, Guid p_id)
        {
            if (utilisateur is null)
            {
                throw new ArgumentNullException("L'utilisateur ne peut pas être null", nameof(utilisateur));
            }

            this._depotUtilisateur.ModifierUtilisateur(utilisateur, p_id);
        }

        public void SupprimerUtilisateur(Utilisateur utilisateur)
        {
            if (utilisateur is null)
            {
                throw new ArgumentNullException("L'utilisateur ne peut pas être null", nameof(utilisateur));
            }

            this._depotUtilisateur.SupprimerUtilisateur(utilisateur);
        }

        public Utilisateur ChercherUtilisateurParId(Guid p_id)
        {
            if (p_id == Guid.Empty)
            {
                throw new ArgumentOutOfRangeException("le parametre \"id\" doit etre superieur a 0", nameof(p_id));
            }
            return this._depotUtilisateur.ChercherUtilisateurParId(p_id);
        }

        public IEnumerable<Utilisateur> ListerUtilisateurs()
        {
            return this._depotUtilisateur.ListerUtilisateurs();
        }

        public Utilisateur ChercherUtilisateurParEmail(string p_email)
        {
            if (p_email == null)
            {
                throw new ArgumentNullException(nameof(p_email));
            }
            return this._depotUtilisateur.ChercherUtilisateurParEmail(p_email);
        }
    }
}

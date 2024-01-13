using GES_Services.Entites;

namespace GES_Services.Interfaces
{
    public interface IDepotEvenementJoueur
    {
        public EvenementJoueur ChercherJoueurParIdEvenementIdJoueur(EvenementJoueur p_evenementJoueur);
        public IEnumerable<EvenementJoueur> ChercherEvenementParIdUtilisateur(Guid p_id);
        public void AjouterPresencePourJoueur(EvenementJoueur p_evenementJoueur);
        public void SupprimerEvenementJoueur(EvenementJoueur p_evenementJoueur);
    }
}

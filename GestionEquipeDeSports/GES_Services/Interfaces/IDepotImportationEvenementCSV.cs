using GES_Services.Entites;

namespace GES_Services.Interfaces
{
    public interface IDepotImportationEvenementCSV
    {
        public void AjouterEvenements(List<Evenement> p_evenements);
        public IEnumerable<Evenement> LireEvenements(string p_nomFichierAImporter);
        public bool EstPresentFichier(string p_nomFichierAImporter);
    }
}

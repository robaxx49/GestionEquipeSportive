using GES_Services.Entites;
using GES_Services.Interfaces;

namespace GES_Services.Manipulations
{
    public class ManipulationDepotImporationEvenementCSV
    {
        private IDepotImportationEvenementCSV _DeportImportaionEvenementCSV;

        public ManipulationDepotImporationEvenementCSV(IDepotImportationEvenementCSV depotEvenement)
        {
            this._DeportImportaionEvenementCSV = depotEvenement;
        }

        public void AjouterEvenements(List<Evenement> p_evenements)
        {
            if (p_evenements is null)
            {
                throw new ArgumentNullException("le parametre \"evenement\" ne peut pas etre null", nameof(p_evenements));
            }
            this._DeportImportaionEvenementCSV.AjouterEvenements(p_evenements);
        }

        public bool EstPresentFichier(string p_nomFichierAImporter)
        {
            if (string.IsNullOrWhiteSpace(p_nomFichierAImporter.Trim()))
            {
                throw new ArgumentNullException("Il doit y avoir un nom de fichier");
            }
            return this._DeportImportaionEvenementCSV.EstPresentFichier(p_nomFichierAImporter);
        }

        public IEnumerable<Evenement> LireEvenements(string p_nomFichier)
        {
            if (string.IsNullOrWhiteSpace(p_nomFichier.Trim()))
            {
                throw new ArgumentNullException("Il doit y avoir un nom de fichier");
            }
            return this._DeportImportaionEvenementCSV.LireEvenements(p_nomFichier);

        }
    }
}
